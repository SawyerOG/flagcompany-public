import React, { useState, useEffect } from 'react';
import { db } from '../../../Config/firebase';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import { Container } from './RoutesStyles';

import { Button } from '../../../Components/Button';

import RouteSelector from './RouteSelector';

import { Location } from '../../../Config/Interfaces';

import RouteList from './RouteList/RouteList';
import AddRoute from './AddRoute';

interface Props {
    currentRoute: string;
    setCurRoute: (route: string) => void;
    setRouteLength: (length: number) => void;
    removeRoute: (location: Location, newList: Location[]) => void;
}

const Routes: React.FC<Props> = ({
    currentRoute,
    setCurRoute,
    setRouteLength,
    removeRoute,
}) => {
    const [routes, setRoutes] = useState<string[]>([]);
    const [routeLocations, setRouteLocations] = useState<Location[]>([]);
    const [noRouteLocations, setNoRouteLocations] = useState<boolean>(false);
    const [creatingNewRoute, setCreatingNewRoute] = useState<boolean>(false);

    useEffect(() => {
        if (currentRoute === '') {
            setNoRouteLocations(false);
        } else {
            //loading?
            db.collection('routes')
                .doc(currentRoute)
                .onSnapshot(route => {
                    if (route.exists) {
                        let routeArr: Location[] = [];

                        //@ts-ignore
                        routeArr = route.data().list;

                        if (routeArr.length) {
                            setRouteLength(routeArr.length);
                            setNoRouteLocations(false);
                            setRouteLocations(routeArr);
                        } else {
                            setRouteLength(0);
                            setNoRouteLocations(true);
                        }
                        routeArr = [];
                    } else {
                        setNoRouteLocations(true);
                    }
                });
        }
    }, [currentRoute, setRouteLength]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const routeCopy = [...routeLocations];

        const movedRoute = routeCopy[source.index];
        movedRoute.order = destination.index + 1;

        routeCopy.splice(source.index, 1);
        routeCopy.splice(destination.index, 0, movedRoute);

        const startIndex =
            source.index < destination.index ? source.index : destination.index;
        const endIndex =
            source.index > destination.index ? source.index : destination.index;

        for (let i = startIndex; i <= endIndex; i++) {
            routeCopy[i].order = i + 1;
        }

        db.collection('routes').doc(currentRoute).update({
            list: routeCopy,
        });

        setRouteLocations(routeCopy);
    };

    const removeRouteHandler = (location: Location, index: number) => {
        const routesCopy = [...routeLocations];

        routesCopy.splice(index, 1);

        let orderCount = 1;
        for (let i of routesCopy) {
            i.order = orderCount;

            orderCount++;
        }

        setRouteLocations(routesCopy);

        removeRoute(location, routesCopy);
    };

    return (
        <Container>
            <Button
                type="button"
                color="blue"
                height={40}
                width={550}
                click={() => setCreatingNewRoute(true)}
            >
                Create New Route
            </Button>
            <RouteSelector
                routes={routes}
                setRoutes={(routes: string[]) => setRoutes(routes)}
                selectRoute={route => setCurRoute(route)}
                currentRoute={currentRoute}
            />
            {!creatingNewRoute && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <RouteList
                        routes={routeLocations}
                        noRoutes={noRouteLocations}
                        currentRoute={currentRoute}
                        removeRoute={removeRouteHandler}
                    />
                </DragDropContext>
            )}
            {creatingNewRoute && (
                <AddRoute
                    setCurRoute={setCurRoute}
                    endAdding={() => setCreatingNewRoute(false)}
                    routes={routes}
                />
            )}
        </Container>
    );
};

export default Routes;
