import React, { useCallback, useState } from 'react';

import {
    SearchBox,
    SearchRow,
    SettingsContainer,
    SettingsDetail,
} from './Styles';
import { CheckField } from '../../../../Components/FormElements';
import Searchbar from '../../../../Components/Searchbar';

import { ReactComponent as Cog } from '../../../../Components/Images/settings.svg';

interface Props {
    search: (value: string) => void;
    toggleWithRoutes: () => void;
    hasWithoutRoutes: boolean;
    hiddenMonthlyAmount: number;
}

const Search: React.FC<Props> = ({
    search,
    toggleWithRoutes,
    hasWithoutRoutes,
    hiddenMonthlyAmount,
}) => {
    const [settings, setSettings] = useState(false);

    const handleSearch = useCallback(
        (value: string) => {
            search(value.toUpperCase());
        },
        [search]
    );

    return (
        <SearchBox>
            <SearchRow activeSetting={hasWithoutRoutes}>
                <Searchbar
                    width={90}
                    placeholder={`Search by location details`}
                    search={handleSearch}
                />
                <Cog onClick={() => setSettings(true)} />
                {settings && (
                    <SettingsContainer onMouseLeave={() => setSettings(false)}>
                        <CheckField
                            label="Hide Locations with Current Route"
                            checked={hasWithoutRoutes}
                            change={toggleWithRoutes}
                        />
                        <SettingsDetail>
                            Search will override hidden locations
                        </SettingsDetail>
                        <p>
                            <strong>{hiddenMonthlyAmount}</strong> currently
                            hidden
                        </p>
                    </SettingsContainer>
                )}
            </SearchRow>
        </SearchBox>
    );
};

export default Search;
