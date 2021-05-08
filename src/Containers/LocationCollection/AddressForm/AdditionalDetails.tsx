import React from 'react';

import {
    FlagTypes,
    DetailContainer,
    MonthlySelect,
    SelectContainer,
    FlagDetails,
} from './Styles';
import {
    CheckField,
    TextField,
    Selector,
} from '../../../Components/FormElements';

import { Details } from '../../../Config/Interfaces';

interface Props {
    update: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        flagType?: string
    ) => void;
    details: Details;
}

const AdditionalDetails: React.FC<Props> = ({ update, details }) => {
    return (
        <DetailContainer>
            <FlagTypes>
                <p>Flag Type(s)</p>
                {details.flagTypes.map(i => (
                    <MonthlySelect key={i.flag}>
                        <CheckField
                            label={i.flag}
                            name={'flag'}
                            change={e => update(e, i.flag)}
                            checked={i.active}
                            width={120}
                        />

                        {i.active && (
                            <FlagDetails>
                                <SelectContainer>
                                    <label>Size </label>
                                    <Selector
                                        name="size"
                                        options={[
                                            '3 x 5',
                                            '5 x 8',
                                            '10 x 15',
                                            '15 x 25',
                                            'vis flags',
                                        ]}
                                        change={e => update(e, i.flag)}
                                        value={i.size}
                                        required
                                        error={!i.size}
                                        fontSize={1.2}
                                    />
                                </SelectContainer>
                                <SelectContainer>
                                    <label>Material </label>
                                    <Selector
                                        name="material"
                                        options={['Polyester', 'Nylon']}
                                        change={e => update(e, i.flag)}
                                        value={i.material}
                                        required
                                        error={!i.material}
                                        fontSize={1.2}
                                    />
                                </SelectContainer>
                            </FlagDetails>
                        )}
                    </MonthlySelect>
                ))}
            </FlagTypes>
            <CheckField
                label="Has Monthly Flag Service"
                name="monthly"
                change={e => update(e)}
                checked={details.monthly}
                width={200}
            />
            {details.monthly && (
                <TextField
                    name="monthlyComments"
                    onChange={e => update(e)}
                    value={details.monthlyComments}
                    placeholder="Monthly Comments"
                />
            )}
            <SelectContainer>
                <label>Pole Type</label>
                <Selector
                    name="poleType"
                    options={['Aluminum', 'Bronze', 'Carbon Fiber', 'Steel']}
                    change={e => update(e)}
                    value={details.poleType}
                />
            </SelectContainer>
            <SelectContainer>
                <label>Pole Height (ft)</label>
                <Selector
                    name="poleHeight"
                    options={[
                        '10',
                        '15',
                        '20',
                        '25',
                        '30',
                        '35',
                        '40',
                        '45',
                        '50',
                        '70',
                    ]}
                    change={e => update(e)}
                    value={details.poleHeight}
                />
            </SelectContainer>
            <SelectContainer>
                <label>Cleat</label>
                <Selector
                    name="cleat"
                    options={['Internal', 'External']}
                    change={e => update(e)}
                    value={details.cleat}
                />
            </SelectContainer>
            {details.cleat === 'Internal' && (
                <SelectContainer>
                    <label>Retainer Ring Weight</label>
                    <Selector
                        name="retainer"
                        options={['3', '5', '7', '9', '11']}
                        change={e => update(e)}
                        value={details.retainer}
                    />
                </SelectContainer>
            )}
        </DetailContainer>
    );
};

export default AdditionalDetails;
