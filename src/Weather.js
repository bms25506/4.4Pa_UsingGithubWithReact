// Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [forecastUrl, setForecastUrl] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGridPoints = async (lat, lon) => {
    try {
      const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Grid Points Data:', data); // Debug log
      if (!data.properties || !data.properties.forecast) {
        throw new Error('No forecast URL available in grid points data');
      }
      return data.properties.forecast;
    } catch (error) {
      console.error('Error fetching grid points:', error); // Debug log
      setError(error);
      setLoading(false);
      return null;
    }
  };

  const fetchWeather = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      console.log('Weather Data:', data); // Debug log
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error); // Debug log
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setWeather(null);
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lon)) {
      setError(new Error('Please enter valid latitude and longitude values.'));
      setLoading(false);
      return;
    }
    const url = await fetchGridPoints(lat, lon);
    if (url) {
      setForecastUrl(url);
      fetchWeather(url);
    }
  };

  return (
    <div>
      <h2>Weather Forecast</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Latitude:
            <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Longitude:
            <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
          </label>
        </div>
        <button type="submit">Get Weather</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {forecastUrl && <div>Forecast URL: {forecastUrl}</div>}
      {weather && weather.properties && (
        <div>
          <h3>Forecast for ({latitude}, {longitude})</h3>
          <p>Temperature: {weather.properties.periods[0].temperature}°{weather.properties.periods[0].temperatureUnit}</p>
          <p>Condition: {weather.properties.periods[0].shortForecast}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
