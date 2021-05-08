import { DropResult } from 'react-beautiful-dnd';

export const getDate = (newDate: { seconds: number; nanoseconds: number }) => {
    //@ts-ignore
    const date = new Date(newDate.toDate());

    const day = date.getDate() + 1;

    const month = date.getMonth() + 1;
    const displayDate = `${month < 10 ? '0' + month : month}/${
        day < 10 ? '0' + day : day
    }/${date.getFullYear()}`;

    return displayDate;
};

export const reorderList = async (result: DropResult, oldList: any) => {
    const { destination, source } = result;

    if (!destination) {
        return false;
    }

    if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
    ) {
        return false;
    }

    const copy = [...oldList];
    const movedItem = copy[source.index];

    copy.splice(source.index, 1);
    copy.splice(destination.index, 0, movedItem);

    return copy;
};
