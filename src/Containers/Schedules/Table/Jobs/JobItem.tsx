import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { ReactComponent as Drag } from '../../../../Components/Images/drag.svg';
import { ReactComponent as Arrow } from '../../../../Components/Images/arrow.svg';
import {
    Address,
    Materials,
    ScheduledJob,
    ScheduledMaterial,
} from '../../../../Config/Interfaces';

import {
    JobBody,
    JobRow,
    ExpandedJob,
    InfoGrid,
    Count,
    ArrowBody,
} from '../TableStyles';

import AddressPicker from './AddressPicker';
import Ext from '../Jobs/Expanded/Job/ExpandedJob';

interface Props {
    id: string;
    idx: number;
    job: ScheduledJob;
    itemID: number;
    expandedJob: number;
    setExpanded: (itemID: number) => void;
    locations: Address[];
    setAddr: (itemID: number) => void;
    addAddr: (addr: Address, idx: number) => void;
    addrID: number;
    search: (val: string) => void;
    cancelSearch: () => void;
    setEdit: () => void;
    editID: number;
    getMaterials: () => Promise<boolean>;
    getMissingMats: (mats: ScheduledMaterial[]) => void;
    materials: Materials;
    editJob: (job: ScheduledJob, idx: number) => void;
}

const JobItem: React.FC<Props> = ({
    id,
    idx,
    job,
    expandedJob,
    itemID,
    setExpanded,
    locations,
    setAddr,
    addAddr,
    addrID,
    search,
    cancelSearch,
    setEdit,
    editID,
    getMaterials,
    getMissingMats,
    materials,
    editJob,
}) => {
    const selected = expandedJob === itemID;

    return (
        <Draggable draggableId={id} index={idx}>
            {provided => (
                <JobBody>
                    <JobRow
                        key={id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <span id="Job" {...provided.dragHandleProps}>
                            <Drag />
                        </span>
                        <InfoGrid>
                            <Count>{idx + 1} Job</Count>
                            <p>{job.jobName}</p>
                            <AddressPicker
                                locations={locations}
                                itemID={itemID}
                                addrID={addrID}
                                setAddr={setAddr}
                                addAddr={addAddr}
                                idx={idx}
                                search={search}
                                cancelSearch={cancelSearch}
                                job={job}
                            />
                            <ArrowBody
                                active={selected}
                                onClick={
                                    selected
                                        ? () => setExpanded(0)
                                        : () => setExpanded(itemID)
                                }
                            >
                                <Arrow />
                            </ArrowBody>
                        </InfoGrid>
                    </JobRow>
                    <ExpandedJob selected={selected}>
                        <Ext
                            curJob={job}
                            setEdit={setEdit}
                            editID={editID}
                            getMaterials={getMaterials}
                            getMissingMats={getMissingMats}
                            materials={materials}
                            idx={idx}
                            editJob={editJob}
                        />
                    </ExpandedJob>
                </JobBody>
            )}
        </Draggable>
    );
};

export default JobItem;
