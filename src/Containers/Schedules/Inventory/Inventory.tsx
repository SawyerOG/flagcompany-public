import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../Config/Styles';

import { ScheduledMaterial } from '../../../Config/Interfaces';
import { CachedMaterials } from '../Schedule';

import { Ellipses } from '../../../Components/Loaders/Loaders';

const Cont = styled.div`
    min-height: 50%;
    max-height: 50%;
    overflow-y: auto;
    border-bottom: 2px solid #ccc;
`;

const Title = styled.h2`
    text-align: center;
    color: ${colors.green};
`;

const Inv = styled.div`
    p {
        margin: 0;
    }
`;

const Table = styled.table`
    text-align: center;
    font-size: 0.8rem;
    width: 100%;
    border-collapse: collapse;

    td {
        padding: 2px;
        width: calc(100% / 3);
    }
`;

const Disclaimer = styled.span`
    font-size: 0.5rem;
`;

interface Props {
    inventory: ScheduledMaterial[];
    jobMats: CachedMaterials;
    committed:
        | { amt: number; [key: string]: number }
        | { [key: string]: number };
}

const Inventory: React.FC<Props> = ({ inventory, jobMats, committed }) => {
    return (
        <Cont>
            <Title>
                <u>Inventory Usage</u>
            </Title>
            <Inv>
                <Table>
                    <tbody>
                        <tr>
                            <th>Item</th>
                            <th>Amt. Used</th>
                            <th>Current Quantity</th>
                            <th>Amt. Commited</th>
                        </tr>
                        {inventory.length === 0 && (
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                            </tr>
                        )}
                        {inventory.length !== 0 &&
                            inventory.map(i => (
                                <tr key={i.id}>
                                    <td>{i.matName}</td>
                                    <td>{i.quantity}</td>
                                    <td>
                                        {jobMats[i.id] ? (
                                            jobMats[i.id].currentQuantity
                                        ) : (
                                            <Ellipses />
                                        )}
                                    </td>
                                    <td>
                                        {Object.keys(committed).length > 0 ? (
                                            committed[i.id]
                                        ) : (
                                            <Ellipses />
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Inv>
            <Disclaimer>
                *Amt. Committed is the inventory amount scheduled across all
                scheduled jobs.
            </Disclaimer>
        </Cont>
    );
};

export default Inventory;
