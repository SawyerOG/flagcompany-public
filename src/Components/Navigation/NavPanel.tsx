import React from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';

const Panel = styled.div`
    height: 100vh;
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e9ecef;
    box-shadow: 6px 0px 10px 0px #eee;
`;

const Navigation: React.FC = () => {
    return (
        <Panel>
            <NavItem link="/" title="Home" />
            <NavItem link="/customerLocations" title="Customer Locations" />
            <NavItem link="/monthlyRoutes" title="Monthly Routes" />
            <NavItem link="/inventoryMgmt" title="Inventory Management" />
            <NavItem link="/jobs" title="Jobs" />
            <NavItem link="/schedule" title="Scheduling" />
        </Panel>
    );
};

export default Navigation;
