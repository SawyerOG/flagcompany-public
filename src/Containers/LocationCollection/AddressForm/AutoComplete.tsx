import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import bygoogle from '../../../Components/Images/bygoogle.png';

import { FieldBox, Label, SuggestionsBox } from './Styles';
import { TextField } from '../../../Components/FormElements';

const searchOptions = {
    bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(37, -109.05),
        new google.maps.LatLng(41, -102.05)
    ),
    types: ['address'],
};

interface Props {
    updateAddress: (value: string) => void;
    select: (addr: string) => void;
    addressVal: string;
}

const AutoComplete: React.FC<Props> = ({
    select,
    updateAddress,
    addressVal,
}) => {
    return (
        <PlacesAutocomplete
            value={addressVal}
            onChange={updateAddress}
            debounce={500}
            searchOptions={searchOptions}
            onSelect={select}
        >
            {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
            }) => (
                <div>
                    <FieldBox>
                        <Label>Address</Label>
                        <TextField
                            value={addressVal}
                            {...getInputProps({
                                placeholder: 'Start Typing Address here...',
                                id: 'autocomplete',
                            })}
                        />
                    </FieldBox>
                    {suggestions.length > 0 && (
                        <SuggestionsBox>
                            {suggestions.map(suggestion => (
                                <p
                                    id="autocomplete"
                                    {...getSuggestionItemProps(suggestion)}
                                    key={suggestion.placeId}
                                    onClick={() => {
                                        select(suggestion.description);
                                        const el = document.getElementById(
                                            'autocomplete'
                                        );
                                        el?.blur();
                                    }}
                                >
                                    {suggestion.description}
                                </p>
                            ))}
                            <img src={bygoogle} alt="Powered By Google" />
                        </SuggestionsBox>
                    )}
                </div>
            )}
        </PlacesAutocomplete>
    );
};

export default AutoComplete;

// import React from 'react';

// export const AutoComplete = () => {
//     return (
//         <div>
//             <p>filler</p>
//         </div>
//     );
// };
