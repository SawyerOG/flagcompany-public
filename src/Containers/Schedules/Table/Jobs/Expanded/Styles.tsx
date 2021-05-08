import styled from 'styled-components';
import { colors } from '../../../../../Config/Styles';

export const Container = styled.div`
    font-size: 0.9rem;
    margin-top: 15px;
`;

export const Body = styled.div`
    padding-left: 25px;
`;

export const TopRow = styled.div<{ edit: boolean }>`
    display: flex;
    justify-content: ${p => (p.edit ? 'space-evenly' : 'space-between')};
    align-items: center;
    width: ${p => (p.edit ? '100%' : '80%')};
    margin: auto;
`;

export const MaterialTable = styled.table<{ editing: boolean }>`
    border-collapse: collapse;
    margin-bottom: 10px;
    width: ${p => (p.editing ? null : '350px')};

    td {
        text-align: center;
    }
`;

export const DigItem = styled.div<{ required?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 270px;
    padding-left: 40px;
    margin: 0px;

    p {
        margin: 0;
        padding: 0;
    }
    svg {
        fill: ${p => (p.required ? colors.green : colors.red)};
        width: 20px;
        height: 20px;
    }
`;

export const EditCont = styled.span<{ on: number }>`
    cursor: ${p => (p.on ? 'pointer' : 'not-allowed')};

    &:hover {
        fill: ${colors.teal};
        color: ${p => (p.on ? colors.teal : 'red')};
    }
`;

export const Delete = styled.span`
    cursor: pointer;
    position: relative;
    right: -20px;

    &:hover {
        color: red;
    }
`;
//<------ Expanded Monthly ----->//

export const MonthlyBody = styled.div`
    width: 80%;
    margin: auto;

    p {
        margin: 5px 0px;
    }
`;

export const Geo = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-bottom: 1px solid black;
    margin-bottom: 10px;
`;

export const Title = styled.span`
    font-size: 0.8rem;
`;

export const TH = styled.th`
    font-size: 0.8rem;
    text-decoration: underline;
`;

export const MonthlyContent = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const FlagTable = styled.table`
    border-collapse: collapse;
    align-self: flex-start;
    width: 50%;
    text-align: center;
`;
