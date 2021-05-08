import React, { useState, useCallback } from 'react';

import { Droppable } from 'react-beautiful-dnd';
import { db } from '../../../Config/firebase';

import {
    Address,
    ScheduledJob,
    MaterialsIDs,
    InventoryListItem,
    Materials,
    ScheduledMaterial,
    ScheduledMonthly,
} from '../../../Config/Interfaces';

import { TableCont, Header, Stack, JobCont, DragMessage } from './TableStyles';

import { CustomDatePicker } from '../../../Components/DatePicker/DatePicker';

import Toast from '../../../Components/Toast';
import Routes from '../ViewRoute/RouteModal';
import JobItem from './Jobs/JobItem';
import MonthlyItem from './Jobs/MonthlyItem';

import { Button, OutlineButton } from '../../../Components/Button';
import {Selector} from '../../../Components/FormElements'

interface Props {
    selectedJobs: (ScheduledJob | ScheduledMonthly)[];
    getMissingMats: (mats: ScheduledMaterial[]) => void;
    locations: Address[];
    addAddr: (addr: Address, idx: number) => void;
    editJob: (job: ScheduledJob, idx: number) => void;
    createJob: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => Promise<boolean>;
    date: Date;
    setDate: (date: Date | [Date, Date] | null) => void;
    allowSubmit: boolean;
    crewNames: string[];
    crewMember: string;
    selectCrewMember: (crew: string) => void;
}

const SchedTable: React.FC<Props> = ({
    selectedJobs,
    getMissingMats,
    locations,
    addAddr,
    editJob,
    createJob,
    date,
    setDate,
    allowSubmit,
    crewNames,
    crewMember,
    selectCrewMember,
}) => {
    //Things needed for each job
    // editable details specific to this particular job
    //         --special instructions --special materials
    // Location

    const [expandedJob, setExpandedJob] = useState(0);
    const [openedAddrSelect, setOpenedAddrSelect] = useState(0);
    const [editJobInfo, setEditJobInfo] = useState(0);

    const [filteredLocs, setFilteredLocs] = useState<Address[]>([...locations]);
    const [materials, setMaterials] = useState<Materials>({
        materialNames: [],
        materialList: [],
        materialIDs: {} as MaterialsIDs,
        materialNameIDs: {} as MaterialsIDs,
    });

    const [toast, setToast] = useState('');
    const [showRoutes, setShowRoutes] = useState(false);

    const search = (val: string) => {
        if (val.length > 2) {
            let value = val.toUpperCase();
            const locs = locations.filter(
                i =>
                    i.address.toUpperCase().includes(value) ||
                    i.owner.toUpperCase().includes(value) ||
                    i.name.toUpperCase().includes(value)
            );

            setFilteredLocs(locs);
        } else {
            const locs = [...locations];
            setFilteredLocs(locs);
        }
    };

    const cancelSearch = () => {
        const locs = [...locations];
        setFilteredLocs(locs);
    };

    const getMaterials = useCallback(() => {
        const materialNames: string[] = [];
        const materialIDs = {} as MaterialsIDs;
        const materialNameIDs = {} as MaterialsIDs;

        return db
            .collection('inventoryTypes')
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
            })
            .then(() => {
                return true;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    }, []);

    const editJobHandler = (job: ScheduledJob, idx: number) => {
        editJob(job, idx);
        setEditJobInfo(0);
        setToast('Scheduled Job Data Saved!');
    };

    return (
        <TableCont>
            <Toast show={toast} cancel={() => setToast('')} />
            {showRoutes && (
                <Routes
                    jobs={selectedJobs}
                    close={() => setShowRoutes(false)}
                />
            )}
            <Header>
                <Stack>
                    <h4>
                        <u>New Schedule</u>
                    </h4>
                    <Button
                        type="button"
                        color="green"
                        height={25}
                        width={150}
                        click={() => setShowRoutes(true)}
                    >
                        view route
                    </Button>
                </Stack>
                <CustomDatePicker
                    //@ts-ignore
                    onChange={d => setDate(d)}
                    selected={date}
                />
                <Selector name='crew' selectText='Crew Assignment' change={e => selectCrewMember(e.target.value)} options={crewNames} error={crewMember ? 'true' : ''}/>
                <OutlineButton
                    type="button"
                    color="blue"
                    height={40}
                    width={150}
                    click={createJob}
                    disabled={!allowSubmit}
                >
                    Submit Job
                </OutlineButton>
            </Header>
            <Droppable droppableId="table">
                {provided => (
                    <JobCont
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {selectedJobs.length ? (
                            selectedJobs.map((i, idx) => {
                                const key = i.uniqueID.toString();
                                if (i.type === 'job') {
                                    return (
                                        <JobItem
                                            key={key}
                                            id={key}
                                            idx={idx}
                                            //@ts-ignore
                                            job={i}
                                            itemID={i.uniqueID}
                                            expandedJob={expandedJob}
                                            setExpanded={v => setExpandedJob(v)}
                                            setAddr={v =>
                                                setOpenedAddrSelect(v)
                                            }
                                            addAddr={addAddr}
                                            addrID={openedAddrSelect}
                                            setEdit={() =>
                                                setEditJobInfo(i.uniqueID!)
                                            }
                                            editID={editJobInfo}
                                            locations={filteredLocs}
                                            search={search}
                                            cancelSearch={cancelSearch}
                                            getMaterials={getMaterials}
                                            getMissingMats={getMissingMats}
                                            materials={materials}
                                            editJob={editJobHandler}
                                        />
                                    );
                                } else {
                                    return (
                                        <MonthlyItem
                                            key={key}
                                            id={key}
                                            idx={idx}
                                            itemID={i.uniqueID}
                                            //@ts-ignore
                                            monthly={i}
                                            expandedJob={expandedJob}
                                            setExpanded={v => setExpandedJob(v)}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <DragMessage>
                                drag Jobs here to create a new schedule
                            </DragMessage>
                        )}
                        {provided.placeholder}
                    </JobCont>
                )}
            </Droppable>
        </TableCont>
    );
};

export default SchedTable;
