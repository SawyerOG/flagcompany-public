import React, { useState } from 'react';

import { Draggable } from 'react-beautiful-dnd';
import { ListItem } from '../../../Config/ListStyles';

import { ReactComponent as Drag } from '../../../Components/Images/drag.svg';
import { TextField } from '../../../Components/FormElements';

import { InventoryListItem } from '../../../Config/Interfaces';

export const InventoryItem: React.FC<{
    i: InventoryListItem;
    index: number;
    setEdit: (name: string, index: number) => void;
    get: (item: InventoryListItem) => void;
}> = ({ i, index, get, setEdit }) => {
    const setEditHandler = (name: string, index: number) => {
        setEdit(name, index);
    };

    return (
        <Draggable draggableId={i.name} index={index}>
            {provided => (
                <ListItem
                    onClick={() => get(i)}
                    onDoubleClick={() => setEditHandler(i.name, index)}
                    key={i.id}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <span {...provided.dragHandleProps}>
                        <Drag />
                    </span>
                    <p>{i.name}</p>
                </ListItem>
            )}
        </Draggable>
    );
};

export const EditInventoryItem: React.FC<{
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
                />
                <button type="submit" style={{ display: 'none' }}></button>
            </form>
        </ListItem>
    );
};
