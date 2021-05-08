import React, { useState, useEffect, useContext, useCallback } from 'react';
import { MonthlyContext } from '../MonthlyColumn/MonthlyContext';

import SearchBox from './SearchBox/Search';

import {
    LocationCard,
    Header,
    AddressP,
    Flag,
} from '../../../Components/LocationCard';

import {
    ActiveMonthlys,
    AddToRoute,
    LocationWrapper,
    CurrentRoutes,
    MonthlyHeader,
    Monthlys,
    GeoBox,
} from '../MonthlyRoutesStyles';

import { Location } from '../../../Config/Interfaces';

interface Props {
    currentRoute: string;
    addRoute: (location: Location) => void;
}

const MonthlyList: React.FC<Props> = ({ currentRoute, addRoute }) => {
    const { locations, getMonthlys } = useContext(MonthlyContext);

    const [monthlysWithNoRoute, setMonthlysWithNoRoute] = useState<{
        locations: Location[];
        hiddenAmount: number;
    }>({ locations: [], hiddenAmount: 0 });

    const [searchedMonthlys, setSearchedMonthlys] = useState<{
        locations: Location[];
    }>({ locations: [] });
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        if (locations.length) return;

        getMonthlys();
    }, [locations, getMonthlys]);

    const toggleLocationsWithRoutes = () => {
        // console.log(monthlysWithNoRoute.locations.length);
        if (!monthlysWithNoRoute.locations.length) {
            const monthlyCopy = [...locations];

            const newMonthlys = monthlyCopy.filter(
                i => i.currentRoutes?.length === 0
            );

            const hiddenAmount = monthlyCopy.length - newMonthlys.length;

            setMonthlysWithNoRoute({
                locations: newMonthlys,
                hiddenAmount: hiddenAmount,
            });
        } else {
            setMonthlysWithNoRoute({ locations: [], hiddenAmount: 0 });
        }
    };

    const addRouteHandler = (i: Location, index: number) => {
        if (monthlysWithNoRoute.locations.length) {
            const copy = { ...monthlysWithNoRoute };
            const copyLocations = [...monthlysWithNoRoute.locations];
            copyLocations.splice(index, 1);
            copy.locations = copyLocations;
            copy.hiddenAmount = copy.hiddenAmount + 1;
            setMonthlysWithNoRoute(copy);
        }
        addRoute(i);
    };

    const searchMonthlys = useCallback(
        (value: string) => {
            setNoResults(false);
            if (value !== '') {
                //If monthlysWithNoRoutes has routes it is toggled and that is what the routes should be based off of.

                const search = value.toUpperCase();

                const filtered = [...locations].filter(
                    i =>
                        i.address.toUpperCase().includes(search) ||
                        i.cleat.toUpperCase().includes(search) ||
                        i.lat.toUpperCase().includes(search) ||
                        i.lng.toUpperCase().includes(search) ||
                        i.monthlyComments.toUpperCase().includes(search) ||
                        i.name.toUpperCase().includes(search) ||
                        i.owner.toUpperCase().includes(search) ||
                        i.poleHeight.toUpperCase().includes(search) ||
                        i.poleType.toUpperCase().includes(search) ||
                        i.retainer.toUpperCase().includes(search)
                );

                if (filtered.length > 0) {
                    setSearchedMonthlys({ locations: filtered });
                } else {
                    setNoResults(true);
                }
            } else {
                setSearchedMonthlys({ locations: [] });
            }
        },
        [locations]
    );

    let activeMonthlys: Location[] = locations;
    if (monthlysWithNoRoute.locations.length) {
        activeMonthlys = monthlysWithNoRoute.locations;
    }
    if (searchedMonthlys.locations.length) {
        activeMonthlys = searchedMonthlys.locations;
    }

    return (
        <ActiveMonthlys>
            <MonthlyHeader>Active Monthlys</MonthlyHeader>
            <SearchBox
                search={searchMonthlys}
                toggleWithRoutes={toggleLocationsWithRoutes}
                hasWithoutRoutes={monthlysWithNoRoute.locations.length > 0}
                hiddenMonthlyAmount={monthlysWithNoRoute.hiddenAmount}
            />
            <Monthlys>
                {!noResults && activeMonthlys ? (
                    activeMonthlys.map((i, index) => (
                        <LocationWrapper key={i.name}>
                            <LocationCard>
                                <Header>
                                    <p>{i.name}</p>
                                    <p>{i.owner}</p>
                                </Header>
                                <AddressP>{i.address}</AddressP>
                                <GeoBox>
                                    <p>Lat: {i.lat}</p>
                                    <p>Lng: {i.lng}</p>
                                </GeoBox>
                                <table>
                                    <tbody>
                                        {i.flagTypes.map(f =>
                                            f.active ? (
                                                <Flag key={f.flag}>
                                                    <td>
                                                        <strong>
                                                            {f.flag}
                                                        </strong>
                                                    </td>
                                                    <td>{f.size}</td>
                                                    <td>{f.material}</td>
                                                </Flag>
                                            ) : null
                                        )}
                                    </tbody>
                                </table>
                                <p>{i.monthlyComments}</p>
                                <p>{i.cleat}</p>
                                {i.currentRoutes && i.currentRoutes.length > 0 && (
                                    <p>
                                        Current Routes:{' '}
                                        <CurrentRoutes>
                                            {i.currentRoutes.join(', ')}
                                        </CurrentRoutes>
                                    </p>
                                )}
                            </LocationCard>
                            <AddToRoute
                                onClick={
                                    i.currentRoutes?.includes(currentRoute)
                                        ? () => null
                                        : () => addRouteHandler(i, index)
                                }
                                disable={
                                    i.currentRoutes?.includes(currentRoute) ||
                                    currentRoute === ''
                                }
                            >
                                <p>Add to Route</p>
                            </AddToRoute>
                        </LocationWrapper>
                    ))
                ) : (
                    <p>No Results!</p>
                )}
            </Monthlys>
        </ActiveMonthlys>
    );
};

export default MonthlyList;
