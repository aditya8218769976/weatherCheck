import React, { useCallback, useEffect, useState } from "react";
import "./WeatherBg.css";
import axios from "axios";

const WeatherBg = (props) => {
  const apiKey = "45e43b6c016a03745ea3dd5b24b221f7";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  const getWeatherDetails = useCallback((cityName) => {
    if (!cityName) {
      return;
    }
    const apiUrl =
      "http://api.openweathermap.org/data/2.5/weather?q= " +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error, "error..");
      });
    setInputCity("");
  }, []);

  useEffect(() => {
    getWeatherDetails();
  }, [getWeatherDetails]);

  const clickHandler = () => {
    getWeatherDetails(inputCity);
  };

  const inputChangeHandler = (event) => {
    setInputCity(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="col-sm-12 weather-bg-style">
        <h1>Weather App</h1>

        <div className="col-4 d-grid gap-3">
          <input
            type="text"
            className="form-control"
            onChange={inputChangeHandler}
            value={inputCity}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={clickHandler}
          >
            Add
          </button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-12 text-center mt-5 ">
          <div className="resultBox-style">
            <div className="city-country-style">
              <span>
                <h5 className="weather-city">{data.name}</h5>
              </span>
              <span>
                <h5 className="country-title-style">({data.sys.country})</h5>
              </span>
            </div>

            <h6 className="weather-city-temp">
              {(data.main.temp - 273.5).toFixed(1)}°C
            </h6>

            <h5 className="weather-details-style">{data.weather[0].main}</h5>
            <div className="lon-lat-style">
              <span>
                <h5 className="lon-style">{data.coord.lon}</h5>
              </span>
              <span>
                <h5 className="lat-style">{data.coord.lat}</h5>
              </span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default WeatherBg;
