import styled from 'styled-components';
import { colors } from '../../../Config/Styles';

export const Container = styled.div`
    padding-left: 10px;
    width: 55%;
    text-align: center;
    position: relative;
`;

export const FieldBox = styled.div<{ width?: number }>`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 10px 0;
    width: ${(p) => (p.width ? p.width + '%' : null)};
`;

export const Label = styled.label`
    color: ${colors.red};
    font-size: 0.8rem;
    padding: 0;
    margin-left: 10px;
`;

export const SuggestionsBox = styled.div`
    position: absolute;
    left: 0;
    /* width: 100%; */
    z-index: 50;
    border-radius: 0 5px 5px 0;
    box-shadow: 0 2px 3px #eee;
    padding: 10px;
    background-color: #fff;
    text-align: left;

    p {
        margin: 0;
        padding: 8px;
    }

    p:hover {
        background-color: lightblue;
        cursor: pointer;
    }
`;

export const GeoBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
`;

export const Error = styled.span`
    color: red;
`;

//Additional Details --------->

export const DetailContainer = styled.div`
    width: 90%;
    text-align: start;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 3px #ccc;
    min-height: 300px;
    margin: 10px;
`;

export const FlagTypes = styled.ul`
    margin-top: 0;
    list-style: none;
    padding-left: 5px;

    p {
        margin: 0;
        padding: 0;
    }
`;

export const MonthlySelect = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
`;

export const SelectContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    margin: 5px 5px;
`;

export const FlagDetails = styled.div`
    /* margin-left: 20px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
