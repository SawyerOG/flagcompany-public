import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../Config/Styles';

import { Button } from '../../../Components/Button';

import { ReactComponent as A } from '../../../Components/Images/archive.svg';
import { ReactComponent as T } from '../../../Components/Images/tour.svg';
import { ReactComponent as B } from '../../../Components/Images/back.svg';
import { ReactComponent as R } from '../../../Components/Images/restore.svg';

export const Icons = styled.div`
    text-align: right;

    svg {
        margin: 0 10px;
        cursor: pointer;
        padding: 2px;
        border: 1px solid transparent;
        border-radius: 50px;
    }
`;

export const Archive = styled(A)`
    fill: ${colors.red};
    &:hover {
        border: 1px solid ${colors.red};
    }
`;

export const Restore = styled(R)`
    fill: 'armygreen';
    &:hover {
        border: 1px solid 'armygreen';
    }
`;

export const Info = styled(T)`
    fill: ${colors.blue};
    &:hover {
        border: 1px solid ${colors.blue};
    }
`;

export const Back = styled(B)`
    fill: ${colors.blue};
    &:hover {
        border: 1px solid ${colors.blue};
    }
`;

const ArchiveContainer = styled.div<{ archive: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin-top: 7px;

    p {
        margin: 0;
        padding: 0;
        font-size: 0.9rem;
        color: ${(p) => (p.archive ? 'red' : colors.green)};
    }
`;

interface Props {
    cancel: () => void;
    archive: () => void;
    activeLocations: string;
}

export const Archiving: React.FC<Props> = ({
    cancel,
    archive,
    activeLocations,
}) => {
    const archiving = activeLocations === 'Active';

    return (
        <ArchiveContainer archive={archiving}>
            <p>
                Are you sure you want to {archiving ? 'archive' : 'restore'}{' '}
                this location?
            </p>
            <Button
                type="button"
                color={archiving ? 'blue' : 'green'}
                width={90}
                height={20}
                click={archive}
            >
                {archiving ? 'Archive' : 'Restore'}
            </Button>
            <Button
                type="button"
                color="red"
                width={90}
                height={20}
                click={cancel}
            >
                Cancel
            </Button>
        </ArchiveContainer>
    );
};
