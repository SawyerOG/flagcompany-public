import React, { useState } from 'react';

import { getDate } from '../../../../../Config/helperFuncs';

import { TextField } from '../../../../../Components/FormElements';

import { ReceiveOrderContainer, Order, Config, SVG } from '../OrdersStyles';
import { ReactComponent as C } from '../../../../../Components/Images/check.svg';
import { ReactComponent as D } from '../../../../../Components/Images/delete.svg';
import { ReactComponent as E } from '../../../../../Components/Images/edit.svg';

import { OutstandingOrders } from '../../../../../Config/Interfaces';

interface Props {
    outstandingOrders: OutstandingOrders[];
    updateOrders: (newOrders: OutstandingOrders[]) => Promise<boolean>;
    receiveOrder: (
        newOrders: OutstandingOrders[],
        receivedOrder: OutstandingOrders
    ) => Promise<boolean>;
    toast: (message: string) => void;
}

const ReceiveOrder: React.FC<Props> = ({
    outstandingOrders,
    updateOrders,
    receiveOrder,
    toast,
}) => {
    const [edit, setEdit] = useState({
        index: 99,
        quantity: 0,
    });

    const saveNewQuantity = (
        e: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        if (outstandingOrders[edit.index].quantity !== edit.quantity) {
            const ordersCopy = [...outstandingOrders];
            ordersCopy[edit.index].quantity = edit.quantity;
            const success = updateOrders(ordersCopy);

            if (success) {
                toast('Order Quantity Updated');
            }
        }

        setEdit({
            index: 99,
            quantity: 0,
        });
    };

    const deleteOrder = (idx: number) => {
        const ordersCopy = [...outstandingOrders];
        ordersCopy.splice(idx, 1);
        const success = updateOrders(ordersCopy);

        if (success) {
            toast('Order Deleted');
        }
    };

    const editQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = { ...edit };
        const amt = parseFloat(e.target.value);

        copy.quantity = +amt.toFixed(2);
        setEdit(copy);
    };

    const receiveHandler = (idx: number) => {
        const ordersCopy = [...outstandingOrders];
        const received = ordersCopy.splice(idx, 1);
        const success = receiveOrder(ordersCopy, received[0]);

        if (success) {
            toast('Order Received Successfully');
        }
    };

    return (
        <ReceiveOrderContainer>
            <h3>
                <u>Current Orders</u>
            </h3>
            {outstandingOrders &&
                outstandingOrders.map((order, index) => {
                    return (
                        <Order key={order.date.seconds}>
                            <p>{getDate(order.date)}</p>
                            {index !== edit.index ? (
                                <p>
                                    {order.quantity}{' '}
                                    {order.quantity > 1 ? 'Units' : 'Unit'}
                                </p>
                            ) : (
                                <form onSubmit={saveNewQuantity}>
                                    <TextField
                                        type="number"
                                        center
                                        autoFocus
                                        defaultValue={order.quantity}
                                        onChange={editQuantity}
                                        width={30}
                                        onBlur={saveNewQuantity}
                                    />
                                    <button
                                        type="submit"
                                        style={{ display: 'none' }}
                                    ></button>
                                </form>
                            )}
                            <Config>
                                <SVG
                                    color="teal"
                                    onClick={() =>
                                        setEdit({
                                            index: index,
                                            quantity: order.quantity,
                                        })
                                    }
                                >
                                    <E />
                                </SVG>
                                <SVG
                                    color="red"
                                    onClick={() => deleteOrder(index)}
                                >
                                    <D />
                                </SVG>
                                <SVG
                                    color="green"
                                    onClick={() => receiveHandler(index)}
                                >
                                    <C />
                                </SVG>
                            </Config>
                        </Order>
                    );
                })}
        </ReceiveOrderContainer>
    );
};

export default ReceiveOrder;
