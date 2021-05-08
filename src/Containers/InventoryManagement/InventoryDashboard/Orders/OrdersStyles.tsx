import styled from 'styled-components';
import { colors } from '../../../../Config/Styles';

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 40%;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    margin: 15px;
`;

export const Label = styled.label`
    display: block;
    font-size: 0.9rem;
    margin-top: 10px;
`;

export const ButtonGroup = styled.div`
    height: 25%;
    width: 100%;
    text-align: center;
    margin-top: 10px;
`;

export const InventoryInfo = styled.div`
    height: 65%;
    width: 100%;

    h3 {
        text-align: center;
    }
`;

export const CreateOrderForm = styled.form`
    box-sizing: border-box;
    width: 100%;
    padding: 3px;
    margin-top: 10px;
`;

export const Fulfilled = styled.p`
    font-size: 1.1rem;
    color: ${colors.green};
`;

export const Submit = styled.div`
    width: 100%;
    text-align: center;
`;

export const ReceiveOrderContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 3px;
    margin-top: 10px;

    h3 {
        text-align: center;
    }
`;

export const Order = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

export const Config = styled.div`
    width: 100px;
    svg {
        cursor: pointer;
        margin-left: 3px;
        display: inline-block;
    }
`;

export const SVG = styled.svg<{ color: string }>`
    fill: #ccc;
    width: 18px;
    height: 18px;
    &:hover {
        fill: ${p => colors[p.color]};
        transform: scale(1.75);
    }
`;
