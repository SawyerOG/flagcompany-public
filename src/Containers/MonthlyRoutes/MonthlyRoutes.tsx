import React, { useState, useCallback } from 'react';
import { db, firebase } from '../../Config/firebase';

import Card from '../../Components/Card';
import Monthlys from './MonthlyColumn/Monthlys';
import Route from './RoutesColumn/Routes';

import { Container } from './MonthlyRoutesStyles';

import { Location } from '../../Config/Interfaces';

const Routes: React.FC = () => {
    const [currentRoute, setCurrentRoute] = useState<string>('');
    const [currentRouteLength, setCurrentRouteLength] = useState<number>(0);

    const setRouteLength = useCallback((length: number) => {
        setCurrentRouteLength(length);
    }, []);

    const onRouteAddHandler = (location: Location) => {
        //Need to add the route to the location.
        db.collection('locations')
            .doc(location.name)
            .update({
                currentRoutes: firebase.firestore.FieldValue.arrayUnion(
                    currentRoute
                ),
            });

        location.order = currentRouteLength + 1;
        //Need to add the location to the route.
        db.collection('routes')
            .doc(currentRoute)
            .update({
                list: firebase.firestore.FieldValue.arrayUnion(location),
            });

        setRouteLength(location.order);
    };

    const onRouteRemoveHandler = (location: Location, newList: Location[]) => {
        //Need to remove the location from the route.
        db.collection('routes').doc(currentRoute).update({
            list: newList,
            // list: firebase.firestore.FieldValue.arrayRemove(location),
        });

        //Need to remove the route from the location.
        db.collection('locations')
            .doc(location.name)
            .update({
                currentRoutes: firebase.firestore.FieldValue.arrayRemove(
                    currentRoute
                ),
            });
    };

    return (
        <Card>
            <Container>
                <Monthlys
                    currentRoute={currentRoute}
                    addRoute={onRouteAddHandler}
                />
                <Route
                    currentRoute={currentRoute}
                    setCurRoute={route => setCurrentRoute(route)}
                    setRouteLength={setRouteLength}
                    removeRoute={onRouteRemoveHandler}
                />
            </Container>
        </Card>
    );
};

export default Routes;
