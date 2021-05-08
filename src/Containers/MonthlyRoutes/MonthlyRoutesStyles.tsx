import styled from 'styled-components';
import { colors } from '../../Config/Styles';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    height: 100%;
    width: 100%;
`;

export const ActiveMonthlys = styled.div`
    max-height: 100%;
    width: 50%;
    padding-right: 5%;
    box-shadow: 4px 0px 20px #ccc;
`;

export const LocationWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const CurrentRoutes = styled.span`
    margin: 5px 0;
    color: ${colors.red};
    font-size: 1.1rem;
`;

export const AddToRoute = styled.div<{ disable: boolean | undefined }>`
    border-radius: 0 5px 5px 0;
    height: 110px;
    width: 40px;
    white-space: nowrap;
    border: 1px solid ${colors.red};
    opacity: 0.4;
    cursor: ${p => (p.disable ? 'not-allowed' : 'pointer')};

    p {
        font-size: 0.7rem;
        color: ${colors.red};
        transform: rotate(90deg);
        margin-left: 2px;
        padding: 5px;
    }

    &:hover {
        background-color: ${p => (p.disable ? '#fff' : colors.red)};
        opacity: ${p => (p.disable ? '0.4' : '1')};

        p {
            color: ${p => (p.disable ? colors.red : '#fff')};
        }
    }
`;

export const MonthlyHeader = styled.h3`
    margin-top: 10px;
    text-align: center;
    font-weight: 600;
    text-decoration: underline;
    color: ${colors.green};
`;

export const Monthlys = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    max-height: calc(100vh - 140px);
    padding: 5px 5px;
    border-radius: 5px;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
        0 1px 3px 1px rgba(60, 64, 67, 0.15);
`;

export const GeoBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 5px auto;
    border-bottom: 1px solid ${colors.green};

    p {
        margin: 0;
    }
`;
