import React, { useEffect } from 'react';
import styled from 'styled-components';

const Body = styled.div<{ show: string }>`
    position: absolute;
    top: 45px;
    right: 40px;
    width: 325px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border-radius: 5px;
    background-color: #88ffd1;
    z-index: 1000;
    display: ${p => (p.show ? null : 'none')};
`;

const Toast: React.FC<{ show: string; cancel: () => void }> = ({
    show,
    cancel,
}) => {
    useEffect(() => {
        if (show) {
            setTimeout(() => {
                cancel();
            }, 3000);
        }
    }, [show, cancel]);

    return (
        <Body onClick={cancel} show={show}>
            {show}
        </Body>
    );
};

export default Toast;
