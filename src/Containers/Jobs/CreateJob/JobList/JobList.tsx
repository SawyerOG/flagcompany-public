import React, { useState } from 'react';
import { db } from '../../../../Config/firebase';
import { reorderList } from '../../../../Config/helperFuncs';
import { JobType, Job } from '../../../../Config/Interfaces';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import {
    List,
    Header,
    AddInventory,
} from '../../../../Components/DragList/DragListStyles';

import { JobListItem, EditJobListItem } from './JobListItem';
import Toast from '../../../../Components/Toast';

interface Props {
    jobTypes: JobType[];
    updateJobTypes: (types: JobType[]) => void;
    currentJob: Job;
    addJob: () => void;
    setJob: (job: Job) => void;
}

const JobList: React.FC<Props> = ({
    jobTypes,
    updateJobTypes,
    currentJob,
    addJob,
    setJob,
}) => {
    const [showToast, setShowToast] = useState('');
    const [edit, setEdit] = useState('');
    const [editValue, setEditValue] = useState('');

    const updateJobName = async (newValue: string, index: number) => {
        if (newValue !== currentJob.jobName) {
            const jobTypesCopy = [...jobTypes];

            const jobTypeID = jobTypesCopy[index].jobID;
            jobTypesCopy[index].jobName = newValue;

            try {
                await db.collection('jobTypes').doc('job').update({
                    types: jobTypesCopy,
                });

                await db.collection('jobs').doc(jobTypeID).update({
                    jobName: newValue,
                });

                updateJobTypes(jobTypesCopy);
                setEdit('');
                setEditValue('');
            } catch (err) {
                console.log(err);
            }
        } else {
            setEdit('');
            setEditValue('');
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const oldList = [...jobTypes];
        const copy = await reorderList(result, oldList);

        if (copy) {
            db.collection('jobTypes').doc('job').update({
                types: copy,
            });
            // @ts-ignore
            updateJobTypes(copy);
        }
    };

    const get = async (jobType: JobType) => {
        if (jobType.jobID !== currentJob.id) {
            const job = await db.collection('jobs').doc(jobType.jobID).get();

            if (job.exists) {
                //@ts-ignore
                setJob(job.data());
            }
        }
    };

    return (
        <>
            <Toast show={showToast} cancel={() => setShowToast('')} />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="inventory">
                    {provided => (
                        <List
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            height={99}
                        >
                            <Header>
                                <h4>Job Types:</h4>
                                <AddInventory onClick={addJob}>+</AddInventory>
                            </Header>
                            {jobTypes.length &&
                                jobTypes.map((i, index) => {
                                    if (edit !== i.jobID) {
                                        return (
                                            <JobListItem
                                                key={i.jobID}
                                                get={get}
                                                i={i}
                                                index={index}
                                                setValue={() =>
                                                    setEditValue(i.jobName)
                                                }
                                                edit={() => setEdit(i.jobID)}
                                            />
                                        );
                                    } else {
                                        return (
                                            <EditJobListItem
                                                key={i.jobID}
                                                index={index}
                                                value={editValue}
                                                update={updateJobName}
                                            />
                                        );
                                    }
                                })}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

export default JobList;
