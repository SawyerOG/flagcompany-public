import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../Config/Styles';

const Picker = styled.div`
    width: 200px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    display: flex;
    align-items: center;
    background-color: #ccc;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;

    p {
        margin: 0;
        padding: 0;
    }
`;

const Side = styled.div<{ active: boolean }>`
    height: 100%;
    width: 50%;
    background-color: ${(p) => (p.active ? colors.blue : 'none')};
    color: ${(p) => (p.active ? 'white' : 'black')};
`;

const Divider = styled.div`
    border-left: 1px solid black;
    border-right: 1px solid black;
    height: 100%;
`;

const LocationPicker: React.FC<{
    changeLocations: (value: string) => void;
    activeLocations: string;
}> = ({ changeLocations, activeLocations }) => {
    return (
        <Picker>
            <Side
                onClick={() => changeLocations('Active')}
                active={activeLocations === 'Active'}
            >
                Active
            </Side>
            <Divider />
            <Side
                onClick={() => changeLocations('Archived')}
                active={activeLocations === 'Archived'}
            >
                Archived
            </Side>
        </Picker>
    );
};

export default LocationPicker;
