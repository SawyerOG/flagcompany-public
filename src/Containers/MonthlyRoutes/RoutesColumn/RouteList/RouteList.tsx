import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { List, NoRoutes } from './RouteListStyle';

import { Location } from '../../../../Config/Interfaces';

import { RouteCards } from './RouteCard';

interface Props {
    routes: Location[];
    noRoutes: boolean;
    currentRoute: string;
    removeRoute: (location: Location, index: number) => void;
}

const RouteList: React.FC<Props> = ({
    routes,
    noRoutes,
    currentRoute,
    removeRoute,
}) => {
    return (
        <Droppable droppableId="routeColumn">
            {provided => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                    {!noRoutes &&
                        currentRoute !== '' &&
                        routes.map((i, index) => (
                            <RouteCards
                                key={i.name}
                                index={index}
                                i={i}
                                removeRoute={removeRoute}
                            />
                        ))}
                    {provided.placeholder}
                    {noRoutes && (
                        <NoRoutes>
                            <p>The are no locations on this route yet!</p>
                        </NoRoutes>
                    )}
                    {currentRoute === '' && (
                        <NoRoutes>
                            <p>Select a Route!</p>
                        </NoRoutes>
                    )}
                </List>
            )}
        </Droppable>
    );
};

export default RouteList;
