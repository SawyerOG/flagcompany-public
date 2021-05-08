import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../../../Config/firebase';

import { Address, Details } from '../../../Config/Interfaces';
import { AddressP, Flag } from '../../../Components/LocationCard';

import { Icons, Archive, Restore, Back, Archiving } from './Icons';

const Geo = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    p {
        margin: 0;
        padding: 5px;
    }
`;

const Header = styled.h3`
    margin: 2px 0;
`;

const Detail = styled.tr`
    width: 80%;

    td {
        width: 70%;
    }
`;

const initialState: Details & Address = {
    address: '',
    lat: '',
    lng: '',
    owner: '',
    name: '',
    monthly: false,
    flagTypes: [],
    monthlyComments: '',
    poleType: '',
    poleHeight: '',
    cleat: '',
    retainer: '',
};

interface Props {
    select: (name: string) => void;
    archive: (info: Address) => void;
    info: Address;
    setArchiving: (name: string) => void;
    archiving: string;
    activeLocations: string;
}

const DetailCard: React.FC<Props> = ({
    select,
    archive,
    info,
    setArchiving,
    archiving,
    activeLocations,
}) => {
    const [addressData, setAddressData] = useState<Details & Address>(
        initialState
    );

    useEffect(() => {
        if (addressData.address) return;

        db.collection('locations')
            .doc(info.name)
            .get()
            .then(item => {
                if (item.exists) {
                    //@ts-ignore
                    setAddressData(item.data());
                } else {
                    console.log('address does not exist');
                }
            });
    }, [addressData, info.name]);

    let content = <p>loading...</p>;
    if (addressData.address) {
        content = (
            <>
                <AddressP>{addressData.address}</AddressP>
                <Geo>
                    <p>latitude: {addressData.lat}</p>
                    <p>longitude: {addressData.lng}</p>
                </Geo>
                <Header>
                    <u>Flags</u>
                </Header>
                <table>
                    <tbody>
                        {addressData.flagTypes.map(flag => {
                            if (flag.active) {
                                return (
                                    <Flag key={flag.flag}>
                                        <td>{flag.flag}</td>
                                        <td>{flag.size}</td>
                                        <td>{flag.material}</td>
                                    </Flag>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </table>
                <Header>
                    <u>Details</u>
                </Header>
                <table>
                    <tbody>
                        <Detail>
                            <td>Monthly Service</td>
                            <td>
                                <strong>
                                    {addressData.monthly ? 'YES' : 'NO'}
                                </strong>
                            </td>
                        </Detail>
                        {addressData.monthly && (
                            <Detail>
                                <td>Comment</td>
                                <td>
                                    <strong>
                                        {addressData.monthlyComments}
                                    </strong>
                                </td>
                            </Detail>
                        )}
                        <Detail>
                            <td>Pole Type</td>
                            <td>
                                <strong>{addressData.poleType}</strong>
                            </td>
                        </Detail>
                        <Detail>
                            <td>Pole Height</td>
                            <td>
                                <strong>{addressData.poleHeight}</strong>
                            </td>
                        </Detail>
                        <Detail>
                            <td>Cleat</td>
                            <td>
                                <strong>{addressData.cleat}</strong>
                            </td>
                        </Detail>
                        {addressData.cleat === 'Internal' && (
                            <Detail>
                                <td>Retainer Ring Weight</td>
                                <td>
                                    <strong>{addressData.retainer}</strong>
                                </td>
                            </Detail>
                        )}
                    </tbody>
                </table>
                {!archiving ? (
                    <Icons title="icons">
                        <Back onClick={() => select('')} />
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
    }

    return content;
};

export default DetailCard;
