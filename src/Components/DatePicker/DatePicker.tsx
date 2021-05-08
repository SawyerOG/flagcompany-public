import React from 'react';
import './DatePicker.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    onChange: (date: Date | [Date, Date] | null) => void;
    selected: Date;
}

export const CustomDatePicker: React.FC<Props> = ({ onChange, selected }) => {
    return (
        <div className="Container">
            <DatePicker
                onChange={date => onChange(date)}
                className="DatePicker"
                selected={selected}
            />
        </div>
    );
};
