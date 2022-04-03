//DOM Elements
let cityFormEl = document.getElementById('cityForm');
let cityInputEl = document.getElementById('cityInput');
let searchBtnEl = document.getElementById('citySearch');
let searchedCityEl = document.getElementById('searcherd-city');
let currentWeatherEL = document.getElementById('current-weather-data');
let pastCitiesEl = document.getElementById('past-searches');
let fiveDayEl = document.getElementById('searched-city-five-day');
let futureWeatherEl = document.getElementById('future-weather-data');

//Global Variables

let cities = [];
let BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="

//Form Submission action
$(searchBtnEl).on ('click', function (event) {
    event.preventDefault();
  
    let city = cityInputEl.value.trim();
  
    if (city) {
      getCurrentWeather(city);
  
      searchedCityEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
})  

//Get the current weather data

var getCurrentWeather = function (city) {
    let currentWeatherAPIKey = 'e4bf4f9f84d50f60c4906ff3e10373be';

    let apiUrl = `${BASE_URL} + ${city} + '&appid=' + ${currentWeatherAPIKey}`;
    console.log(apiUrl);
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayCityData(data, city);
            console.log(response);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
       alert('Unable to connect to OpenWeather');
      });
  };
