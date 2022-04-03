//DOM Elements
let cityFormEl = document.getElementById('cityForm');
let cityInputEl = document.getElementById('cityInput');
let searchBtnEl = document.getElementById('citySearch');
let searchedCityEl = document.getElementById('searcherd-city');
let currentWeatherEL = document.getElementById('current-weather-data');
let pastCitiesEl = document.getElementById('past-searches');
let fiveDayEl = document.getElementById('searched-city-five-day');
let futureWeatherEl = document.getElementById('future-weather-data');

//Time Element
var date = moment().format("MMM Do, YYYY");

//Global Variables

let cities = [];
let BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q="

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

var getCurrentWeather = function (city) {
    let currentWeatherAPIKey = 'e4bf4f9f84d50f60c4906ff3e10373be';

    let apiUrl = `${BASE_URL}${city}&units=imperial&appid=${currentWeatherAPIKey}`;
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

//Display results

var displayCityData = function (weather, searchCity) {



  
    // for (var i = 0; i < repos.length; i++) {
    //   var repoName = repos[i].owner.login + '/' + repos[i].name;
  
    //   var repoEl = document.createElement('div');
    //   repoEl.classList = 'list-item flex-row justify-space-between align-center';
  
    //   var titleEl = document.createElement('span');
    //   titleEl.textContent = repoName;
  
    //   repoEl.appendChild(titleEl);
  
    //   var statusEl = document.createElement('span');
    //   statusEl.classList = 'flex-row align-center';
  
    //   if (repos[i].open_issues_count > 0) {
    //     statusEl.innerHTML =
    //       "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    //   } else {
    //     statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    //   }
  
    //   repoEl.appendChild(statusEl);
  
    //   repoContainerEl.appendChild(repoEl);
    }
 
  
