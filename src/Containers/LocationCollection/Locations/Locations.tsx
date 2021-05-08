import React, { useState } from 'react';
import styled from 'styled-components';

import { Address } from '../../../Config/Interfaces';

import LocationPicker from './LocationPicker';
import SearchBar from '../../../Components/Searchbar';
import Face from './Face';
import DetailCard from './DetailCard';

import { LocationCard, Header } from '../../../Components/LocationCard';

const Body = styled.div`
    width: 43%;
    display: flex;
    flex-direction: column;
`;

const Column = styled.div`
    max-height: 88vh;
    overflow-y: auto;
    overflow-x: hidden;
`;

interface Props {
    locations: Address[];
    searchedLocations: Address[];
    search: (value: string) => void;
    archive: (i: Address) => void;
    setArchiving: (name: string) => void;
    archiving: string;
    changeLocations: (val: string) => void;
    activeLocations: string;
}

const Locations: React.FC<Props> = ({
    locations,
    searchedLocations,
    search,
    archive,
    setArchiving,
    archiving,
    changeLocations,
    activeLocations,
}) => {
    const [selected, setSelected] = useState<string>('');

    let locationsToUse = [];

    if (searchedLocations.length) {
        locationsToUse = searchedLocations;
    } else {
        locationsToUse = locations;
    }

    const selectHandler = (name: string) => {
        setSelected(name);
    };

    const archiveHandler = (i: Address) => {
        archive(i);
    };

    return (
        <Body>
            <LocationPicker
                changeLocations={changeLocations}
                activeLocations={activeLocations}
            />
            <SearchBar
                search={search}
                width={96}
                placeholder={'Search by name'}
            />
            <Column>
                {locationsToUse.map(i => (
                    <LocationCard
                        key={i.name}
                        rot={i.name === selected ? true : false}
                    >
                        <Header>
                            <p>{i.name}</p>
                            <p>{i.owner}</p>
                        </Header>
                        {i.name !== selected ? (
                            <Face
                                info={i}
                                select={selectHandler}
                                archive={archiveHandler}
                                setArchiving={setArchiving}
                                archiving={archiving}
                                activeLocations={activeLocations}
                            />
                        ) : (
                            <DetailCard
                                select={selectHandler}
                                archive={archiveHandler}
                                setArchiving={setArchiving}
                                archiving={archiving}
                                info={i}
                                activeLocations={activeLocations}
                            />
                        )}
                    </LocationCard>
                ))}
            </Column>
        </Body>
    );
};

export default Locations;
