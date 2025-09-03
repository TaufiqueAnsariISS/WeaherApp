import React, { useState, useEffect } from 'react';
import { Country, State, City } from 'country-state-city';
import './InputComponent.css';

type Props = {
    onCityChange: (city: string) => void;
};

interface CountryType {
    isoCode: string;
    name: string;
}

interface StateType {
    name: string;
    isoCode: string;
    countryCode: string;
}

interface CityType {
    name: string;
}

const InputComponent: React.FC<Props> = ({ onCityChange }) => {
    const [countries, setCountries] = useState<CountryType[]>([]);
    const [states, setStates] = useState<StateType[]>([]);
    const [cities, setCities] = useState<CityType[]>([]);

    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');

    useEffect(() => {
        const countriesList = Country.getAllCountries();
        setCountries(countriesList);
    }, []);

    // Fetch states when country changes
    useEffect(() => {
        if (selectedCountry) {
            const statesList = State.getStatesOfCountry(selectedCountry);
            setStates(statesList);
            setSelectedState('');
            setCities([]);
        }
    }, [selectedCountry]);

    // Fetch cities when state changes
    useEffect(() => {
        if (selectedCountry && selectedState) {
            const citiesList = City.getCitiesOfState(selectedCountry, selectedState);
            setCities(citiesList);
            setSelectedCity('');
        }
    }, [selectedState, selectedCountry]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCityChange(selectedCity);
    };

    return (
        <div>
            <div>
                <h2>Select Location</h2>

                {/* Country Dropdown */}
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                            {country.name}
                        </option>
                    ))}
                </select>

                {/* State Dropdown */}
                <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    disabled={!states.length}
                >
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                        </option>
                    ))}
                </select>

                {/* City Dropdown */}
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!cities.length}
                >
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>

            </div>
            <button onClick={handleSubmit}>Get Weather</button>
        </div>
    );
};

export default InputComponent;
