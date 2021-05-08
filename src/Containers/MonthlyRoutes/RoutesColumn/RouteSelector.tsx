import React, { useEffect } from 'react';

import { db } from '../../../Config/firebase';
import { Selector } from '../../../Components/FormElements';

interface Props {
    routes: string[];
    setRoutes: (routes: string[]) => void;
    selectRoute: (route: string) => void;
    currentRoute: string;
}

const RouteSelector: React.FC<Props> = ({
    routes,
    setRoutes,
    selectRoute,
    currentRoute,
}) => {
    useEffect(() => {
        if (routes.length) return;

        let listArr: string[] = [];

        db.collection('routeList')
            .doc('route')
            .onSnapshot((routeList) => {
                if (routeList.exists) {
                    //@ts-ignore
                    listArr = routeList.data().list;
                    setRoutes(listArr);
                    listArr = [];
                }
            });
    }, [routes, setRoutes]);

    const updateRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const route: string = e.target.value;
        selectRoute(route);
    };

    return (
        <Selector
            selectText="Select Route"
            name="routes"
            options={routes}
            change={updateRoute}
            width="550px"
            height="40px"
            fontSize={1.1}
            value={currentRoute}
        />
    );
};

export default RouteSelector;
