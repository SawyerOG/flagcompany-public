import React, { useState } from 'react';

import { CreateOrderForm, Label, Fulfilled, Submit } from '../OrdersStyles';
import { TextField } from '../../../../../Components/FormElements';
import { OutlineButton } from '../../../../../Components/Button';
import { CustomDatePicker } from '../../../../../Components/DatePicker/DatePicker';

import {
    InvItemSaleData,
    OutstandingOrders,
} from '../../../../../Config/Interfaces';

const CreateOrder: React.FC<{
    invItem: InvItemSaleData;
    outstandingOrders: OutstandingOrders[];
    updateOrders: (newOrder: OutstandingOrders[]) => Promise<boolean>;
    toast: (message: string) => void;
}> = ({ invItem, outstandingOrders, updateOrders, toast }) => {
    const [formData, setFormData] = useState<{
        date: Date;
        quantity: number;
    }>({ date: new Date(), quantity: 0 });

    const updateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = { ...formData };
        copy.quantity = +parseFloat(e.target.value).toFixed(2) || 0;
        setFormData(copy);
    };

    const updateDate = (date: Date | [Date, Date] | null) => {
        const copy = { ...formData };
        //@ts-ignore
        copy.date = date;
        setFormData(copy);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const oustandingOrdersCopy = [...outstandingOrders];
        //Maybe an outstanding orders array?
        const order = {
            id: invItem.id,
            ...formData,
        };

        //@ts-ignore
        oustandingOrdersCopy.push(order);
        const success = updateOrders(oustandingOrdersCopy);
        if (success) {
            toast('Order Created Succefully!');
            setFormData({ date: new Date(), quantity: 0 });
        }
    };

    return (
        <CreateOrderForm onSubmit={onSubmit}>
            <h3>
                <u>Create New Order</u>
            </h3>
            <Label>Number of Orders</Label>
            <TextField
                type="number"
                step={1}
                min={0}
                placeholder="1"
                onChange={updateHandler}
                value={formData.quantity || ''}
            />
            <Label>Date of Order</Label>
            <CustomDatePicker onChange={updateDate} selected={formData.date} />
            <Label>Expected Fulfilled Unit Quantity</Label>
            <Fulfilled>{formData.quantity * invItem.orderQuantity}</Fulfilled>
            <Submit>
                <OutlineButton
                    color="teal"
                    type="submit"
                    height={40}
                    width={150}
                    disabled={formData.quantity === 0}
                >
                    submit
                </OutlineButton>
            </Submit>
        </CreateOrderForm>
    );
};

export default CreateOrder;
