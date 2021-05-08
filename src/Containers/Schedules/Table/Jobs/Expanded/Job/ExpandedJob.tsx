import React from 'react';

import {
    Materials,
    ScheduledJob,
    ScheduledMaterial,
} from '../../../../../../Config/Interfaces';

import { Container } from '../Styles';
import { NoEdit, EditEngaged } from './Content';

interface Props {
    curJob: ScheduledJob;
    setEdit: () => void;
    editID: number;
    getMaterials: () => Promise<boolean>;
    getMissingMats: (mats: ScheduledMaterial[]) => void;
    materials: Materials;
    idx: number;
    editJob: (job: ScheduledJob, idx: number) => void;
}

const ExpandedJob: React.FC<Props> = ({
    curJob,
    setEdit,
    editID,
    getMaterials,
    getMissingMats,
    materials,
    idx,
    editJob,
}) => {
    return (
        <Container>
            {editID !== curJob.uniqueID ? (
                <NoEdit curJob={curJob} setEdit={setEdit} />
            ) : (
                <EditEngaged
                    curJob={curJob}
                    getMaterials={getMaterials}
                    getMissingMats={getMissingMats}
                    materials={materials}
                    jobIdx={idx}
                    editJobFunc={editJob}
                />
            )}
        </Container>
    );
};

export default ExpandedJob;
