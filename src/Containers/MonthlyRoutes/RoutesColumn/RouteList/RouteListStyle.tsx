import styled from 'styled-components';
import { colors } from '../../../../Config/Styles';

export const List = styled.div`
    max-height: 87vh;
    width: 98%;
    overflow-y: auto;
    margin: 10px auto;
    width: 95%;
`;

export const RouteCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${colors.blue};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
`;

export const Delete = styled.div`
    cursor: pointer;
    svg {
        fill: ${colors.red};
        margin: auto;
        width: 24px;
        height: 24px;
    }
`;

export const OrderBox = styled.div`
    height: 80%;
    box-sizing: border-box;
    text-align: center;
    color: ${colors.red};
`;

export const Order = styled.p`
    margin: 0;
    font-size: 0.8rem;
    margin: 0px;
`;

export const Count = styled.p`
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0px;
`;

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Address = styled.p`
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 3px;
`;

export const Info = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    p {
        margin: 0;
        padding: 5px;
    }
`;

export const NoRoutes = styled.div`
    height: 500px;
    text-align: center;
    line-height: 250px;
`;
