import React from 'react';
import styled from 'styled-components';

import NavPanel from './Navigation/NavPanel';

const Page = styled.div`
    width: 100vw;
    display: flex;
`;

const Content = styled.div`
    width: 85%;
    display: flex;
    /* padding: 10px; */
    box-sizing: border-box;
    box-shadow: inset 2px 1px 2px #ccc;
`;

const Card: React.FC = props => {
    return (
        <Page>
            <NavPanel />
            <Content>{props.children}</Content>
        </Page>
    );
};

export default Card;
