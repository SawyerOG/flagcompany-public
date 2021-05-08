import React, { useEffect, useState } from 'react';
import {
    ScheduledJob,
    Materials,
    ScheduledMaterial,
} from '../../../../../../Config/Interfaces';
import { ReactComponent as Edit } from '../../../../../../Components/Images/edit.svg';
import { ReactComponent as Check } from '../../../../../../Components/Images/check.svg';
import { ReactComponent as Clear } from '../../../../../../Components/Images/clear.svg';
import { Ellipses } from '../../../../../../Components/Loaders/Loaders';
import {
    Body,
    TopRow,
    MaterialTable,
    DigItem,
    EditCont,
    Delete,
} from '../Styles';

import {
    CheckField,
    Selector,
    TextArea,
    TextField,
} from '../../../../../../Components/FormElements';

interface Props1 {
    curJob: ScheduledJob;
    setEdit: () => void;
}

export const NoEdit: React.FC<Props1> = ({ curJob, setEdit }) => {
    return (
        <>
            {curJob.uniqueID && (
                <Body>
                    <EditCont on={1}>
                        <Edit onClick={setEdit} />
                    </EditCont>
                    <TopRow edit={false}>
                        <MaterialTable editing={false}>
                            <tbody>
                                <tr>
                                    <th>Material</th>
                                    <th>Quantity</th>
                                </tr>
                                {curJob.materials &&
                                    curJob.materials.map((i, idx) => (
                                        <tr key={idx.toString()}>
                                            <td>{i.matName}</td>
                                            <td>{i.quantity}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </MaterialTable>
                        <div>
                            <DigItem required={curJob.digging}>
                                <p>Requires Digging</p>
                                {curJob.digging ? <Check /> : <Clear />}
                            </DigItem>
                            {curJob.digging && (
                                <DigItem>
                                    <p>Water Quantity</p>
                                    {curJob.water} gallons
                                </DigItem>
                            )}
                        </div>
                    </TopRow>
                    <p>{curJob.jobDescription}</p>
                </Body>
            )}
        </>
    );
};

interface Props2 {
    curJob: ScheduledJob;
    getMaterials: () => Promise<boolean>;
    getMissingMats: (mats: ScheduledMaterial[]) => void;
    materials: Materials;
    jobIdx: number;
    editJobFunc: (job: ScheduledJob, idx: number) => void;
}

export const EditEngaged: React.FC<Props2> = ({
    curJob,
    getMaterials,
    getMissingMats,
    materials,
    jobIdx,
    editJobFunc,
}) => {
    const [editJob, setEditJob] = useState({ ...curJob });
    const [disabledOpts, setDisabledOpts] = useState<string[]>([]);
    const [disableSave, setDisSave] = useState(false);

    useEffect(() => {
        if (!materials.materialNames.length) {
            getMaterials();
        }
        if (disabledOpts.length === 0 && editJob.materials.length !== 0) {
            const disOptsCopy: string[] = [];
            editJob.materials.forEach(i => disOptsCopy.push(i.matName));
            setDisabledOpts(disOptsCopy);
        }

        let setToFalse = true;
        editJob.materials.forEach(i => {
            if (i.quantity === 0 || i.matName === '') {
                setDisSave(true);
                setToFalse = false;
            }
        });

        if (setToFalse) {
            setDisSave(false);
        }
    }, [materials, getMaterials, disabledOpts, editJob.materials]);

    const editMatTypes = (val: string, idx: number, type: string) => {
        const copy = { ...editJob };
        const mats = [...editJob.materials];
        let newMat = false;
        if (type === 'name') {
            const disOptsCopy = [...disabledOpts];
            disOptsCopy.push(val);
            setDisabledOpts(disOptsCopy);
            mats[idx].matName = val;
            mats[idx].id = materials.materialIDs[val];
            newMat = true;
        } else if (type === 'quantity') {
            mats[idx].quantity = parseFloat(val) || 0;
        } else if (type === 'delete') {
            mats.splice(idx, 1);
        } else {
            mats.push({ id: '', matName: '', quantity: 0 });
        }
        copy.materials = mats;
        setEditJob(copy);

        if (newMat) {
            getMissingMats(mats);
        }
    };

    const toggleDig = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = { ...editJob };
        copy.digging = e.target.checked;
        setEditJob(copy);
    };

    const editWater = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copy = { ...editJob };
        copy.water = parseFloat(e.target.value);
        setEditJob(copy);
    };

    const editJobDescritpion = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const copy = { ...editJob };
        copy.jobDescription = e.target.value;
        setEditJob(copy);
    };

    const saveHandler = () => {
        editJobFunc(editJob, jobIdx);
    };

    return (
        <>
            {editJob.uniqueID && (
                <Body>
                    <EditCont
                        on={disableSave ? 0 : 1}
                        onClick={disableSave ? () => null : saveHandler}
                    >
                        save
                    </EditCont>
                    <TopRow edit={true}>
                        <MaterialTable editing={true}>
                            <tbody>
                                <tr>
                                    <th>Material</th>
                                    <th>Quantity</th>
                                </tr>
                                {editJob.materials &&
                                    editJob.materials.map((i, idx) => (
                                        <tr key={idx.toString()}>
                                            <td>
                                                {materials.materialNames ? (
                                                    <Selector
                                                        name="matSelect"
                                                        value={i.matName}
                                                        options={
                                                            materials.materialNames
                                                        }
                                                        disableOptions={
                                                            disabledOpts
                                                        }
                                                        change={e =>
                                                            editMatTypes(
                                                                e.target.value,
                                                                idx,
                                                                'name'
                                                            )
                                                        }
                                                        error={i.matName}
                                                        width="130%"
                                                        required
                                                    />
                                                ) : (
                                                    <Ellipses />
                                                )}
                                            </td>
                                            <td>
                                                <TextField
                                                    type="number"
                                                    min={0}
                                                    step={1}
                                                    error={!i.quantity}
                                                    value={i.quantity}
                                                    name="matQuantity"
                                                    onChange={e =>
                                                        editMatTypes(
                                                            e.target.value,
                                                            idx,
                                                            'quantity'
                                                        )
                                                    }
                                                    width={35}
                                                    height={36}
                                                    required
                                                />
                                                <Delete
                                                    onClick={() =>
                                                        editMatTypes(
                                                            '',
                                                            idx,
                                                            'delete'
                                                        )
                                                    }
                                                >
                                                    x
                                                </Delete>
                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td
                                        onClick={() =>
                                            editMatTypes('', 0, 'add')
                                        }
                                    >
                                        add new material
                                    </td>
                                </tr>
                            </tbody>
                        </MaterialTable>
                        <div>
                            <DigItem required={editJob.digging}>
                                <CheckField
                                    label="Requires Digging"
                                    checked={editJob.digging}
                                    change={toggleDig}
                                    width={80}
                                />
                            </DigItem>
                            {editJob.digging && (
                                <DigItem>
                                    <p>Water Quantity</p>
                                    <TextField
                                        type="number"
                                        step={1}
                                        min={0}
                                        value={editJob.water || ''}
                                        onChange={editWater}
                                        placeholder="gallons"
                                        width={50}
                                    />
                                </DigItem>
                            )}
                        </div>
                    </TopRow>
                    <TextArea
                        value={editJob.jobDescription}
                        onChange={editJobDescritpion}
                        rowNumber={4}
                        width={80}
                    />
                </Body>
            )}
        </>
    );
};
