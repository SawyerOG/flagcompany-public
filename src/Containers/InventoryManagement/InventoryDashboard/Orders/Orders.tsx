import React, { useState, useEffect } from 'react';
import { Body, ButtonGroup, InventoryInfo } from './OrdersStyles';

import { Button } from '../../../../Components/Button';

import CreateOrder from './OrderUtilities/CreateOrder';
import ReceiveOrder from './OrderUtilities/ReceiveOrder';
import UpdateQuantity from './OrderUtilities/UpdateQuantity';

import {
    InvItemSaleData,
    OutstandingOrders,
} from '../../../../Config/Interfaces';

interface Props {
    invItem: InvItemSaleData;
    outstandingOrders: OutstandingOrders[];
    updateOrders: (newOrders: OutstandingOrders[]) => Promise<boolean>;
    receiveOrder: (
        newOrders: OutstandingOrders[],
        receivedOrder: OutstandingOrders
    ) => Promise<boolean>;
    updateQuantity: (quantity: number, math: string) => Promise<boolean>;
    toast: (message: string) => void;
}

//
//Need to create a new order. (outstanding orders --date --etc)
//Need to verify that an order has been fulfilled.
//

const Orders: React.FC<Props> = ({
    invItem,
    outstandingOrders,
    updateOrders,
    receiveOrder,
    updateQuantity,
    toast,
}) => {
    const [invOption, setInvOption] = useState<string>('');

    useEffect(() => {
        setInvOption('');
    }, [invItem]);

    const selectOption = (name: string) => {
        setInvOption(name);
    };

    return (
        <Body>
            <ButtonGroup>
                <Button
                    color="blue"
                    height={40}
                    width={350}
                    type="button"
                    click={() => selectOption('create')}
                >
                    Create Order
                </Button>
                <Button
                    color="red"
                    height={40}
                    width={350}
                    type="button"
                    click={() => selectOption('receive')}
                >
                    Receive Order
                </Button>
                <Button
                    color="green"
                    height={40}
                    width={350}
                    type="button"
                    click={() => selectOption('update')}
                >
                    Update Inventory Quantity
                </Button>
            </ButtonGroup>
            <InventoryInfo>
                {invOption === 'create' && (
                    <CreateOrder
                        invItem={invItem}
                        outstandingOrders={outstandingOrders}
                        updateOrders={updateOrders}
                        toast={toast}
                    />
                )}
                {invOption === 'receive' && (
                    <ReceiveOrder
                        outstandingOrders={outstandingOrders}
                        updateOrders={updateOrders}
                        receiveOrder={receiveOrder}
                        toast={toast}
                    />
                )}
                {invOption === 'update' && (
                    <UpdateQuantity
                        updateQuantity={updateQuantity}
                        toast={toast}
                    />
                )}
            </InventoryInfo>
        </Body>
    );
};

export default Orders;
