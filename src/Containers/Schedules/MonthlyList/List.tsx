import React from 'react';
import { db } from '../../../Config/firebase';

import { Droppable } from 'react-beautiful-dnd';

import { List, Header } from '../../../Components/DragList/DragListStyles';

import { Location } from '../../../Config/Interfaces';
import { Locations } from '../Schedule';
import LI from './ListItem';

interface Props {
    monthlyRoutes: Locations;
    monthlyList: string[];
    setRoutes: (v: Locations) => void;
    setActiveMonthly: (v: string) => void;
    activeMonthly: string;
    addAllMonthlys: (routes: Location[]) => void;
}

const MonthlyList: React.FC<Props> = ({
    monthlyList,
    monthlyRoutes,
    setRoutes,
    setActiveMonthly,
    activeMonthly,
    addAllMonthlys,
}) => {
    const getRoutes = async (route: string) => {
        const routesCopy = { ...monthlyRoutes };
        const doc = await db.collection('routes').doc(route).get();
        if (doc.exists) {
            //@ts-ignore
            routesCopy[route] = doc.data().list;
            setRoutes(routesCopy);
            return routesCopy;
        }
    };

    const onSelect = (item: string) => {
        setActiveMonthly(item);
        if (!monthlyRoutes[item]) {
            getRoutes(item);
        }
        //Here. get the monthly route from the db and create an object with it item: {[], []}
    };

    const addMonthlyHandler = async (route: string) => {
        if (!monthlyRoutes[route]) {
            const newRoutes = await getRoutes(route);
            //@ts-ignore
            addAllMonthlys(newRoutes[route]);
        } else {
            addAllMonthlys(monthlyRoutes[route]);
        }
    };

    return (
        <Droppable droppableId="monthlyList">
            {provided => (
                <List
                    height={99}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <Header>Monthly Routes</Header>
                    {monthlyList.length > 0 &&
                        monthlyList.map((i, idx) => (
                            <LI
                                key={i}
                                item={i}
                                select={onSelect}
                                selected={i === activeMonthly}
                                monthlyRoutes={monthlyRoutes}
                                idx={idx}
                                addAllMonthlys={addMonthlyHandler}
                            />
                        ))}
                    {provided.placeholder}
                </List>
            )}
        </Droppable>
    );
};

export default MonthlyList;
