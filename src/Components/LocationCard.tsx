import styled from 'styled-components';
import { colors } from '../Config/Styles';

export const LocationCard = styled.div<{ rot?: boolean }>`
    width: 95%;
    min-height: 110px;
    border: 1px solid ${colors.green};
    border-radius: 5px;
    box-shadow: 0 2px 3px #ccc;
    margin: 5px auto;
    padding: 5px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.1rem;
    color: ${colors.green};
    height: 20px;
    border-bottom: 1px solid ${colors.green};
`;

export const AddressP = styled.p`
    margin: 5px 0;
    font-size: 1.3rem;
`;

export const Flag = styled.tr`
    width: 80%;

    td {
        width: 33%;
        text-align: center;
    }
`;
