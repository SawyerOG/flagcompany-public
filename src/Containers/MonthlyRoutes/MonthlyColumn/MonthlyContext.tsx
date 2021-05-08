import React, { useState, createContext, useCallback } from 'react';
import { db } from '../../../Config/firebase';

import { Location } from '../../../Config/Interfaces';

export const MonthlyContext = createContext({
    locations: [] as Location[],
    getMonthlys: () => {},
});

const MonthlyContextProvider: React.FC = props => {
    const [locations, setLocations] = useState<Location[]>([]);

    const getMonthlys = useCallback(() => {
        let locationsArr: Location[] = [];
        db.collection('locations')
            .where('monthly', '==', true)
            .where('archived', '==', false)
            .onSnapshot(locations => {
                if (!locations.empty) {
                    locations.forEach(i => {
                        //@ts-ignore
                        locationsArr.push(i.data());
                    });
                }

                setLocations(locationsArr);
                locationsArr = [];
            });
    }, []);

    return (
        <MonthlyContext.Provider
            //@ts-ignore
            value={{ locations: locations, getMonthlys: getMonthlys }}
        >
            {props.children}
        </MonthlyContext.Provider>
    );
};

export default MonthlyContextProvider;
