import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../Config/Styles';
import { Job, MaterialsIDs } from '../../../Config/Interfaces';

import { ReactComponent as Edit } from '../../../Components/Images/edit.svg';
import { ReactComponent as Check } from '../../../Components/Images/check.svg';
import { ReactComponent as Clear } from '../../../Components/Images/clear.svg';

const Container = styled.div`
    width: 60%;
    height: 90%;
    margin: auto;
    border-radius: 5px;
    padding: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;

    p {
        font-size: 1.3rem;
        color: ${colors.blue};
        font-weight: 600;
    }

    svg:hover {
        fill: #88ffd1;
        cursor: pointer;
    }
`;

const Body = styled.div`
    padding-left: 25px;
    margin-top: 25px;
`;

const MaterialTable = styled.table`
    border-collapse: collapse;
    width: 600px;
    margin-bottom: 50px;
    td {
        text-align: center;
    }
`;

const DigItem = styled.div<{ required?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    padding-left: 40px;
    margin: 0;
    svg {
        fill: ${p => (p.required ? colors.green : colors.red)};
        width: 30px;
        height: 30px;
    }
`;

interface Props {
    curJob: Job;
    materials: MaterialsIDs;
    updateJob: () => void;
}

const Display: React.FC<Props> = ({ curJob, materials, updateJob }) => {
    return (
        <Container>
            <Header>
                <p>{curJob.jobName}</p>
                <Edit onClick={updateJob} />
            </Header>
            <Body>
                <MaterialTable>
                    <tbody>
                        <tr>
                            <th>Material</th>
                            <th>Quantity</th>
                        </tr>
                        {curJob.materials.map(i => (
                            <tr key={i.id + i.quantity}>
                                <td>{materials[i.id]}</td>
                                <td>{i.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </MaterialTable>
                <DigItem required={curJob.digging}>
                    <p>Requires Digging</p>
                    {curJob.digging ? <Check /> : <Clear />}
                </DigItem>
                {curJob.digging && (
                    <DigItem>
                        <p>Water Quantity</p>
                        {curJob.water}
                    </DigItem>
                )}
                <p>{curJob.jobDescription}</p>
            </Body>
        </Container>
    );
};

export default Display;
