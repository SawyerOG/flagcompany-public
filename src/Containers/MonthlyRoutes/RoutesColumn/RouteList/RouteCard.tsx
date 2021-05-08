import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { ReactComponent as D } from '../../../../Components/Images/delete.svg';

import {
    RouteCard,
    OrderBox,
    Order,
    Body,
    Address,
    Info,
    Count,
    Delete,
} from './RouteListStyle';

import { Location } from '../../../../Config/Interfaces';

export const RouteCards: React.FC<{
    i: Location;
    index: number;
    removeRoute: (location: Location, index: number) => void;
}> = ({ i, index, removeRoute }) => {
    return (
        <Draggable draggableId={i.name} index={index}>
            {provided => (
                <RouteCard ref={provided.innerRef} {...provided.draggableProps}>
                    <OrderBox {...provided.dragHandleProps}>
                        <Order>order</Order>
                        <Count>{i.order}</Count>
                    </OrderBox>
                    <Body>
                        <Address>{i.address}</Address>
                        <Info>
                            <p>{i.name}</p>
                            <p>{i.owner}</p>
                        </Info>
                    </Body>
                    <Delete>
                        <D onClick={() => removeRoute(i, index)} />
                    </Delete>
                </RouteCard>
            )}
        </Draggable>
    );
};
