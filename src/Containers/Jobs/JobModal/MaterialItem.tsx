import React from 'react';
import styled from 'styled-components';

import { TextField, Selector } from '../../../Components/FormElements';

import { Materials } from '../../../Config/Interfaces';

const Container = styled.div`
    width: 60%;
`;

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
`;

const Add = styled.p`
    text-align: right;
    font-size: 0.8rem;
    cursor: pointer;
`;

const Delete = styled.p`
    cursor: pointer;
    &:hover {
        color: red;
    }
`;

interface Props {
    index: number;
    materials: Materials;
    update: (idx: number, type: string, value: string) => void;
    add: () => void;
    curMaterials: {
        material: string;
        quantity: number;
        [key: string]: string | number;
    }[];
    deleteMaterial: (idx: number) => void;
}

const MaterialItem: React.FC<Props> = ({
    index,
    materials,
    update,
    add,
    curMaterials,
    deleteMaterial,
}) => {
    return (
        <Container>
            {curMaterials.map((i, idx) => (
                <ItemContainer key={idx.toString()}>
                    <Selector
                        change={e => update(idx, 'material', e.target.value)}
                        name={index.toString()}
                        options={materials.materialNames}
                        selectText="select material"
                        width="250px"
                        height="42px"
                        value={i.material || ''}
                    />
                    <TextField
                        type="number"
                        min={0}
                        onChange={e => update(idx, 'quantity', e.target.value)}
                        placeholder="Quantity"
                        width={35}
                        value={i.quantity || ''}
                    />
                    <Delete onClick={() => deleteMaterial(idx)}>X</Delete>
                </ItemContainer>
            ))}
            <Add
                onClick={
                    curMaterials[curMaterials.length - 1].material !== '' &&
                    curMaterials[curMaterials.length - 1].quantity !== 0
                        ? add
                        : () => null
                }
            >
                add material
            </Add>
        </Container>
    );
};

export default MaterialItem;
