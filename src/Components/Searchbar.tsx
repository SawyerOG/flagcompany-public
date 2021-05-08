import React, { useState, useEffect } from 'react';

import { TextField } from './FormElements';

let timer: any;

const Searchbar: React.FC<{
    search: (value: string) => void;
    width: number;
    placeholder: string;
}> = ({ search, width, placeholder }) => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            search(value);
        }, 1000);
    }, [search, value]);

    return (
        <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            width={width} //Needs to be dynamic
        />
    );
};

export default Searchbar;
