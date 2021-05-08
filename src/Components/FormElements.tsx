import React from 'react';
import styled from 'styled-components';
import { colors } from '../Config/Styles';

interface InputField {
    /**A number to calculate the percentage width. Default: 100% */
    width?: number;
    height?: number;
    error?: boolean;
    center?: boolean;
}

export const TextField = styled.input<InputField>`
    font-size: 1.1rem;
    outline: none;
    background-color: #fff;
    border: 1px solid ${p => (p.error ? 'red' : '#eee')};
    width: ${p => (p.width ? p.width : 90)}%;
    height: ${p => (p.height ? p.height : 42)}px;
    padding: 5px;
    text-align: ${p => (p.center ? 'center' : 'left')};
    box-sizing: border-box;

    &:focus {
        border: 1px solid ${colors.blue};
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export const TextArea = styled.textarea<{ rowNumber: number; width?: number }>`
    height: ${p => p.rowNumber}em;
    width: ${p => (p.width ? p.width : 100)}%;
`;

const CheckContainer = styled.div<{ width?: number | null }>`
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    min-width: ${p => (p.width ? p.width : 75)}px;
    /* margin-left: 10px; */
    font-size: 0.9rem;
`;

const CheckBox = styled.input`
    height: 15px;
    width: 15px;
    margin-right: 10px;
`;

export const CheckField: React.FC<{
    label: string;
    checked: boolean;
    change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    width?: number;
    name?: string;
}> = ({ label, checked, width, change, name }) => {
    return (
        <CheckContainer width={width || null}>
            <CheckBox
                type="checkbox"
                checked={checked}
                onChange={change}
                name={name || ''}
            />
            <label>{label}</label>
        </CheckContainer>
    );
};

const StyledSelect = styled.select<{
    width?: string;
    height?: string;
    fontSize?: number;
    error?: number | string | boolean;
}>`
    background-color: #fff;
    padding: 5px;
    border: ${p => (p.error ? '1px solid red' : 'none')};
    width: ${p => (p.width ? p.width : '150px')};
    height: ${p => (p.height ? p.height : '')};
    font-size: ${p => (p.fontSize ? p.fontSize : 1)}rem;

    outline: none;
`;

export const Selector: React.FC<{
    change: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    options: string[];
    value?: string;
    required?: boolean;
    width?: string;
    height?: string;
    fontSize?: number;
    selectText?: string;
    disableOptions?: string[];
    error?: number | string | boolean;
}> = ({
    change,
    name,
    options,
    required,
    value,
    width,
    height,
    fontSize,
    selectText,
    disableOptions,
    error,
}) => {
    return (
        <StyledSelect
            onChange={change}
            name={name}
            required={required}
            value={value}
            width={width}
            height={height}
            fontSize={fontSize}
            error={error}
        >
            <option value="">{selectText ? selectText : 'Select'}</option>
            {options.map(i => (
                <option
                    key={i}
                    value={i}
                    disabled={disableOptions?.includes(i)}
                >
                    {i}
                </option>
            ))}
        </StyledSelect>
    );
};
