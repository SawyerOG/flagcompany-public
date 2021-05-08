import styled from 'styled-components';
import { colors } from '../../../Config/Styles';

export const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 99%;
    padding: 5px;
`;
export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 25%;
`;

export const TableCont = styled.div`
    height: 100%;
    width: 60%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    p {
        margin: 0;
        padding: 0;
    }

    h4 {
        margin: 3px 0px;
    }
`;

export const Stack = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const JobCont = styled.div`
    height: calc(100vh - 90px);
    width: 100%;
    overflow-y: auto;
    border-right: 2px solid #ccc;
    border-top: 2px solid #ccc;
    border-radius: 5px;
`;

export const DragMessage = styled.p`
    margin: 200px;
    text-align: center;
`;

// <---- Job Item ----> //
export const JobBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const JobRow = styled.div`
    display: flex;
    align-items: center;
    height: 60px;
    width: 97%;
    padding: 3px;
    border: 1px solid rgba(60, 64, 67, 0.3);
    border-radius: 4px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    background-color: #fff;
    #Job {
        margin-right: 10px;
        cursor: pointer;
    }
`;

export const ArrowBody = styled.span<{ active: boolean }>`
    display: grid;
    place-items: center;
    cursor: pointer;
    transform: ${p => (p.active ? 'rotate(90deg)' : null)};

    svg {
        height: 40px;
        width: 40px;
        fill: ${p => (p.active ? colors.teal : '#000')};
    }
`;

export const ExpandedJob = styled.div<{ selected: boolean }>`
    background-color: #eee;
    max-height: ${p => (p.selected ? '500' : '0')}px;
    width: 97%;
    margin: auto;
    transition: max-height 0.2s ease-out;
    overflow: auto;
`;

export const InfoGrid = styled.div`
    display: grid;
    grid-template-columns: 15% 25% 55% 5%;
    grid-template-rows: auto;
    width: 100%;
`;

export const MonthlyGrid = styled.div`
    display: grid;
    grid-template-columns: 15% 25% 55% 5%;
    grid-template-rows: auto;
    width: 100%;
`;

export const Count = styled.p`
    color: ${colors.green};
`;

export const MonthlyCount = styled.p`
    color: ${colors.green};
`;

//<----------Address Picker ------------>//

export const AddrCont = styled.div`
    width: 100%;
`;

export const Button = styled.div<{ incomplete: boolean }>`
    height: 90%;
    width: 90%;
    border: ${p =>
        p.incomplete ? '1px solid #ee6055' : '1px solid rgba(60, 64, 67, 0.3)'};
    border-radius: 5px;
    box-shadow: ${p =>
        p.incomplete
            ? 'box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),0 1px 3px 1px rgba(60, 64, 67, 0.15)'
            : 'none'};
    padding: 3px;
`;

export const NoSelection = styled.p`
    font-size: 1.1rem;
    text-align: center;
    line-height: 50px;
    margin: 0;
`;

export const SelectCont = styled.div`
    position: absolute;
    background-color: #fff;
    padding: 5px;
    border: 1px solid rgba(60, 64, 67, 0.3);
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
`;

export const AddrItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 0.8px solid rgba(60, 64, 67, 0.3);
    border-radius: 3px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    padding: 3px;
    margin: 1px 0px;
    cursor: pointer;

    p {
        margin: 0;
    }

    &:hover {
        background-color: lightblue;
        color: #fff;
    }
`;

export const MonthlyAddr = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3px;
    margin: 1px 0px;

    p {
        margin: 0;
    }
`;

export const CompleteAddrItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 3px;
    margin: 1px 0px;
    cursor: pointer;

    p {
        margin: 0;
    }

    &:hover {
        border: 0.8px solid rgba(60, 64, 67, 0.3);
    }
`;

export const List = styled.div`
    overflow-y: auto;
    max-height: 400px;
`;

export const Search = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Exit = styled.p`
    font-weight: bold;
    cursor: pointer;
    margin: 0;
    padding: 0;

    &:hover {
        color: red;
    }
`;
