// Weather.js
import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY')
      .then(response => response.json())
      .then(data => setWeather(data));
  }, []);

  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default Weather;
