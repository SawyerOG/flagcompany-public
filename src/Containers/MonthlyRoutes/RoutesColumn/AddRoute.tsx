import React, { useState } from 'react';
import styled from 'styled-components';

import { db, firebase } from '../../../Config/firebase';

import { TextField } from '../../../Components/FormElements';
import { Button } from '../../../Components/Button';

const Body = styled.div`
    width: 90%;
    height: 250px;
    margin: 100px auto;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 0 2px 3px #eee;
    text-align: center;

    p {
        margin: 0;
    }
`;

const Exit = styled.div`
    position: relative;
    float: right;
    cursor: pointer;
`;

const CustomTextField = styled(TextField)`
    margin: 40px auto;
`;

const ExistsError = styled.p`
    color: red;
    margin-top: -10px;
`;

const AddRoute: React.FC<{
    setCurRoute: (route: string) => void;
    endAdding: () => void;
    routes: string[];
}> = ({ setCurRoute, endAdding, routes }) => {
    const [routeName, setRouteName] = useState<string>('');
    const [routeAlreadyExits, setRouteAlreadyExists] = useState<boolean>(false);

    const addNewRoute = async (routeName: string) => {
        if (!routes.includes(routeName)) {
            await db
                .collection('routeList')
                .doc('route')
                .update({
                    list: firebase.firestore.FieldValue.arrayUnion(routeName),
                });
            await db.collection('routes').doc(routeName).set({ list: [] });

            endAdding();
            setCurRoute(routeName);
        } else {
            setRouteAlreadyExists(true);
        }
    };

    return (
        <Body>
            <Exit onClick={() => endAdding()}>
                <strong>X</strong>
            </Exit>
            <p>New Route Name</p>
            <CustomTextField
                autoFocus
                type="text"
                onChange={(e) => setRouteName(e.target.value)}
            />
            {routeAlreadyExits && (
                <ExistsError>
                    A route with name already exists. Please choose a different
                    name.
                </ExistsError>
            )}
            <Button
                type="button"
                color="blue"
                height={60}
                width={300}
                click={() => addNewRoute(routeName)}
                disabled={routeName === ''}
            >
                create
            </Button>
        </Body>
    );
};

export default AddRoute;
