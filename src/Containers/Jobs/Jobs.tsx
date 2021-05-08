import React, { useState, useEffect } from 'react';

import { db } from '../../Config/firebase';

import Card from '../../Components/Card';
import { Container, Body } from './JobsStyles';

import CreateJob from './CreateJob/CreateJob';
import Display from './DisplayPage/Display';
import JobModal from './JobModal/JobModal';
import Toast from '../../Components/Toast';

import {
    InventoryListItem,
    Materials,
    MaterialsIDs,
    Job,
    JobType,
} from '../../Config/Interfaces';

//keep track of all job types
//ex. digging certain holes
//  -- need to track all items required for the job
// How to track locations and assign the job to the location
// Need to assign the job to users.

const Jobs = () => {
    const [jobModal, setJobModal] = useState('');
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);

    const [materials, setMaterials] = useState<Materials>({
        materialNames: [],
        materialList: [],
        materialIDs: {} as MaterialsIDs,
        materialNameIDs: {} as MaterialsIDs,
    });

    const [currentJob, setCurrentJob] = useState<Job>({
        id: '',
        jobName: '',
        jobDescription: '',
        materials: [],
        digging: false,
        water: 0,
    });

    //Get the job types

    useEffect(() => {
        let jobs: JobType[] = [];

        const unsubscribe = db
            .collection('jobTypes')
            .doc('job')
            .onSnapshot(doc => {
                if (doc.exists && doc.data()!.types !== undefined) {
                    doc.data()!.types.forEach((i: JobType) => {
                        jobs.push(i);
                    });
                    setJobTypes(jobs);
                    jobs = [];
                }
            });

        return () => unsubscribe();
    }, []);

    //Getting the the possible material types (inventory types)

    useEffect(() => {
        const materialNames: string[] = [];
        const materialIDs = {} as MaterialsIDs;
        const materialNameIDs = {} as MaterialsIDs;

        db.collection('inventoryTypes')
            .doc('inventory')
            .get()
            .then(results => {
                if (results.exists) {
                    //@ts-ignore
                    const { types } = results.data();

                    types.forEach((i: InventoryListItem) => {
                        materialNames.push(i.name);
                        materialIDs[i.name] = i.id;
                        materialNameIDs[i.id] = i.name;
                    });

                    setMaterials({
                        materialNames: materialNames,
                        materialList: types,
                        materialIDs: materialIDs,
                        materialNameIDs: materialNameIDs,
                    });
                }
            });
    }, []);

    const [toast, setToast] = useState('');
    const enableToast = (message: string) => {
        setToast(message);
    };

    return (
        <Card>
            <Toast show={toast} cancel={() => setToast('')} />
            <Container>
                <Body>
                    <CreateJob
                        jobTypes={jobTypes}
                        updateJobTypes={(types: JobType[]) =>
                            setJobTypes(types)
                        }
                        setJob={(job: Job) => setCurrentJob(job)}
                        curJob={currentJob}
                        addJob={() => setJobModal('create')}
                    />
                    {currentJob.id && (
                        <Display
                            curJob={currentJob}
                            materials={materials.materialNameIDs}
                            updateJob={() => setJobModal('update')}
                        />
                    )}
                </Body>
            </Container>
            {jobModal && (
                <JobModal
                    cancel={() => setJobModal('')}
                    modalType={jobModal} //create or update
                    defaultValues={currentJob}
                    materials={materials}
                    jobTypes={jobTypes}
                    updateJob={(v: Job) => setCurrentJob(v)}
                    toast={enableToast}
                />
            )}
        </Card>
    );
};

export default Jobs;
