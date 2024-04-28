// eslint-disable-next-line no-unused-vars
import React from "react";
import WeatherCard from "./WeatherCard";
import { useState, useEffect } from "react";

import axios from "axios";

const WeatherList = () => {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);

  useGeoLocation();

  function useGeoLocation() {
    if (useState === "") {
      getLocation();
    } else return false;
  }

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    const res = await axios.get("http://ip-api.com/json"); // country, countryCode, regionName, city, lat, lon, zip and timezone
    console.log(res);
    setCity(res.data.city);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        // Petición HTTP
        const forecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${city}&APPID=380fd9cebf8db351f5a4891638caaefa`
        );
        //const forecastUser = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}units=metric&APPID=380fd9cebf8db351f5a4891638caaefa`);

        const data = forecast.data;
        // Guarda en el array de posts el resultado. Procesa los datos
        setForecastData(
          data.list.map((item) => ({
            date: item.dt * 1000, // Convertir la fecha a milisegundos
            time: item.dt_txt.split(" ")[1], // Obtener la hora de la cadena de fecha
            temperature: item.main.temp,
            weather: item.weather[0].main,
            weather_pic:"http://openweathermap.org/img/w/"+(item.weather[0].icon) +".png",
            wind: item.wind,
          }))
        );
      } catch (e) {
        setForecastData([]); // No pintes nada
      }
    }
    fetchData();
  }, [city]); //

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCity = e.target.location.value.trim();
    if (newCity) {
      setCity(newCity);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input name="location" placeholder="Ciudad" />
        <br />
        <button type="submit">Buscar</button>
      </form>

      <h4>El tiempo en {city} en los próximos 5 días:</h4>
      {forecastData.length !== 0 ? (
        <div className="weather-list">
          {forecastData.map((data, index) => (
            <WeatherCard key={index} data={data} />
          ))}
        </div>
      ) : (
        <p>No se encontraron datos para la ciudad especificada.</p>
      )}
    </section>
  );
};

export default WeatherList;
