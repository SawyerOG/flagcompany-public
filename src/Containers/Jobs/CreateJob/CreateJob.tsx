import React from 'react';
import JobList from './JobList/JobList';

import { Job, JobType } from '../../../Config/Interfaces';

const CreateJob: React.FC<{
    jobTypes: JobType[];
    updateJobTypes: (types: JobType[]) => void;
    setJob: (job: Job) => void;
    addJob: () => void;
    curJob: Job;
}> = ({ jobTypes, updateJobTypes, setJob, addJob, curJob }) => {
    return (
        <JobList
            jobTypes={jobTypes}
            updateJobTypes={updateJobTypes}
            currentJob={curJob}
            addJob={addJob}
            setJob={setJob}
        />
    );
};

export default CreateJob;
