/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

const WeatherCard = ({ data }) => {
  const { date, time, temperature, weather,weather_pic, wind } = data;

  return (
    <article className="weather-card">
      <h5>{new Date(date).toLocaleDateString()}</h5>
      <p>Hora: {time}</p>
      <p>Temperatura: {temperature}°C</p>
      <p>Tiempo: {weather}</p>
      <img src={weather_pic}></img>
      <p>Viento: {wind.speed} m/s</p>
    </article>
  );
};

export default WeatherCard;
