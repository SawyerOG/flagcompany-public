import styled from 'styled-components';
import { colors } from '../../../../Config/Styles';

export const SearchBox = styled.div`
    font-size: 0.8rem;
    height: 50px;
    border-radius: 5px;
    margin-bottom: 5px;
`;

export const Toggles = styled.div`
    height: 50%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #e1e1e1;
    border: 1px solid #000;
    cursor: pointer;
    margin-bottom: 5px;
`;

export const Toggle = styled.div<{ active: boolean }>`
    width: 20%;
    height: 100%;
    box-shadow: 0px 2px 2px #000;
    text-align: center;
    line-height: 3rem;
    box-shadow: ${p => (p.active ? 'inset -2px -2px 6px #000;' : null)};
    color: ${p => (p.active ? colors.red : '#000')};
    border-radius: 2px;
`;

export const SearchRow = styled.div<{ activeSetting: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        fill: ${p => (p.activeSetting ? 'coral' : null)};
    }

    svg:hover {
        cursor: pointer;
        transform: rotate(90deg);
        transition: linear;
        transition-duration: 0.4s;
    }
`;

export const SettingsContainer = styled.div`
    position: absolute;
    top: 15%;
    left: 47%;
    background-color: #fff;
    width: 300px;
    height: 95px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid black;
    z-index: 2;
`;

export const SettingsDetail = styled.div`
    font-size: 0.6rem;
    padding: 0;
    margin: 0;
    color: lightskyblue;
`;
