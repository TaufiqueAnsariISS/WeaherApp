import React, { useState, useEffect } from 'react';
import InputComponent from '../components/InputComponent';
import MapComponent from '../components/MapComponent';
import { LatLng, WeatherData } from '../types';
import './Homepage.css';

const Homepage: React.FC = () => {
    const [city, setCity] = useState<string | null>(null);
    const [latLng, setLatLng] = useState<LatLng | null>(null);
    const [weather, setWeather] = useState<WeatherData | null>(localStorage.getItem('lastWeather') ? JSON.parse(localStorage.getItem('lastWeather') || '{}') : null);
    const [celcius, setCelcius] = useState<boolean>(true);
    useEffect(() => {
        const fetchWeather = async () => {
            let url = '';
            if (city) {
                console.log("THis is metric")
                url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${celcius ? 'metric' : 'imperial'}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
            } else if (latLng) {
                url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lng}&units=${celcius ? 'metric' : 'imperial'}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`;
            } else {
                return;
            }

            try {

                const res = await fetch(url);
                const data = await res.json();
                if (data.main) {
                    setWeather({
                        temperature: data.main.temp,
                        description: data.weather[0].description,
                        city: data.name,
                    });
                    localStorage.setItem('lastWeather', JSON.stringify({
                        temperature: data.main.temp,
                        description: data.weather[0].description,
                        city: data.name,
                    }));
                } else {
                    setWeather(null);
                }
            } catch (err) {
                console.error('Failed to fetch weather:', err);
            }
        };

        fetchWeather();
    }, [city, latLng, celcius]);

    return (
        <div className="homepage-layout">
            <div className="input-section">
                <InputComponent onCityChange={(newCity) => {
                    setCity(newCity);
                    setLatLng(null);
                }} />
            </div>
            <div className="map-section">
                <MapComponent onLatLngSelect={(lat, lng) => {
                    setLatLng({ lat, lng });
                    setCity(null);
                }} />
            </div>
            <div className="weather-section">
                <div style={{ marginTop: '20px' }}>
                    {weather ? (
                        <div>
                            <h2>Weather in {weather.city}</h2>
                            <h1>{weather.temperature}<p onClick={() => setCelcius(!celcius)}>{celcius ? '°C' : '°F'}</p></h1>
                            <p>{weather.description}</p>
                        </div>
                    ) : (
                        <p>No weather data yet. Enter a city or click the map.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
