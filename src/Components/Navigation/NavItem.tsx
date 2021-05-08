import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../Config/Styles';

interface Item {
    link: string;
    title: string;
}

const StyledLink = styled(NavLink)`
    margin: 10px 0;
    color: ${colors.blue};
    text-decoration: none;

    &.active {
        color: ${colors.red};
        text-decoration: underline;
    }
`;

const NavItem: React.FC<Item> = ({ link, title }) => {
    return (
        <StyledLink to={link} exact activeClassName="active">
            {title}
        </StyledLink>
    );
};

export default NavItem;
