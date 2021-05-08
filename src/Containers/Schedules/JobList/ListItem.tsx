import React from 'react';

import { Draggable } from 'react-beautiful-dnd';

import { ListItem } from '../../../Config/ListStyles';

import { ReactComponent as Drag } from '../../../Components/Images/drag.svg';

import { JobType } from '../../../Config/Interfaces';

interface Props {
    i: JobType;
    idx: number;
}
const ListI: React.FC<Props> = ({ i, idx }) => {
    return (
        <Draggable draggableId={i.jobID} index={idx}>
            {provided => (
                <ListItem
                    key={i.jobID}
                    onClick={() => console.log(i)}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <span>
                        <Drag />
                    </span>
                    <p>{i.jobName}</p>
                </ListItem>
            )}
        </Draggable>
    );
};

export default ListI;
