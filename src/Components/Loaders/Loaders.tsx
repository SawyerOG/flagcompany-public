import React from 'react';
import styled from 'styled-components';

import './Ellipses.css';
import './Spinner.css';

export const Ellipses = () => {
    return (
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

const SpinnerBody = styled.div`
    width: 100%;
    margin-top: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Spinner = () => {
    return (
        <SpinnerBody>
            <div className="lds-dual-ring"></div>
        </SpinnerBody>
    );
};
