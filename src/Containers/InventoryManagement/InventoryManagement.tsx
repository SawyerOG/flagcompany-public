import React, { useState, useEffect } from 'react';
import { db } from '../../Config/firebase';

import Card from '../../Components/Card';

import InvList from './InventoryList/InventoryList';
import InvDashboard from './InventoryDashboard/InventoryDashboard';

import Toast from '../../Components/Toast';

import {
    InventoryListItem,
    InvItemSaleData,
    OutstandingOrders,
} from '../../Config/Interfaces';

const InventoryManagement: React.FC = () => {
    const [showToast, setShowToast] = useState<string>('');
    const enableToast = (message: string) => {
        setShowToast(message);
    };

    const [inventoryTypes, setInventoryTypes] = useState<InventoryListItem[]>(
        []
    );

    const [currentInvItem, setCurrentInvItem] = useState<InvItemSaleData>({
        orderName: '',
        orderType: '',
        orderPrice: 0.0,
        orderDetails: '',
        orderQuantity: 0,
        currentQuantity: 0,
        lastOrderedDate: { seconds: 0, nanoseconds: 0 },
        lastOrderedQuantity: 0,
        id: '',
        committed: 0,
    });

    const [outstandingOrders, setOutstandingOrders] = useState<
        OutstandingOrders[]
    >([]);

    //Grab the outstanding orders
    useEffect(() => {
        let orders: OutstandingOrders[] = [];
        const unsubscribe = db
            .collection('outstandingOrders')
            .doc('orders')
            .onSnapshot(docs => {
                //@ts-ignore
                docs.data().list.forEach(i => {
                    orders.push(i);
                });
                setOutstandingOrders(orders);
                orders = [];
            });

        return () => unsubscribe();
    }, []);

    const updateOutstandingOrders = async (newOrders: OutstandingOrders[]) => {
        try {
            await db.collection('outstandingOrders').doc('orders').set({
                list: newOrders,
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const getInventory = async (type: InventoryListItem) => {
        const inventory = await db.collection('inventory').doc(type.id).get();

        if (inventory.exists) {
            const invItem = inventory.data();
            invItem!.id = inventory.id;
            //@ts-ignore
            setCurrentInvItem(invItem);
        }
    };

    const updateInventoryName = (name: string) => {
        const currentInvCopy = { ...currentInvItem };
        currentInvCopy.orderName = name;
        setCurrentInvItem(currentInvCopy);
    };

    const updateInventoryQuantity = async (quantity: number, math: string) => {
        try {
            const currentInvCopy = { ...currentInvItem };
            let newQuantity = 0;
            if (math === 'add') {
                newQuantity = +currentInvCopy.currentQuantity + quantity;
            } else {
                newQuantity = +currentInvCopy.currentQuantity - quantity;
            }

            currentInvCopy.currentQuantity = newQuantity;

            await db.collection('inventory').doc(currentInvCopy.id).update({
                currentQuantity: newQuantity,
            });

            setCurrentInvItem(currentInvCopy);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const updateInventoryItem = async (invItem: InvItemSaleData) => {
        try {
            if (invItem.orderName !== currentInvItem.orderName) {
                const invTypesCopy = [...inventoryTypes];

                for (let i of invTypesCopy) {
                    if (i.id === invItem.id) {
                        i.name = invItem.orderName;
                    }
                }

                await db.collection('inventoryTypes').doc('inventory').update({
                    types: invTypesCopy,
                });
                setInventoryTypes(invTypesCopy);
            }

            await db.collection('inventory').doc(invItem.id).set(invItem);
            setCurrentInvItem(invItem);

            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    const receiveOrder = async (
        newOrders: OutstandingOrders[],
        receivedOrder: OutstandingOrders
    ) => {
        const { id, date, quantity } = receivedOrder;
        const currentInvCopy = { ...currentInvItem };

        try {
            const orderedQuantity = quantity * currentInvItem.orderQuantity;

            //If this is the first order adding something to nothing will result in NaN.
            const curQuantity = currentInvCopy.currentQuantity
                ? currentInvCopy.currentQuantity + orderedQuantity
                : orderedQuantity;

            await db.collection('inventory').doc(id).update({
                lastOrderedDate: date,
                lastOrderedQuantity: orderedQuantity,
                currentQuantity: curQuantity,
            });

            const success = await updateOutstandingOrders(newOrders);

            currentInvCopy.lastOrderedDate = date;
            currentInvCopy.lastOrderedQuantity = orderedQuantity;
            currentInvCopy.currentQuantity = curQuantity;

            setCurrentInvItem(currentInvCopy);

            if (success) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    return (
        <Card>
            <Toast show={showToast} cancel={() => setShowToast('')} />
            <InvList
                inventoryTypes={inventoryTypes}
                invItem={currentInvItem}
                setInventoryTypes={(newTypes: InventoryListItem[]) =>
                    setInventoryTypes(newTypes)
                }
                get={getInventory}
                updateName={updateInventoryName}
                toast={enableToast}
            />
            <InvDashboard
                invItem={currentInvItem}
                update={updateInventoryItem}
                outstandingOrders={outstandingOrders}
                updateOrders={updateOutstandingOrders}
                receiveOrder={receiveOrder}
                updateQuantity={updateInventoryQuantity}
                toast={enableToast}
            />
        </Card>
    );
};

export default InventoryManagement;
