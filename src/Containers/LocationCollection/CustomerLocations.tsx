import React, { useState, useEffect, useCallback } from 'react';
import { db, firebase } from '../../Config/firebase';

import Card from '../../Components/Card';
import AddressFrom from './AddressForm/AddressForm';
import Locations from './Locations/Locations';

import { Address, Details, Location } from '../../Config/Interfaces';

// let unsubscribeBusinessLocations: () => void;

const CustomerLocations: React.FC = () => {
    const [currentLocations, setCurrentLocations] = useState<string>('Active');
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchedLocations, setSearchedLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [archiving, setArchiving] = useState<string>('');

    useEffect(() => {
        const locationType =
            currentLocations === 'Active'
                ? 'locationList'
                : 'archivedLocations';

        let locationArr: Location[] = [];

        const unsubscribeBusinessLocations = db
            .collection(locationType)
            .onSnapshot(query => {
                if (!query.empty) {
                    locationArr = [...query.docs[0].data().locations];
                    locationArr.sort(function (a, b) {
                        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }

                        // names must be equal
                        return 0;
                    });

                    setLocations(locationArr);
                    locationArr = [];
                } else {
                    console.log('no locations yet');
                }
            });

        return () => unsubscribeBusinessLocations();
    }, [currentLocations]);

    const createNewLocation = async (location: Address, details: Details) => {
        setLoading(true);
        //Location details are what will be used to make the card. Details will be called only if the card is clicked on.
        const payload = { ...location, ...details };

        try {
            await db.collection('locations').doc(location.name).set(payload);

            const locationListRef = db.collection('locationList').doc('list');
            await locationListRef.update({
                locations: firebase.firestore.FieldValue.arrayUnion(location),
            });

            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    const locationSearch = useCallback(
        (params: string) => {
            if (params.length) {
                const searchedLocations = locations.filter(i =>
                    i.name.toUpperCase().includes(params.toUpperCase())
                );

                setSearchedLocations(searchedLocations);
            } else {
                setSearchedLocations([]);
            }
        },
        [locations]
    );

    const archiveHandler = (i: Address) => {
        //Archiving a location
        const activeLocations = db.collection('locationList').doc('list');
        const archivedLocations = db
            .collection('archivedLocations')
            .doc('list');

        //If the active locations are selected we are archiving a location.
        //If the archived locations are selected we are unarchiving a location

        if (currentLocations === 'Active') {
            db.collection('locations').doc(i.name).update({
                archived: true,
            });

            activeLocations.update({
                locations: firebase.firestore.FieldValue.arrayRemove(i),
            });

            archivedLocations.update({
                locations: firebase.firestore.FieldValue.arrayUnion(i),
            });
        } else {
            db.collection('locations').doc(i.name).update({
                archived: false,
            });

            activeLocations.update({
                locations: firebase.firestore.FieldValue.arrayUnion(i),
            });

            archivedLocations.update({
                locations: firebase.firestore.FieldValue.arrayRemove(i),
            });
        }
    };

    const changeLocations = (val: string) => {
        setCurrentLocations(val);
        setArchiving('');
    };

    return (
        <Card>
            <AddressFrom
                create={createNewLocation}
                loading={loading}
                locations={locations}
            />
            <Locations
                locations={locations}
                searchedLocations={searchedLocations}
                search={locationSearch}
                setArchiving={(name: string) => setArchiving(name)}
                archive={archiveHandler}
                archiving={archiving}
                changeLocations={changeLocations}
                activeLocations={currentLocations}
            />
        </Card>
    );
};

export default CustomerLocations;
