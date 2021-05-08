import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../../../Components/Images/arrow.svg';

import { Draggable } from 'react-beautiful-dnd';
import { Locations } from '../Schedule';

const Body = styled.div<{ selected: boolean }>`
    display: flex;
    flex-direction: column;
    max-height: ${p => (p.selected ? '500' : '40')}px;
    transition: max-height 0.2s ease-out;
    margin-bottom: ${p => (p.selected ? 55 : 0)}px;
`;

const LI = styled.div<{ selected: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        margin: 0;
    }

    svg {
        transform: ${p => (p.selected ? 'rotate(90deg)' : null)};
    }
`;

const Card = styled.p`
    padding: 3px;
    margin: 2px 0;
    border-radius: 3px;
    border: 1px solid rgba(60, 64, 67, 0.3);
    height: 45px;
    font-size: 0.8rem;
    cursor: pointer;
`;

const Add = styled.span`
    margin-left: 20px;
    font-size: 0.6rem;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

interface Props {
    item: string;
    select: (item: string) => void;
    selected: boolean;
    monthlyRoutes: Locations;
    idx: number;
    addAllMonthlys: (route: string) => void;
}

const ListItem: React.FC<Props> = ({
    item,
    select,
    selected,
    monthlyRoutes,
    idx,
    addAllMonthlys,
}) => {
    const [addr, setAddr] = useState(99);
    return (
        <Body selected={selected} onMouseLeave={() => setAddr(99)}>
            <LI selected={selected} onClick={() => select(item)}>
                <p>
                    {item}
                    <Add
                        onClick={e => {
                            e.stopPropagation();
                            addAllMonthlys(item);
                        }}
                    >
                        add all
                    </Add>
                </p>
                <Arrow />
            </LI>
            {selected &&
                monthlyRoutes[item] &&
                monthlyRoutes[item].map((i, idx) => {
                    //@ts-ignore
                    const { name, owner, address } = i;
                    return (
                        <Draggable key={name} draggableId={name} index={idx}>
                            {provided => (
                                <Card
                                    key={name}
                                    onMouseOver={() => setAddr(idx)}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    {addr === idx
                                        ? address
                                        : `${name} - ${owner}`}
                                </Card>
                            )}
                        </Draggable>
                    );
                })}
        </Body>
    );
};

export default ListItem;
