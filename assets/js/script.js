//DOM Elements
let cityFormEl = document.getElementById('cityForm');
let cityInputEl = document.getElementById('cityInput');
let searchBtnEl = document.getElementById('citySearch');
let searchedCityEl = document.getElementById('searched-city');
let currentWeatherEL = document.getElementById('current-weather-data');
let pastCitiesEl = document.getElementById('past-searches');
let fiveDayEl = document.getElementById('searched-city-five-day');
let futureWeatherEl = document.getElementById('future-weather-data');
let weatherIconEl = document.getElementById('weather-icon');


//Global Variables

let cities = [];

getPastSearches();

//Form Submission action
$(searchBtnEl).on ('click', function formSubmission (event) {
  event.preventDefault();

  let city = cityInputEl.value.trim();

  if (city) {
    cities.push(city);
    getCurrentWeather(city);
    cityInputEl.value = '';
    localStorage.setItem('searchHistory', JSON.stringify(cities));
    getPastSearches();
    
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
            // localStorage.setItem('searchHistory', JSON.stringify(cities));
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

let displayCityData = function (weather) {

    $("#searched-city").html(weather.name);

    const retrievedDate = new Date(weather.dt * 1000);

    $("#current-date").html(
        retrievedDate.getMonth() +
          "/" +
          retrievedDate.getDate() +
          "/" +
          retrievedDate.getFullYear()
      );
    
    $('#current-icon').empty();

    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', ` https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
    $('#current-icon').append(weatherIcon);

    $("#temp").html(`Temp: ${weather.main.temp}&deg;F`);
    $("#wind").html(`Wind: ${weather.wind.speed} MPH`);
    $("#humidity").html(`Humidity: ${weather.main.humidity} %`);

    let lon = weather.coord.lon;
    let lat = weather.coord.lat;

    getUvIndex(lon, lat);
    get5Day(lon, lat);

    }

function getUvIndex (lon, lat){
        let apiKey = 'e4bf4f9f84d50f60c4906ff3e10373be';
        let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`;
    
        fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
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
    let currentUv = current.current.uvi;
    $('#uv-index').html(`UV Index: ${currentUv}`);

    if (currentUv <=2){
        $('#uv-index').addClass('low');
    } else if (currentUv >=3 && currentUv <=5) {
        $('#uv-index').addClass('moderate');
    } else {
        $('#uv-index').addClass('high');
    }
}

function get5Day (lon, lat) {
    let apiKey = 'e4bf4f9f84d50f60c4906ff3e10373be';
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=imperial&cnt=5&appid=${apiKey}`;

    // let apiKey = 'e4bf4f9f84d50f60c4906ff3e10373be';
    // let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${apiKey}`; THIS ONE WORKED
  
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function(data){
        let list = data['daily'];
        let copyOfList = [...list];
        copyOfList.shift();
        copyOfList.splice(5, 2);

        $('#future-weather-data').empty();
        
        for(let i = 0; i < (copyOfList.length); i++) {
          let retrievedDate = new Date(copyOfList[i].dt * 1000);
          let topDates = retrievedDate.getMonth() + "/" + retrievedDate.getDate() + "/" + retrievedDate.getFullYear();

          let weatherIcon = copyOfList[i].weather[0].icon;

          let temp = copyOfList[i].temp.day;

          let wind = copyOfList[i].wind_speed;
       
          let humidity = copyOfList[i].humidity;

          let card = document.createElement('div');
          card.classList.add('card');
          card.style.width = '20%';
          card.style.height = '100%';
          card.innerHTML = `
            <div class="card">
              <div class="card-header">${topDates}</div>
              <ul class=" list-group list-group-flush">
              <li class="list-group-item"><img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></li>
              <li class="list-group-item">Temp: ${temp}&deg;F</li>
              <li class="list-group-item">Wind: ${wind} MPH</li>
              <li class="list-group-item">Humidity: ${humidity} %</li>
              </ul>
            </div>
          `;

          $('#future-weather-data').append(card);
         
        }

      })
}

function getPastSearches() {
    let cities = JSON.parse(localStorage.getItem('searchHistory'));
    $('#past-searches').html('');
    cities.forEach(function(city){
    let $button = $(`<button type='button' class='city-btn btn btn-secondary custom-btn'>${city}</button>`);
    // Append it
    $('#past-searches').append($button);
    })
}
  
// Event for this button 
$('#past-searches').on('click', '.city-btn', function (event){
  event.preventDefault();
  let cityName = $(this).text();
  getCurrentWeather(cityName);
}); 


