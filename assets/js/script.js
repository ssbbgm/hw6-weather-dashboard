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

//Form Submission action
$(searchBtnEl).on ('click', function (event) {
    event.preventDefault();
  
    let city = cityInputEl.value.trim();
  
    if (city) {
      getCurrentWeather(city);
  
      cityInputEl.value = '';
    } else {
      alert('Please enter a city');
    }
})  

//Get the current weather data

let getCurrentWeather = function (city) {
    let apiKey = 'e4bf4f9f84d50f60c4906ff3e10373be';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayCityData(data, city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
       alert('Unable to connect to OpenWeather');
      });
  };

//Display results

let displayCityData = function (weather, searchCity) {

    $("#searched-city").html(weather.name);

    const retrievedDate = new Date(weather.dt * 1000);

    $("#current-date").html(
        retrievedDate.getMonth() +
          "/" +
          retrievedDate.getDate() +
          "/" +
          retrievedDate.getFullYear()
      );

    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    $('#current-icon').append(weatherIcon);

    $("#temp").html(`Temp: ${weather.main.temp}&deg;F`);
    $("#wind").html(`Wind: ${weather.wind.speed} MPH`);
    $("#humidity").html(`Humidity: ${weather.main.humidity} %`);

    let lon = weather.coord.lon;
    let lat = weather.coord.lat;
    console.log(lon, lat);

    getUvIndex(lon, lat);

    }

function getUvIndex (lon, lat){
        let apiKey = 'e4bf4f9f84d50f60c4906ff3e10373be';
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;
    
        fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displayUvData(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
       alert('Unable to connect to OpenWeather');
      });
  };

function displayUvData (current){
    $('#uv-index').html(`UV Index: ${current.current.uvi}`);

    if(current.current.uvi <=2){
        
    }
}

