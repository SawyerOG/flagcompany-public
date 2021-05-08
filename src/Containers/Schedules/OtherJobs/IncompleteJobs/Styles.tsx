import styled from 'styled-components';
import { colors } from '../../../../Config/Styles';

export const Cont = styled.div`
    position: relative;
    z-index: 2;
    top: 0px;
    width: 50px;
    height: 50px;
    margin: 5px 0 0px 5px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
    border-radius: 50px;
    text-align: center;
    line-height: 50px;
    transition: all 0.1s ease-in-out;
    background-color: #fff;

    p {
        margin: 0;
    }

    svg {
        margin-top: 13px;
    }

    &:hover {
        width: 95%;
        border-radius: 5px;
        text-align: left;
    }
`;

export const InventoryCont = styled.div`
    height: 100%;
    border-left: 2px solid #ccc;
`;

export const Active = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 10px;
`;

export const MenuButton = styled.button<{ active: boolean; color: string }>`
    font-size: 0.7rem;
    background-color: ${p => (p.active ? colors[p.color] : '#fff')};
    border: 1px solid ${p => (p.active ? '#fff' : colors[p.color])};
    color: ${p => (p.active ? '#fff' : colors[p.color])};
    font-size: 0.8rem;
    line-height: 10px;
    width: 120px;
    height: 25px;
    padding: 5px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
`;

export const Title = styled.p`
    position: relative;
    z-index: 1;
    top: -40px;
    width: 40%;
    margin: auto;
`;
