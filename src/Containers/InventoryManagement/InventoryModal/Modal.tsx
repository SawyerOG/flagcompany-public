import React, { useState } from 'react';

import { TextField, TextArea } from '../../../Components/FormElements';
import { Button } from '../../../Components/Button';
import { Spinner } from '../../../Components/Loaders/Loaders';

import {
    BackDrop,
    Modal,
    Form,
    CreateHeader,
    Label,
    TextGroup,
    SubmitBar,
} from '../../../Config/ModalStyles';

import { InvItem, InvItemSaleData, FormData } from '../../../Config/Interfaces';

const initialState = {
    orderName: '',
    orderType: '',
    orderPrice: 0.0,
    orderDetails: '',
    orderQuantity: 0,
    currentQuantity: 0,
    committed: 0,
};

export const InventoryModal: React.FC<{
    saveData: (formData: InvItem) => Promise<boolean>;
    cancel: () => void;
    defaultValues?: InvItemSaleData;
    toast: (message: string) => void;
}> = ({ saveData, cancel, defaultValues, toast }) => {
    const [formData, setFormData] = useState<FormData>(
        defaultValues || initialState
    );
    const [loading, setLoading] = useState<boolean>(false);

    const updateHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const copy = { ...formData };
        const name: string = e.target.name;

        if (name === 'orderPrice' || name === 'orderQuantity') {
            copy[name] = +Number(e.target.value).toFixed(2);
        } else {
            copy[name] = e.target.value;
        }

        setFormData(copy);
    };

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        const res = saveData(formData);

        setTimeout(() => {
            if (res) {
                setLoading(false);
                toast('Inventory Successfully Updated');
            }
        }, 1000);
    };

    return (
        <>
            <BackDrop onClick={cancel} />
            <Modal>
                {!loading ? (
                    <Form onSubmit={submitForm}>
                        <CreateHeader>
                            {!defaultValues?.orderName
                                ? 'Create New Inventory Item'
                                : 'Update Inventory Details'}
                        </CreateHeader>
                        <TextGroup>
                            <Label>Inventory Item Name</Label>
                            <TextField
                                type="text"
                                placeholder="Concrete Bags (60lb)"
                                name="orderName"
                                onChange={updateHandler}
                                width={100}
                                defaultValue={
                                    defaultValues ? defaultValues.orderName : ''
                                }
                            />
                        </TextGroup>
                        <TextGroup>
                            <Label>Order Type</Label>
                            <TextField
                                type="text"
                                placeholder="Pallet"
                                name="orderType"
                                onChange={updateHandler}
                                width={100}
                                defaultValue={
                                    defaultValues ? defaultValues.orderType : ''
                                }
                            />
                        </TextGroup>
                        <TextGroup>
                            <Label>Order Price ($)</Label>
                            <TextField
                                type="number"
                                min={0}
                                step={0.01}
                                placeholder="0.00"
                                name="orderPrice"
                                onChange={updateHandler}
                                width={100}
                                defaultValue={
                                    defaultValues
                                        ? defaultValues.orderPrice
                                        : ''
                                }
                            />
                        </TextGroup>
                        <TextGroup>
                            <Label>Order Quantity</Label>
                            <TextField
                                type="number"
                                min={0}
                                step={1}
                                placeholder="1"
                                name="orderQuantity"
                                onChange={updateHandler}
                                width={100}
                                defaultValue={
                                    defaultValues
                                        ? defaultValues.orderQuantity
                                        : ''
                                }
                            />
                        </TextGroup>
                        <TextGroup>
                            <Label>Order Details</Label>
                            <TextArea
                                name="orderDetails"
                                onChange={updateHandler}
                                rowNumber={12}
                                defaultValue={
                                    defaultValues
                                        ? defaultValues.orderDetails
                                        : ''
                                }
                            />
                        </TextGroup>
                        <SubmitBar>
                            <Button
                                color="green"
                                height={40}
                                width={100}
                                type="submit"
                            >
                                {!defaultValues?.orderName
                                    ? 'create'
                                    : 'update'}
                            </Button>
                        </SubmitBar>
                    </Form>
                ) : (
                    <Spinner />
                )}
            </Modal>
        </>
    );
};
