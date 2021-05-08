import React from 'react';
import styled from 'styled-components';

import Card from '../Components/Card';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
`;

const Home = () => {
    return (
        <Card>
            <Container>
                <p>Who Am I?</p>
            </Container>
        </Card>
    );
};

export default Home;
