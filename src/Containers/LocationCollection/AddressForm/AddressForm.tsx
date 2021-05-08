import React, { useState } from 'react';

import { Container, FieldBox, Label, GeoBox, Error } from './Styles';
import { TextField, CheckField } from '../../../Components/FormElements';
import { Button } from '../../../Components/Button';

import { Address, Details } from '../../../Config/Interfaces';

import AdditionalDetails from './AdditionalDetails';

import { Ellipses } from '../../../Components/Loaders/Loaders';
import AutoComplete from './AutoComplete';

const initialAddress: Address = {
    address: '',
    lat: '',
    lng: '',
    owner: '',
    name: '',
    archived: false,
};

const initialDetails: Details = {
    monthly: false,
    flagTypes: [
        { flag: 'US', active: false, size: '', material: '' },
        { flag: 'Colorado', active: false, size: '', material: '' },
        { flag: 'Logo', active: false, size: '', material: '' },
        { flag: 'VIS', active: false, size: '', material: '' },
        { flag: 'Custom', active: false, size: '', material: '' },
    ],
    monthlyComments: '',
    poleType: '',
    poleHeight: '',
    cleat: '',
    retainer: '',
};

const AddressForm: React.FC<{
    create: (address: Address, details: Details) => void;
    loading: boolean;
    locations: Address[];
}> = ({ create, loading, locations }) => {
    const [address, setAddress] = useState<Address>(initialAddress);
    const [addressValue, setAddressValue] = useState<string>('');

    const [addDetails, setAddDetails] = useState<boolean>(true);
    const [details, setDetails] = useState<Details>(initialDetails);

    const [nameExists, setNameExists] = useState<boolean>(false);

    const onSelectHandler = (addr: string) => {
        const addressCopy = { ...address };
        addressCopy.address = addr;

        setAddressValue(addr);
        setAddress(addressCopy);
    };

    const updateGeoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const addressCopy = { ...address };

        const val = e.target.value;

        if (e.target.name === 'lat') {
            addressCopy.lat = val;
        } else {
            addressCopy.lng = val;
        }

        setAddress(addressCopy);
    };

    const updateLocationInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const addressCopy = { ...address };

        const val = e.target.value;

        if (e.target.name === 'name') {
            if (nameExists) {
                setNameExists(false);
            }
            addressCopy.name = val;
        } else {
            addressCopy.owner = val;
        }

        setAddress(addressCopy);
    };

    const createNewLocation = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let name = false;
        //Because I am using the name as the id of the locations they must all be unique. Check to make sure the name is unique before creating a new one.
        for (let i of locations) {
            if (i.name.toUpperCase() === address.name.toUpperCase()) {
                name = true;
                setNameExists(true);
                console.log(true);
            }
        }
        if (!name) {
            create(address, details);

            const deats = { ...initialDetails };
            for (let i of deats.flagTypes) {
                i.active = false;
            }

            setAddress(initialAddress);
            setDetails(deats);

            // setAddressValue('');
        }
    };

    const updateAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        flagType?: string
    ) => {
        const copy: Details = { ...details };
        const type = e.target.name;

        switch (type) {
            case 'monthly':
                //@ts-ignore
                copy.monthly = e.target.checked;
                setDetails(copy);
                break;
            case 'flag':
                for (let i of copy.flagTypes) {
                    if (i.flag === flagType) {
                        i.active = !i.active;
                    }
                }
                setDetails(copy);
                break;
            case 'size':
                for (let i of copy.flagTypes) {
                    if (i.flag === flagType) {
                        i.size = e.target.value;
                    }
                }
                setDetails(copy);
                break;
            case 'material':
                for (let i of copy.flagTypes) {
                    if (i.flag === flagType) {
                        i.material = e.target.value;
                    }
                }
                setDetails(copy);
                break;
            case 'monthlyComments':
                copy.monthlyComments = e.target.value;
                setDetails(copy);
                break;
            case 'poleType':
                copy.poleType = e.target.value;
                setDetails(copy);
                break;
            case 'poleHeight':
                copy.poleHeight = e.target.value;
                setDetails(copy);
                break;
            case 'cleat':
                copy.cleat = e.target.value;
                setDetails(copy);
                break;
            case 'retainer':
                copy.poleType = e.target.value;
                setDetails(copy);
                break;
        }
    };

    return (
        <Container>
            <h3>
                <u>New Customer Location</u>
            </h3>
            <form onSubmit={createNewLocation}>
                {
                    <AutoComplete
                        select={onSelectHandler}
                        updateAddress={(value: string) =>
                            setAddressValue(value)
                        }
                        addressVal={addressValue}
                    />
                }
                {/* <AutoComplete /> */}
                <GeoBox>
                    <FieldBox width={45}>
                        <Label>Latitude</Label>
                        <TextField
                            type="number"
                            step={0.00001}
                            value={address.lat}
                            name="lat"
                            onChange={updateGeoHandler}
                        />
                    </FieldBox>
                    <FieldBox width={45}>
                        <Label>Longitude</Label>
                        <TextField
                            type="number"
                            step={0.00001}
                            value={address.lng}
                            name="lng"
                            onChange={updateGeoHandler}
                        />
                    </FieldBox>
                </GeoBox>
                <FieldBox>
                    <Label>
                        {!nameExists ? (
                            'Name of Location'
                        ) : (
                            <Error>
                                THIS NAME ALREADY EXISTS. CHOOSE ANOTHER NAME.
                            </Error>
                        )}
                    </Label>
                    <TextField
                        type="text"
                        name="name"
                        required
                        value={address.name}
                        onChange={updateLocationInfo}
                        error={nameExists}
                    />
                </FieldBox>
                <FieldBox>
                    <Label>Name of Company or Owner</Label>
                    <TextField
                        type="text"
                        name="owner"
                        value={address.owner}
                        required
                        onChange={updateLocationInfo}
                    />
                </FieldBox>
                <CheckField
                    width={250}
                    checked={addDetails}
                    label="Add Additional Location Details"
                    change={() => setAddDetails(!addDetails)}
                />
                {/* ----------- Details ------------- */}
                {addDetails && (
                    <AdditionalDetails
                        update={updateAdditionalInfo}
                        details={details}
                    />
                )}
                <Button
                    color="blue"
                    height={50}
                    width={100}
                    disabled={loading}
                    type="submit"
                >
                    {loading ? <Ellipses /> : 'Create'}
                </Button>
            </form>
        </Container>
    );
};

export default AddressForm;
