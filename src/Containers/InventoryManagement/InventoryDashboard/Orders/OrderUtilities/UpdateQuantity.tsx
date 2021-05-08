import React, { useState } from 'react';
import styled from 'styled-components';

import { TextField } from '../../../../../Components/FormElements';
import { Button, OutlineButton } from '../../../../../Components/Button';

const Container = styled.div`
    width: 95%;
    margin: auto;
    text-align: auto;
`;

const Buttons = styled.div`
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
`;

const Submit = styled.div`
    display: grid;
    height: 100px;
    width: 100%;
    place-items: center;
`;

const UpdateQuantity: React.FC<{
    updateQuantity: (quantity: number, math: string) => Promise<boolean>;
    toast: (message: string) => void;
}> = ({ updateQuantity, toast }) => {
    const [value, setValue] = useState(0);
    const [mathType, setMathType] = useState('add');

    const updateQuantityHandler = async () => {
        const success = await updateQuantity(value, mathType);

        if (success) {
            toast('Quantity Updated Successfully');
        }
    };

    return (
        <Container>
            <TextField
                type="number"
                step={0}
                onChange={e => setValue(parseInt(e.target.value))}
                value={value ? value : ''}
                placeholder="Unit quantity change amount"
                width={100}
            />
            <Submit>
                <Buttons>
                    {mathType !== 'add' ? (
                        <OutlineButton
                            color="blue"
                            type="button"
                            height={40}
                            width={150}
                            click={() => setMathType('add')}
                        >
                            Add
                        </OutlineButton>
                    ) : (
                        <Button
                            color="blue"
                            type="button"
                            height={40}
                            width={150}
                        >
                            Add
                        </Button>
                    )}
                    {mathType !== 'sub' ? (
                        <OutlineButton
                            color="blue"
                            type="button"
                            height={40}
                            width={150}
                            click={() => setMathType('sub')}
                        >
                            Subtract
                        </OutlineButton>
                    ) : (
                        <Button
                            color="blue"
                            type="button"
                            height={40}
                            width={150}
                        >
                            Subtract
                        </Button>
                    )}
                </Buttons>
                <Button
                    type="button"
                    color="green"
                    height={45}
                    width={225}
                    click={updateQuantityHandler}
                >
                    Submit
                </Button>
            </Submit>
        </Container>
    );
};

export default UpdateQuantity;
