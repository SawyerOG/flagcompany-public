import React, { useState } from 'react';

import { Address, ScheduledJob } from '../../../../Config/Interfaces';
import { TextField } from '../../../../Components/FormElements';

import {
    AddrCont,
    Button,
    NoSelection,
    SelectCont,
    AddrItem,
    CompleteAddrItem,
    List,
    Search,
    Exit,
} from '../TableStyles';

interface Props {
    locations: Address[];
    itemID: number;
    addrID: number;
    job: ScheduledJob;
    setAddr: (openID: number) => void;
    addAddr: (addr: Address, idx: number) => void;
    idx: number;
    search: (val: string) => void;
    cancelSearch: () => void;
}

const AddressPicker: React.FC<Props> = ({
    locations,
    itemID,
    addrID,
    job,
    setAddr,
    addAddr,
    idx,
    search,
    cancelSearch,
}) => {
    const [searchedVal, setSearchedVal] = useState('');

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchedVal(val);
        search(val);
    };

    const cancelHandler = () => {
        setSearchedVal('');
        setAddr(0);
        cancelSearch();
    };

    const incomplete = !job.addr.address;
    return (
        <AddrCont>
            {incomplete && itemID !== addrID && (
                <Button incomplete={incomplete} onClick={() => setAddr(itemID)}>
                    <NoSelection>Select An Address</NoSelection>
                </Button>
            )}
            {itemID === addrID && (
                <SelectCont>
                    <Search>
                        <TextField
                            width={100}
                            center
                            onChange={searchHandler}
                            value={searchedVal}
                            autoFocus
                            placeholder="Search for location"
                        />
                        <Exit onClick={cancelHandler}>x</Exit>
                    </Search>
                    <List>
                        {locations.map(i => (
                            <AddrItem
                                key={i.name + i.owner}
                                onClick={() => {
                                    addAddr(i, idx);
                                    cancelHandler();
                                }}
                            >
                                <p>
                                    {i.name} - {i.owner}
                                </p>
                                <p>{i.address}</p>
                            </AddrItem>
                        ))}
                    </List>
                </SelectCont>
            )}
            {!incomplete && itemID !== addrID && (
                <CompleteAddrItem onClick={() => setAddr(itemID)}>
                    <p>
                        {job.addr.name} - {job.addr.owner}
                    </p>
                    <p>{job.addr.address}</p>
                </CompleteAddrItem>
            )}
        </AddrCont>
    );
};

export default AddressPicker;
