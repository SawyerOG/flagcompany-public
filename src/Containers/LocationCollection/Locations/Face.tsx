import React from 'react';
import styled from 'styled-components';

import { AddressP } from '../../../Components/LocationCard';
import { Icons, Archive, Restore, Info, Archiving } from './Icons';
import { Address } from '../../../Config/Interfaces';

const Geo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40%;

    p {
        padding: 0;
        margin: 0;
    }
`;

interface Props {
    info: Address;
    select: (name: string) => void;
    archive: (info: Address) => void;
    setArchiving: (name: string) => void;
    archiving: string;
    activeLocations: string;
}
const Face: React.FC<Props> = ({
    info,
    select,
    archive,
    setArchiving,
    archiving,
    activeLocations,
}) => {
    return (
        <>
            <AddressP>{info.address}</AddressP>
            <Geo>
                <p>latitude:</p>
                <p>{info.lat}</p>
            </Geo>
            <Geo>
                <p>longitude:</p>
                <p>{info.lng}</p>
            </Geo>
            {archiving !== info.name ? (
                <Icons>
                    <Info onClick={() => select(info.name)} />
                    {activeLocations === 'Active' ? (
                        <Archive onClick={() => setArchiving(info.name)} />
                    ) : (
                        <Restore onClick={() => setArchiving(info.name)} />
                    )}
                </Icons>
            ) : (
                <Archiving
                    cancel={() => setArchiving('')}
                    archive={() => archive(info)}
                    activeLocations={activeLocations}
                />
            )}
        </>
    );
};

export default Face;
