import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import { List, Header } from '../../../Components/DragList/DragListStyles';
import { JobType } from '../../../Config/Interfaces';

import ListItem from './ListItem';

interface Props {
    jobTypes: JobType[];
}

const JobList: React.FC<Props> = ({ jobTypes }) => {
    return (
        <Droppable droppableId="list">
            {provided => (
                <List
                    height={99}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <Header>Job Types</Header>
                    {jobTypes.length > 0 &&
                        jobTypes.map((i, idx) => (
                            <ListItem key={i.jobID} i={i} idx={idx} />
                        ))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    );
};

export default JobList;
