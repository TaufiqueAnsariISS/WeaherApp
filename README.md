# Weather App (React)

This project is a modern React application for viewing weather information based on location.

## Features

- **Homepage:**
	- Displays a dashboard for weather lookup.
	- Responsive layout with input, weather card, and map sections.

- **Input Component:**
	- Allows users to select a country, state, and city using dropdowns.
	- Fetches and displays weather data for the selected city.

- **Map Component:**
	- Interactive map (OpenStreetMap + Leaflet) for selecting a location by clicking.
	- Fetches and displays weather data for the selected latitude/longitude.

- **Weather Card:**
	- Shows current temperature, weather condition, and city name.
	- Updates automatically when a new location is selected.
    - The temperature can be toggled between Celcius and Farenheit simply by clicking the temperature

- **Local Storage:**
	- Remembers the last fetched weather data for quick reloads.

## How It Works

1. **Select a location:**
	 - Use the dropdowns to pick a country, state, and city, or click on the map to drop a pin.
2. **View weather:**
	 - The app fetches weather data from OpenWeatherMap and displays it in the weather card.
3. **Switch between input and map:**
	 - You can use either method to update the weather card instantly.