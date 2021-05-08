import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { ReactComponent as Drag } from '../../../../Components/Images/drag.svg';
import { ReactComponent as Arrow } from '../../../../Components/Images/arrow.svg';

import {
    JobBody,
    JobRow,
    ExpandedJob,
    MonthlyGrid,
    MonthlyCount,
    ArrowBody,
    MonthlyAddr,
} from '../TableStyles';
import { ScheduledMonthly } from '../../../../Config/Interfaces';

import Ext from '../Jobs/Expanded/Job/ExpandedMonthly';

interface Props {
    id: string;
    idx: number;
    monthly: ScheduledMonthly;
    itemID: number;
    expandedJob: number;
    setExpanded: (itemID: number) => void;
}

const MonthlyItem: React.FC<Props> = ({
    id,
    idx,
    monthly,
    expandedJob,
    itemID,
    setExpanded,
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
                        <MonthlyGrid>
                            <MonthlyCount>{idx + 1} Monthly</MonthlyCount>
                            <p>{monthly.addr.name}</p>
                            <MonthlyAddr>
                                <p>{monthly.addr.owner}</p>
                                <p>{monthly.addr.address}</p>
                            </MonthlyAddr>
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
                        </MonthlyGrid>
                    </JobRow>
                    <ExpandedJob selected={selected}>
                        <Ext i={monthly} />
                    </ExpandedJob>
                </JobBody>
            )}
        </Draggable>
    );
};

export default MonthlyItem;
