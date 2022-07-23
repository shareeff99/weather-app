import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import "./weatherCard.css";
import { isContentEditable } from '@testing-library/user-event/dist/utils';

function App() {

// save weather
const [WeatherData, setWeatherData] = useState({});
// save city
const [city, setCity] = useState("");
// showdata onload
const [showData, setShowData] = useState(false);

// state to hold the current day's forecast
const [currDay, setCurrDay] = useState(0);

useEffect(() => {
  console.log(city);
});

// go right
const goRight = () => {
  if(currDay == 2) {
    setCurrDay(2);
  }
   else {
    setCurrDay(currDay + 1);
   }
};

// go left
const goLeft = () => {
  if(currDay == 0) {
    setCurrDay(0);
  }
   else {
    setCurrDay(currDay - 1);
   }
};

// create a function to fetch the data from the API
const GetWeather = () => {
  Axios.get(`http://goweather.herokuapp.com/weather/${city}`).then(
      (response) => {
          // do something with the response
          console.log(response);
          setWeatherData(response.data);
          // display showData
          setShowData(true);
      }
  );
}

return (
  //start of the app
  <div className="App"> 
    
    {/* input and button */}
    <div className="inputContainer">
      <input
      type="text"
      className="inputs"
      placeholder='Enter a city'
      onChange={(event) => {
        setCity(event.target.value);
      }}
      />
      <button onClick={GetWeather}>Get Weather</button>
    </div>

      {/* data Container */} 
      {/*if the showData is "true" then display something*/}
      {showData && (
        <div className="dataContainer">
          <div className="weatherCard">
              <h1 className='dataCity'>city: {city.charAt(0).toUpperCase() + city.slice(1)}</h1>
              {/*<img className='weatherIcon' src={icon}/>*/}
              <h2 className="dataWeather">description: {WeatherData.description}</h2>
              <h2 className="dataTemperature">temperature: {WeatherData.temperature}</h2>

              <hr />

              {/* forecast Container */}
              <div className="forecastContainer">
                <div className="left">
                    <button onClick={goLeft}>Left</button>
                </div>
                <div className="middle">
                    <div className="forecastData">
                      <h3>day {WeatherData.forecast[currDay].day}</h3>
                      <h3>Temperature: {WeatherData.forecast[currDay].temperature}</h3>
                      <h3>Wind: {WeatherData.forecast[currDay].wind}</h3>
                    </div>
                </div>
                <div className="right">
                    <button onClick={goRight}>Right</button>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
    //end of the app
  );
}

export default App;
