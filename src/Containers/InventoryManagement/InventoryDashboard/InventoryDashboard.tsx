import React, { useState } from 'react';
import { getDate } from '../../../Config/helperFuncs';

import Orders from './Orders/Orders';

import {
    Container,
    DataBody,
    InfoContainer,
    DataHeader,
    ListItem,
    OrdersContainer,
    NoItem,
} from './InventoryDashboardStyles';

import {
    InvItem,
    InvItemSaleData,
    OutstandingOrders,
} from '../../../Config/Interfaces';

import { InventoryModal } from '../InventoryModal/Modal';

import { ReactComponent as Edit } from '../../../Components/Images/edit.svg';

interface Props {
    invItem: InvItemSaleData;
    update: (updatedInvItem: InvItemSaleData) => Promise<boolean>;
    outstandingOrders: OutstandingOrders[];
    updateOrders: (newOrders: OutstandingOrders[]) => Promise<boolean>;
    receiveOrder: (
        newOrders: OutstandingOrders[],
        receivedOrder: OutstandingOrders
    ) => Promise<boolean>;
    updateQuantity: (quantity: number, math: string) => Promise<boolean>;
    toast: (message: string) => void;
}

const InventoryDashboard: React.FC<Props> = ({
    invItem,
    update,
    outstandingOrders,
    updateOrders,
    receiveOrder,
    updateQuantity,
    toast,
}) => {
    const [editInvItem, setEditInvItem] = useState<boolean>(false);

    const updateInvItem = async (updatedInvItem: InvItem) => {
        //@ts-ignore
        const data: InvItemSaleData = { ...updatedInvItem };

        data.id = invItem.id;
        data.orderName = data.orderName ? data.orderName : invItem.orderName;
        data.lastOrderedDate = invItem.lastOrderedDate || '';
        data.lastOrderedQuantity = invItem.lastOrderedQuantity || 0;
        const res = update(data);

        if (res) {
            return true;
        }
        return false;
    };

    return (
        <Container>
            {editInvItem && (
                <InventoryModal
                    saveData={updateInvItem}
                    cancel={() => setEditInvItem(false)}
                    defaultValues={invItem}
                    toast={toast}
                />
            )}
            <DataBody>
                {invItem.orderName && (
                    <InfoContainer>
                        <DataHeader>
                            <p>{invItem.orderName}</p>
                            <Edit onClick={() => setEditInvItem(true)} />
                        </DataHeader>
                        <ListItem>
                            <label>Order Type</label>
                            <p>{invItem.orderType}</p>
                        </ListItem>
                        <ListItem>
                            <label>Order Quantity</label>
                            <p>{invItem.orderQuantity}</p>
                        </ListItem>
                        <ListItem>
                            <label>Order Price</label>
                            <p>{invItem.orderPrice}</p>
                        </ListItem>
                        <ListItem>
                            <label>Order Details</label>
                            <p>{invItem.orderDetails}</p>
                        </ListItem>
                        <OrdersContainer>
                            <p>
                                Last Order Date:{' '}
                                <span>
                                    {invItem.lastOrderedDate
                                        ? getDate(invItem.lastOrderedDate)
                                        : 'None ordered yet'}
                                </span>
                            </p>
                            <p>
                                Last Order Received Quantity:{' '}
                                <span>
                                    {invItem.lastOrderedQuantity
                                        ? invItem.lastOrderedQuantity
                                        : 0}
                                </span>
                            </p>
                            <p>
                                Current Inventory Quantity:{' '}
                                <span>
                                    {invItem.currentQuantity
                                        ? invItem.currentQuantity
                                        : 0}
                                </span>
                            </p>
                        </OrdersContainer>
                    </InfoContainer>
                )}
                {invItem.orderName && (
                    <Orders
                        invItem={invItem}
                        outstandingOrders={outstandingOrders}
                        updateOrders={updateOrders}
                        receiveOrder={receiveOrder}
                        updateQuantity={updateQuantity}
                        toast={toast}
                    />
                )}
                {!invItem.orderName && (
                    <NoItem>
                        <p>select an inventory item</p>
                    </NoItem>
                )}
            </DataBody>
        </Container>
    );
};

export default InventoryDashboard;
