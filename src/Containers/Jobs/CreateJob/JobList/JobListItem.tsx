import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { ListItem } from '../../../../Config/ListStyles';

import { ReactComponent as Drag } from '../../../../Components/Images/drag.svg';
import { TextField } from '../../../../Components/FormElements';

import { JobType } from '../../../../Config/Interfaces';

export const JobListItem: React.FC<{
    i: JobType;
    index: number;
    get: (item: JobType) => void;
    setValue: () => void;
    edit: (id: string) => void;
}> = ({ i, index, get, setValue, edit }) => {
    const setEditHandler = (id: string, value: string) => {
        edit(id);
        setValue();
    };

    return (
        <Draggable draggableId={i.jobID} index={index}>
            {provided => (
                <ListItem
                    onClick={() => get(i)}
                    onDoubleClick={() => setEditHandler(i.jobID, i.jobName)}
                    key={i.jobID}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <span {...provided.dragHandleProps}>
                        <Drag />
                    </span>
                    <p>{i.jobName}</p>
                </ListItem>
            )}
        </Draggable>
    );
};

export const EditJobListItem: React.FC<{
    value: string;
    update: (newValue: string, index: number) => void;
    index: number;
}> = ({ value, update, index }) => {
    const [newValue, setNewValue] = useState<string>(value);

    const submitHandler = (
        e: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        update(newValue, index);
    };

    return (
        <ListItem>
            <form onSubmit={submitHandler}>
                <TextField
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    autoFocus
                    onBlur={submitHandler}
                    width={100}
                />
                <button type="submit" style={{ display: 'none' }}></button>
            </form>
        </ListItem>
    );
};
