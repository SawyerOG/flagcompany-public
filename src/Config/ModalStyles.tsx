import styled from 'styled-components';

export const BackDrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10;
    background-color: #000;
    opacity: 0.4;
`;

export const Modal = styled.div`
    position: fixed;
    top: 20%;
    left: 30%;
    z-index: 500;
    width: 800px;
    min-height: 500px;
    max-height: 700px;
    overflow-y: auto;
    background-color: #ffffff;
`;

export const Form = styled.form`
    width: 90%;
    margin: auto;
`;

export const CreateHeader = styled.p`
    margin: 10px auto;
    font-size: 1.3rem;
`;

export const Label = styled.p`
    font-size: 0.8rem;
    margin: 0;
`;

export const TextGroup = styled.div`
    margin: 10px 0;
`;

export const SubmitBar = styled.div`
    width: 100%;
    margin: 10px 0;
    text-align: center;
`;
