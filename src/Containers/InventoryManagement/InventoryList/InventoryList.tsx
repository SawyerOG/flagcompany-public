import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { db, firebase } from '../../../Config/firebase';
import { reorderList } from '../../../Config/helperFuncs';
import {
    List,
    Header,
    AddInventory,
} from '../../../Components/DragList/DragListStyles';

import { InventoryItem, EditInventoryItem } from './InventoryItem';

import { InventoryModal } from '../InventoryModal/Modal';

import { InventoryListItem, InvItem } from '../../../Config/Interfaces';

interface Props {
    get: (type: InventoryListItem) => void;
    invItem: InvItem;
    inventoryTypes: InventoryListItem[];
    setInventoryTypes: (types: InventoryListItem[]) => void;
    updateName: (name: string) => void;
    toast: (message: string) => void;
}

const InventoryList: React.FC<Props> = ({
    inventoryTypes,
    invItem,
    setInventoryTypes,
    get,
    updateName,
    toast,
}) => {
    const [edit, setEdit] = useState(99);
    const [editValue, setEditValue] = useState('');

    const [addNewValue, setAddNewValue] = useState(false);

    useEffect(() => {
        if (inventoryTypes.length) return;

        db.collection('inventoryTypes')
            .doc('inventory')
            .get()
            .then(ss => {
                if (ss.exists) {
                    //@ts-ignore
                    setInventoryTypes(ss.data().types);
                    // console.log(ss.data().types);
                }
            });
    }, [inventoryTypes, setInventoryTypes]);

    const onDragEnd = async (result: DropResult) => {
        const oldList = [...inventoryTypes];

        //@ts-ignore
        const copy: InventoryListItem[] = await reorderList(result, oldList);

        if (copy) {
            db.collection('inventoryTypes').doc('inventory').update({
                types: copy,
            });
            setInventoryTypes(copy);
        }
    };

    const getHandler = (item: InventoryListItem) => {
        if (item.name !== invItem.orderName) {
            get(item);
        }
    };

    const setEditHandler = (value: string, index: number) => {
        setEditValue(value);
        setEdit(index);
    };

    const updateEditHandler = (newValue: string, index: number) => {
        if (newValue !== invItem.orderName) {
            const typesCopy = [...inventoryTypes];
            const newItem = typesCopy[index];
            const newItemID = typesCopy[index].id;
            newItem.name = newValue;
            typesCopy.splice(index, 1, newItem);

            db.collection('inventoryTypes').doc('inventory').set({
                types: typesCopy,
            });
            db.collection('inventory').doc(newItemID).update({
                orderName: newValue,
            });

            setInventoryTypes(typesCopy);
            updateName(newValue);
            setEdit(99);
        } else {
            setEdit(99);
        }
    };

    const addNewInventoryItem = async (value: InvItem) => {
        try {
            value.currentQuantity = 0;
            const id = await db.collection('inventory').add(value);
            const listItem: InventoryListItem = {
                id: id.id,
                name: value.orderName,
            };
            await db
                .collection('inventoryTypes')
                .doc('inventory')
                .update({
                    types: firebase.firestore.FieldValue.arrayUnion(listItem),
                });

            const inventoryListCopy = [...inventoryTypes];
            inventoryListCopy.unshift(listItem);
            setInventoryTypes(inventoryListCopy);
            toast('Inventory Item Added Successfully');

            return true;
        } catch (err) {
            return false;
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="inventory">
                {provided => (
                    <List
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        height={100}
                    >
                        <Header>
                            <h4>Inventory:</h4>
                            <AddInventory onClick={() => setAddNewValue(true)}>
                                {addNewValue === true ? '' : '+'}
                            </AddInventory>
                        </Header>
                        {addNewValue && (
                            <InventoryModal
                                cancel={() => setAddNewValue(false)}
                                saveData={addNewInventoryItem}
                                toast={toast}
                            />
                        )}
                        {inventoryTypes.length > 0 &&
                            inventoryTypes.map((i, index) => {
                                if (index !== edit) {
                                    return (
                                        <InventoryItem
                                            key={i.id}
                                            i={i}
                                            index={index}
                                            setEdit={setEditHandler}
                                            get={getHandler}
                                        />
                                    );
                                } else {
                                    return (
                                        <EditInventoryItem
                                            key={i.id}
                                            value={editValue}
                                            index={index}
                                            update={updateEditHandler}
                                        />
                                    );
                                }
                            })}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default InventoryList;
