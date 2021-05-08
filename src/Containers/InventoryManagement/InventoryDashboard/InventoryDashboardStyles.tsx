import styled from 'styled-components';
import { colors } from '../../../Config/Styles';

export const Container = styled.div`
    box-sizing: border-box;
    height: 100vh;
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #989898;
`;

export const DataBody = styled.div`
    display: flex;
    height: 70%;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    background-color: #fff;
    padding-left: 30px;
`;

export const InfoContainer = styled.div`
    width: 60%;
`;

export const DataHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px -10px;
    width: 90%;

    p {
        font-size: 1.3rem;
    }

    svg:hover {
        fill: #88ffd1;
        cursor: pointer;
    }
`;

export const ListItem = styled.div`
    margin: 10px;

    label {
        display: inline-block;
        font-size: 0.9rem;
        width: 150px;
        color: ${colors.green};
        border-bottom: 1px solid ${colors.green};
    }

    p {
        font-size: 1.1rem;
        border-left: 2px solid ${colors.green};
        border-bottom: 2px solid ${colors.green};
        width: 90%;
        padding: 8px;
        margin: 0;
        max-height: 10em;
        overflow-y: auto;
    }
`;

export const OrdersContainer = styled.div`
    margin-top: 30px;
    margin-left: 50px;
    font-size: 1.2rem;

    span {
        color: ${colors.green};
        font-size: 1.5rem;
    }
`;

export const NoItem = styled.div`
    width: 100%;
    margin-top: 20%;
    text-align: center;
    font-size: 3rem;
`;
