import React, { useState } from 'react';
import { Active, Cont, MenuButton } from './Styles';
import { db } from '../../../../Config/firebase';

import { ReactComponent as Settings } from '../../../../Components/Images/settings.svg';

interface Props {
    monthly: boolean;
    updateMonthly: (v: boolean) => void;
    setMonthlyList: (v: string[]) => void;
    monthlyList: string[];
    setSelected: (v: string) => void;
    selected: string;
}

let timer: any;
export const MenuToggle: React.FC<Props> = ({
    monthly,
    updateMonthly,
    setMonthlyList,
    monthlyList,
    setSelected,
    selected,
}) => {
    const [active, setActive] = useState(false);

    const getMonthyList = async () => {
        const res = await db.collection('routeList').doc('route').get();
        if (res.exists) {
            //@ts-ignore
            setMonthlyList(res.data().list);
        }
    };

    const activate = () => {
        timer = setTimeout(() => {
            setActive(true);
        }, 100);
    };
    const deactivate = () => {
        if (timer) {
            clearTimeout(timer);
        }
        setActive(false);
    };

    const updateType = () => {
        updateMonthly(!monthly);
        if (monthlyList.length === 0) {
            getMonthyList();
        }
    };

    return (
        <Cont onMouseEnter={activate} onMouseLeave={deactivate}>
            {!active && <Settings />}
            {active && (
                <Active>
                    <MenuButton
                        color="green"
                        type="button"
                        onClick={() => updateType()}
                        active={monthly}
                    >
                        Monthlys
                    </MenuButton>
                    <MenuButton
                        color="blue"
                        type="button"
                        onClick={() => setSelected('Future')}
                        active={selected === 'Future'}
                    >
                        Future
                    </MenuButton>
                    <MenuButton
                        color="red"
                        type="button"
                        onClick={() => setSelected('Incomplete')}
                        active={selected === 'Incomplete'}
                    >
                        Incomplete
                    </MenuButton>
                </Active>
            )}
        </Cont>
    );
};
