import React, { useState, useEffect } from 'react';
import {
    BackDrop,
    CreateHeader,
    Form,
    Label,
    Modal,
    SubmitBar,
    TextGroup,
} from '../../../Config/ModalStyles';

import { db, firebase } from '../../../Config/firebase';

import {
    TextField,
    CheckField,
    TextArea,
} from '../../../Components/FormElements';
import { Button } from '../../../Components/Button';
import { Spinner } from '../../../Components/Loaders/Loaders';

import {
    Job,
    JobType,
    Materials,
    MaterialChoice,
} from '../../../Config/Interfaces';

import MaterialItem from './MaterialItem';

interface Props {
    cancel: () => void;
    defaultValues?: Job;
    materials: Materials;
    jobTypes: JobType[];
    modalType: string;
    updateJob: (v: Job) => void;
    toast: (m: string) => void;
}

const JobModal: React.FC<Props> = ({
    modalType,
    cancel,
    defaultValues,
    materials,
    jobTypes,
    updateJob,
    toast,
}) => {
    const [loading, setLoading] = useState(false);

    //Need to get a new / update job state going with the values that a job would have. Need a job to start with for default values
    const [jobNameAndDesc, setJobNameAndDesc] = useState({
        jobName: '',
        jobDescription: '',
    });

    const [requiresWater, setRequiresWater] = useState({
        required: false,
        waterAmount: 0,
    });

    const [curMaterials, setCurMaterials] = useState<MaterialChoice[]>([
        { material: '', quantity: 0 },
    ]);

    useEffect(() => {
        if (modalType === 'update' && defaultValues) {
            const defaultCopy = { ...defaultValues };
            setJobNameAndDesc({
                jobName: defaultCopy.jobName,
                jobDescription: defaultCopy.jobDescription,
            });
            setRequiresWater({
                required: defaultCopy.digging,
                waterAmount: defaultCopy.water,
            });

            const updateMaterials: MaterialChoice[] = [];

            //I have the ids of the materials stored. Need to convert the id to the material name
            defaultCopy.materials.forEach(i =>
                updateMaterials.push({
                    material: materials.materialNameIDs[i.id],
                    quantity: i.quantity,
                })
            );
            setCurMaterials(updateMaterials);
        }
    }, [modalType, defaultValues, materials]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const materialsWithIds: { id: string; quantity: number }[] = [];
        curMaterials.forEach(i =>
            materialsWithIds.push({
                id: materials.materialIDs[i.material],
                quantity: i.quantity,
            })
        );

        try {
            if (modalType === 'create') {
                const { id } = await db.collection('jobs').add({
                    jobName: jobNameAndDesc.jobName,
                    jobDescription: jobNameAndDesc.jobDescription,
                    materials: materialsWithIds,
                    digging: requiresWater.required,
                    water: requiresWater.waterAmount,
                    id: '',
                });

                await db
                    .collection('jobTypes')
                    .doc('job')
                    .update({
                        types: firebase.firestore.FieldValue.arrayUnion({
                            jobID: id,
                            jobName: jobNameAndDesc.jobName,
                        }),
                    });

                await db.collection('jobs').doc(id).update({
                    id: id,
                });

                toast('Job Created Successfully');
            } else {
                //Just updating. Check to see if the name has change. If it has need to update they jobTypes document as well.
                if (jobNameAndDesc.jobName !== defaultValues?.jobName) {
                    const jobTypesCopy = [...jobTypes];
                    jobTypesCopy.forEach(i => {
                        if (i.jobID === defaultValues?.id) {
                            i.jobName = jobNameAndDesc.jobName;
                        }
                    });

                    await db.collection('jobTypes').doc('job').update({
                        types: jobTypesCopy,
                    });
                }

                await db.collection('jobs').doc(defaultValues!.id).update({
                    jobName: jobNameAndDesc.jobName,
                    jobDescription: jobNameAndDesc.jobDescription,
                    materials: materialsWithIds,
                    digging: requiresWater.required,
                    water: requiresWater.waterAmount,
                });

                updateJob({
                    jobName: jobNameAndDesc.jobName,
                    jobDescription: jobNameAndDesc.jobDescription,
                    materials: materialsWithIds,
                    digging: requiresWater.required,
                    water: requiresWater.waterAmount,
                    id: defaultValues!.id,
                });

                toast('Job Updated Successfully');
            }

            setJobNameAndDesc({ jobName: '', jobDescription: '' });
            setCurMaterials([{ material: '', quantity: 0 }]);
            setRequiresWater({ required: false, waterAmount: 0 });
            setLoading(false);
            cancel(); //close the modal
        } catch (err) {
            console.log(err);
        }
    };

    const updateNameOrDesc = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const copy = { ...jobNameAndDesc };
        if (e.target.name === 'jobName') {
            copy.jobName = e.target.value;
            setJobNameAndDesc(copy);
        } else {
            copy.jobDescription = e.target.value;
            setJobNameAndDesc(copy);
        }
    };

    const handleWater = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = { ...requiresWater };
        copy.waterAmount = parseFloat(e.target.value);
        setRequiresWater(copy);
    };

    const updateMaterialHandler = (
        idx: number,
        type: string,
        value: string
    ) => {
        const copy = [...curMaterials];

        copy[idx][type] = type === 'material' ? value : parseFloat(value);
        setCurMaterials(copy);
    };

    const addNewMaterial = () => {
        const copy = [...curMaterials];
        copy.push({ material: '', quantity: 0 });
        setCurMaterials(copy);
    };

    const deleteMaterial = (idx: number) => {
        if (curMaterials.length > 1) {
            const copy = [...curMaterials];
            copy.splice(idx, 1);
            setCurMaterials(copy);
        }
    };

    const create = modalType === 'create';

    return (
        <>
            <BackDrop onClick={cancel} />
            <Modal>
                {!loading ? (
                    <Form onSubmit={submitForm}>
                        <CreateHeader>
                            {create ? 'Create New Job Type' : 'Update Job Type'}
                        </CreateHeader>
                        <TextGroup>
                            <Label>Job Name</Label>
                            <TextField
                                type="text"
                                placeholder="50' Install"
                                name="jobName"
                                onChange={updateNameOrDesc}
                                width={100}
                                defaultValue={
                                    create ? '' : defaultValues!.jobName
                                }
                                required
                            />
                        </TextGroup>
                        <TextGroup>
                            <Label>Job Description</Label>
                            <TextArea
                                name="jobDescription"
                                rowNumber={12}
                                onChange={updateNameOrDesc}
                                defaultValue={
                                    create ? '' : defaultValues!.jobDescription
                                }
                            />
                        </TextGroup>
                        <TextGroup>
                            <Label>Materials</Label>
                            <MaterialItem
                                index={1}
                                materials={materials}
                                update={updateMaterialHandler}
                                add={addNewMaterial}
                                curMaterials={curMaterials}
                                deleteMaterial={deleteMaterial}
                            />
                        </TextGroup>
                        <CheckField
                            label="Requires Digging"
                            checked={requiresWater.required}
                            change={() =>
                                setRequiresWater({
                                    required: !requiresWater.required,
                                    waterAmount: 0,
                                })
                            }
                            name="water"
                        />
                        {requiresWater.required && (
                            <TextField
                                type="number"
                                placeholder="gallons of water required"
                                width={50}
                                onChange={handleWater}
                                required
                                defaultValue={
                                    create ? '' : defaultValues!.water
                                }
                            />
                        )}
                        <SubmitBar>
                            <Button
                                color="green"
                                height={40}
                                width={100}
                                type="submit"
                            >
                                {create ? 'create' : 'update'}
                            </Button>
                        </SubmitBar>
                    </Form>
                ) : (
                    <Spinner />
                )}
            </Modal>
        </>
    );
};

export default JobModal;
