import React from 'react';

import {
    MonthlyBody,
    Geo,
    MonthlyContent,
    FlagTable,
    TH,
    Title,
} from '../Styles';

import { ScheduledMonthly } from '../../../../../../Config/Interfaces';

interface Props {
    i: ScheduledMonthly;
}

const ExpandedMonthly: React.FC<Props> = ({ i }) => {
    return (
        <MonthlyBody>
            <Geo>
                <p>Lat: {i.addr.lat}</p>
                <p>Lng: {i.addr.lng}</p>
            </Geo>
            <MonthlyContent>
                <div>
                    <p>
                        <Title>Pole Height:</Title> {i.poleHeight}
                    </p>
                    <p>
                        <Title>Pole Type:</Title> {i.poleType}
                    </p>
                    <p>
                        <Title>Cleat:</Title> {i.cleat}
                    </p>
                    {i.cleat === 'Internal' && (
                        <p>
                            <Title>Retainer Ring:</Title> {i.retainer}
                        </p>
                    )}
                    <p>
                        <Title>Comments:</Title> {i.monthlyComments}
                    </p>
                </div>
                <FlagTable>
                    <thead>
                        <tr>
                            <TH>Flag Type</TH>
                            <TH>Flag Size</TH>
                            <TH>Material</TH>
                        </tr>
                    </thead>
                    <tbody>
                        {i.flagTypes.map(j => {
                            if (j.active) {
                                return (
                                    <tr key={j.flag}>
                                        <td>{j.flag}</td>
                                        <td>{j.size}</td>
                                        <td>{j.material}</td>
                                    </tr>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </tbody>
                </FlagTable>
            </MonthlyContent>
        </MonthlyBody>
    );
};

export default ExpandedMonthly;
