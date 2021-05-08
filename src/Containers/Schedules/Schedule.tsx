import React, { useState, useEffect } from 'react';

import { db, firebase } from '../../Config/firebase';
import {
    JobType,
    Job,
    InvItem,
    Address,
    ScheduledJob,
    Location,
    ScheduledMaterial,
    JobMaterial,
    ScheduledMonthly,
    CrewIDs
} from '../../Config/Interfaces';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorderList } from '../../Config/helperFuncs';

import JobList from './JobList/List';
import MonthylyList from './MonthlyList/List';
import JobTable from './Table/SchedTable';
import Inventory from './Inventory/Inventory';
import IncompleteJobs from './OtherJobs/IncompleteJobs/IncompleteJobs';

import { Container, RightSide } from './Table/TableStyles';
import Card from '../../Components/Card';

export interface CachedJobs {
    [key: string]: Job;
}
export interface CachedMaterials {
    [id: string]: InvItem;
}
export interface Locations {
    [key: string]: Location[];
}

interface Crew {
    crewID: CrewIDs; names: string[]; selected: string;
}

const emptyAddress = {
    address: '',
    lat: '',
    lng: '',
    owner: '',
    name: '',
};

const Schedule: React.FC = () => {
    const [crew, setCrew] = useState<Crew>({crewID: {}, names: [], selected: ''});
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);
    const [selectedJobs, setSelectedJobs] = useState<
        (ScheduledJob | ScheduledMonthly)[]
    >([]);
    const [locations, setLocations] = useState<Address[]>([]);
    const [allowSubmitJob, setAllowSubmitJob] = useState(false);

    const [jobs, setJobs] = useState<CachedJobs>({});
    const [jobMats, setJobMats] = useState<CachedMaterials>({});
    const [inventoryQuantity, setInventoryQuantity] = useState<
        ScheduledMaterial[]
    >([]);
    const [committed, setCommitted] = useState<
        | { [key: string]: number }
        | {
              amt: number;
              [key: string]: number;
          }
    >({});
    const [date, setDate] = useState<Date>(new Date());

    const [activeMonthly, setActiveMonthly] = useState('');
    const [showMonthly, setShowMonthly] = useState(false);
    const [monthlyRoutes, setMonthlyRoutes] = useState<Locations>({});
    const [monthlyList, setList] = useState<string[]>([]);

    useEffect(() => {
        if (jobTypes.length === 0) {
            //Start by getting the possible job types
            db.collection('jobTypes')
                .doc('job')
                .get()
                .then(doc => {
                    if (doc.exists) {
                        setJobTypes(doc.data()!.types);
                    }
                });
        }

        if (locations.length === 0) {
            db.collection('locationList')
                .doc('list')
                .get()
                .then(list => {
                    if (list.exists) {
                        setLocations(list.data()!.locations);
                    }
                });
        }

        if (Object.keys(committed).length === 0) {
            db.collection('inventoryCommitted')
                .doc('inventory')
                .get()
                .then(doc => {
                    if (doc.exists) {
                        setCommitted(doc.data()!);
                    }
                });
        }

        if (crew.names.length === 0) {
            const nameID = {} as any;
            const names:string[] = [];

            db.collection('crewList').doc('crew').get().then(list => {
                if (list.exists) {
                    list.data()!.list.forEach((i: {name: string; id: string}) => {
                        nameID[i.name] = i.id;
                        names.push(i.name)
                    })
                    setCrew({crewID: nameID, names: names, selected: ''})
                }
            })
        }
    }, [jobTypes, locations, committed, crew]);

    useEffect(() => {
        let newValue = true;

        if (selectedJobs.length === 0) {
            newValue = false;
        } else {
            selectedJobs.forEach((i: ScheduledMonthly | ScheduledJob) => {
                //@ts-ignore
                if (i.type === 'job' && !i.addr.address) {
                    newValue = false;
                }
            });
        }

        if(!crew.selected) {
            newValue = false;
        }

        setAllowSubmitJob(newValue);
    }, [selectedJobs, crew.selected]);

    const getJobDetails = async (jobID: string) => {
        try {
            //If we dont already have the job then request it.
            if (!jobs[jobID]) {
                const jobsCopy = { ...jobs };
                const matsCopy = { ...jobMats };
                const job = await db.collection('jobs').doc(jobID).get();
                if (job.exists) {
                    //@ts-ignore
                    jobsCopy[jobID] = job.data();

                    for await (const i of job.data()!.materials) {
                        //@ts-ignore
                        if (!jobMats[i.id]) {
                            const mat = await db
                                .collection('inventory')
                                .doc(i.id)
                                .get();
                            if (mat.exists) {
                                //@ts-ignore
                                matsCopy[i.id] = mat.data();
                            }
                        }
                    }

                    setJobMats(matsCopy);
                    setJobs(jobsCopy);
                    return { job: jobsCopy[jobID], mats: matsCopy };
                }
            } else {
                return { job: jobs[jobID], mats: { empty: true } };
            }
        } catch (err) {
            console.log(err);
            return { job: {}, mats: {} };
        }
    };

    const getMissingMats = async (materialList: ScheduledMaterial[]) => {
        const matsCopy = { ...jobMats };
        for await (const i of materialList) {
            //@ts-ignore
            if (!jobMats[i.id]) {
                const mat = await db.collection('inventory').doc(i.id).get();
                if (mat.exists) {
                    //@ts-ignore
                    matsCopy[i.id] = mat.data();
                }
            }
        }

        setJobMats(matsCopy);
    };

    const calcInventory = (jobs: ScheduledJob[]) => {
        const tracker: any = {};

        jobs.forEach(job => {
            if (job.type === 'job') {
                job.materials.forEach(i => {
                    if (tracker[i.id]) {
                        tracker[i.id].quantity = tracker[i.id].quantity +=
                            i.quantity;
                    } else {
                        tracker[i.id] = { ...i };
                    }
                });
            }
        });

        let invArr: ScheduledMaterial[] = [];
        Object.keys(tracker).forEach(i => invArr.push(tracker[i]));

        if (invArr.length > 0) {
            //Alphabetize the inventory
            invArr.sort(function (a, b) {
                var nameA = a.matName.toUpperCase();
                var nameB = b.matName.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
            });
        }

        setInventoryQuantity(invArr);
    };

    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result;
        if (destination) {
            //<------------Come from the lists to the table----->//
            try {
                if (
                    (source.droppableId === 'list' ||
                        source.droppableId === 'monthlyList') &&
                    destination.droppableId === 'table'
                ) {
                    //From the job list
                    if (source.droppableId === 'list') {
                        //If the job is being added to the schedule
                        const selectCopy = [...selectedJobs];

                        //@ts-ignore
                        const { jobID, jobName } = jobTypes.find(
                            (i, idx) => idx === source.index
                        );

                        //Add the bare minimum info needed to get the job to display on the page instantly
                        const jobObj = {} as ScheduledJob;
                        jobObj.jobID = jobID;
                        jobObj.jobName = jobName;
                        jobObj.uniqueID = Math.random() * Math.random();
                        jobObj.addr = emptyAddress;
                        jobObj.type = 'job';
                        selectCopy.splice(destination.index, 0, jobObj);
                        //@ts-ignore
                        setSelectedJobs(selectCopy);

                        //@ts-ignore
                        const { job, mats } = await getJobDetails(jobID);
                        //Now that we know we have the job details add it to the new scheduled job

                        if (job) {
                            const {
                                digging,
                                id,
                                jobDescription,
                                jobName,
                                water,
                                materials,
                            } = job;
                            jobObj.jobID = id;
                            jobObj.jobName = jobName;
                            jobObj.jobDescription = jobDescription;
                            jobObj.digging = digging;
                            jobObj.water = water;
                            jobObj.jobNumber = destination.index;

                            const jobMaterials: ScheduledMaterial[] = [];
                            const quantityMats: ScheduledMaterial[] = [];
                            if (!mats.empty) {
                                materials.forEach((i: JobMaterial) => {
                                    jobMaterials.push({
                                        ...i,
                                        matName: mats[i.id].orderName,
                                    });
                                    quantityMats.push({
                                        ...i,
                                        matName: mats[i.id].orderName,
                                    });
                                });
                            } else {
                                materials.forEach((i: JobMaterial) => {
                                    jobMaterials.push({
                                        ...i,
                                        matName: jobMats[i.id].orderName,
                                    });
                                    quantityMats.push({
                                        ...i,
                                        matName: jobMats[i.id].orderName,
                                    });
                                });
                            }

                            jobObj.materials = jobMaterials;

                            selectCopy.splice(destination.index, 1, jobObj);
                            //@ts-ignore
                            setSelectedJobs(selectCopy);
                            //@ts-ignore
                            calcInventory(selectCopy);
                        } else {
                            throw new Error('Error retrieving job data');
                        }
                    } else {
                        const sm = {
                            ...monthlyRoutes[activeMonthly][source.index],
                        };

                        //From the monthly list
                        const newMonthly = {
                            type: 'monthly',
                            uniqueID: Math.random() * Math.random(),
                            addr: {
                                address: sm.address,
                                owner: sm.owner,
                                name: sm.name,
                                lat: sm.lat,
                                lng: sm.lng,
                            },
                            monthly: sm.monthly,
                            flagTypes: sm.flagTypes,
                            monthlyComments: sm.monthlyComments,
                            poleType: sm.poleType,
                            poleHeight: sm.poleHeight,
                            cleat: sm.cleat,
                            retainer: sm.retainer,
                        } as ScheduledMonthly;

                        const ftype: ScheduledMonthly = newMonthly;

                        const copy = [...selectedJobs];
                        copy.splice(destination.index, 0, ftype);
                        setSelectedJobs(copy);
                    }
                    //<--------From the table back to the list (deleted)---->
                } else if (
                    source.droppableId === 'table' &&
                    (destination.droppableId === 'list' ||
                        destination.droppableId === 'monthlyList')
                ) {
                    //Removing item from table
                    const copy = [...selectedJobs];
                    let isJob = false;
                    // const remaining = copy.filter(
                    //     (i, idx) => idx !== source.index
                    // );
                    copy.forEach((i, idx) => {
                        if (idx === source.index) {
                            //The on want to delete
                            if (i.type === 'job') {
                                isJob = true;
                            }
                            copy.splice(idx, 1);
                        }
                    });
                    //@ts-ignore
                    setSelectedJobs(copy);
                    if (isJob) {
                        //@ts-ignore
                        calcInventory(copy);
                    }
                } else {
                    //Reordering the list
                    const oldList = [...selectedJobs];
                    const copy = await reorderList(result, oldList);

                    if (copy) {
                        copy[destination.index].jobNumber = destination.index;
                        setSelectedJobs(copy);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const selectCrewMember = (crewMember: string) => {
        const crewCopy = {...crew}
        crewCopy.selected = crewMember;
        setCrew(crewCopy);
    }

    const addAddr = (addr: Address, idx: number) => {
        const copy = [...selectedJobs];
        //@ts-ignore
        copy[idx].addr = addr;
        //@ts-ignore
        setSelectedJobs(copy);
    };

    const editJob = (job: ScheduledJob, idx: number) => {
        const copy = [...selectedJobs];
        copy.splice(idx, 1, job);
        //@ts-ignore
        setSelectedJobs(copy);
        //@ts-ignore
        calcInventory(copy);
    };

    const createJob = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const newSchedule = {
                jobDate: date,
                jobs: selectedJobs,
                createdDate: new Date(),
                crewMemberID: crew.crewID[crew.selected]
            };
            //First update all of the committed inv items.
            const committedCopy = { ...committed };
            selectedJobs.forEach((i: ScheduledJob | ScheduledMonthly) => {
                if (i.type === 'job') {
                    //Not doing inventory for flags here
                    //@ts-ignore
                    i.materials.forEach(j => {
                        if (committedCopy[j.id]) {
                            committedCopy[j.id] = committedCopy[j.id] +=
                                j.quantity;
                        } else {
                            committedCopy[j.id] = j.quantity;
                        }
                    });
                }
            });
            db.collection('inventoryCommitted')
                .doc('inventory')
                .set(committedCopy);

            //Now create a new scehdule.
            const { id } = await db
                .collection('scheduledJobs')
                .add(newSchedule);
            //Add the new schedule to the list of schedules. Not sure how to order them yet. Will also probably need to be tracking this locally as well.
            db.collection('scheduledJobList')
                .doc('jobs')
                .update({
                    list: firebase.firestore.FieldValue.arrayUnion({
                        id: id,
                        jobDate: date,
                        createdDate: new Date(),
                        crewName: crew.selected,
                        crewID: crew.crewID[crew.selected]
                    }),
                });
            //@ts-ignore
            setCommitted(committedCopy);
            setSelectedJobs([]);
            setInventoryQuantity([]);
            setDate(new Date());

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const addAllMonthlys = (routes: Location[]) => {
        const selectedJobsCopy = [...selectedJobs];
        routes.forEach(i => {
            const obj = {
                type: 'monthly',
                uniqueID: Math.random() * Math.random(),
                addr: {
                    address: i.address,
                    owner: i.owner,
                    name: i.name,
                    lat: i.lat,
                    lng: i.lng,
                },
                monthly: i.monthly,
                flagTypes: i.flagTypes,
                monthlyComments: i.monthlyComments,
                poleType: i.poleType,
                poleHeight: i.poleHeight,
                cleat: i.cleat,
                retainer: i.retainer,
            } as ScheduledMonthly;
            selectedJobsCopy.push(obj);
        });

        setSelectedJobs(selectedJobsCopy);
    };

    return (
        <Card>
            <Container>
                <DragDropContext onDragEnd={onDragEnd}>
                    {!showMonthly && <JobList jobTypes={jobTypes} />}
                    {showMonthly && (
                        <MonthylyList
                            monthlyRoutes={monthlyRoutes}
                            monthlyList={monthlyList}
                            setRoutes={(v: Locations) => setMonthlyRoutes(v)}
                            setActiveMonthly={(v: string) =>
                                setActiveMonthly(v)
                            }
                            activeMonthly={activeMonthly}
                            addAllMonthlys={addAllMonthlys}
                        />
                    )}
                    {locations.length > 0 && (
                        <>
                            <JobTable
                                selectedJobs={selectedJobs}
                                getMissingMats={getMissingMats}
                                locations={locations}
                                addAddr={addAddr}
                                editJob={editJob}
                                createJob={createJob}
                                date={date}
                                //@ts-ignore
                                setDate={d => setDate(d)}
                                allowSubmit={allowSubmitJob}
                                crewNames={crew.names}
                                crewMember={crew.selected}
                                selectCrewMember={selectCrewMember}
                            />
                            <RightSide>
                                <Inventory
                                    inventory={inventoryQuantity}
                                    jobMats={jobMats}
                                    committed={committed}
                                />
                                <IncompleteJobs
                                    updateMonthly={(v: boolean) =>
                                        setShowMonthly(v)
                                    }
                                    monthly={showMonthly}
                                    setMonthlyList={(v: string[]) => setList(v)}
                                    monthlyList={monthlyList}
                                />
                            </RightSide>
                        </>
                    )}
                </DragDropContext>
            </Container>
        </Card>
    );
};

export default Schedule;
