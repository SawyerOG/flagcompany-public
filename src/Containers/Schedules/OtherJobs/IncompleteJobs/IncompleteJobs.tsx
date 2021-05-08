import React, { useState } from 'react';
import { InventoryCont, Title } from './Styles';

import { MenuToggle } from './MenuToggle';

interface Props {
    monthly: boolean;
    updateMonthly: (v: boolean) => void;
    setMonthlyList: (v: string[]) => void;
    monthlyList: string[];
}
const IncompleteJobs: React.FC<Props> = ({
    monthly,
    updateMonthly,
    setMonthlyList,
    monthlyList,
}) => {
    const [selected, setSelected] = useState('Incomplete');
    return (
        <InventoryCont>
            <MenuToggle
                updateMonthly={updateMonthly}
                monthly={monthly}
                setMonthlyList={setMonthlyList}
                monthlyList={monthlyList}
                setSelected={(v: string) => setSelected(v)}
                selected={selected}
            />
            <Title>
                {selected === 'Incomplete'
                    ? 'Incomplete Jobs'
                    : 'Future Schedules'}
            </Title>
        </InventoryCont>
    );
};

export default IncompleteJobs;
