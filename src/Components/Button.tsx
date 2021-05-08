import React from 'react';
import styled from 'styled-components';

import { colors } from '../Config/Styles';

interface Props {
    /**color: red, blue, ... */
    color: 'blue' | 'red' | 'green' | 'teal';
    click?: (any?: any) => any;
    /**number of px */
    width: number;
    /**number of px */
    height: number;
    disabled?: boolean;
    type: 'button' | 'submit' | 'reset' | undefined;
    name?: string;
}

const StyledButton = styled.button<{
    color: string;
    width: number;
    height: number;
}>`
    padding: 10px;
    color: #fff;
    border-radius: 5px;
    background-color: ${p => colors[p.color]};
    width: ${p => p.width}px;
    height: ${p => p.height}px;
    font-size: 1.1rem;
    cursor: pointer;
    margin: 1px 0;
    line-height: 0px;
    outline: none;

    &:disabled {
        cursor: not-allowed;
    }
`;

const OutlinedButton = styled(StyledButton)<{
    color: string;
    width: number;
    height: number;
}>`
    background-color: #fff;
    border: 3px solid ${p => colors[p.color]};
    color: #000;

    &:disabled {
        color: #ccc;
    }
    &:active {
        box-shadow: inset 0 2px 3px #ccc;
    }
`;

export const Button: React.FC<Props> = ({
    color,
    click,
    width,
    height,
    children,
    disabled,
    type,
    name,
}) => {
    return (
        <StyledButton
            color={color}
            width={width}
            height={height}
            onClick={click}
            disabled={disabled || false}
            type={type}
            name={name}
        >
            {children}
        </StyledButton>
    );
};

export const OutlineButton: React.FC<Props> = ({
    color,
    click,
    width,
    height,
    children,
    disabled,
    type,
    name,
}) => {
    return (
        <OutlinedButton
            color={color}
            width={width}
            height={height}
            onClick={click}
            disabled={disabled || false}
            type={type}
            name={name}
        >
            {children}
        </OutlinedButton>
    );
};
