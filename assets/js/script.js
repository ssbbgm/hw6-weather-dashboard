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

//Form Submission action
$(searchBtnEl).on ('click', function (event) {
  event.preventDefault();

  let city = cityInputEl.value.trim();

  if (city) {
    cities.push(city);
    console.log(cities);
    getCurrentWeather(city);
    get5Day(city);
    cityInputEl.value = '';

    cities.forEach
    var $button = $(`<button type='button' class='btn btn-secondary custom-btn'>${city}</button>`);
    // Append it
    $('#past-searches').append($button);

    // Event for this button 
    $button.on('click',function(){
    getCurrentWeather(JSON.parse(localStorage.getItem(city)));
    }); 

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
            console.log(data);
            displayCityData(data, city);
            localStorage.setItem(city, JSON.stringify(data));
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

    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', ` http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
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
        // console.log(data);
        let list = data['daily'];
        let copyOfList = [...list];
        // console.log(copyOfList);
        copyOfList.shift();
        copyOfList.splice(5, 2);
        console.log(copyOfList);

        // console.log(list);
        for(let i = 0; i < (copyOfList.length); i++) {
          let retrievedDate = new Date(copyOfList[i].dt * 1000);
          let topDates = retrievedDate.getMonth() + "/" + retrievedDate.getDate() + "/" + retrievedDate.getFullYear();
          console.log(topDates);

          let weatherIcon = copyOfList[i].weather[0].icon;
          console.log(weatherIcon);


          let temp = copyOfList[i].temp.day;
          console.log(temp);
          let wind = copyOfList[i].wind_speed;
          console.log(wind);
          let humidity = copyOfList[i].humidity;
          console.log(humidity);

          let card = document.createElement('div');
          card.classList.add('card');
          card.style.width = '20%';
          card.style.height = '100%';
          card.innerHTML = `
            <div class="card">
              <div class="card-header">${topDates}</div>
              <ul class=" list-group list-group-flush">
              <li class="list-group-item"><img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png"></li>
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

// function pastSearches (city) {

//   $(searchBtnEl).on ('click', function (event) {
//   getCurrentWeather(JSON.parse(localStorage.getItem(city)));
//   var $button = $(`<button type='button' class='btn btn-secondary'>${city}</button>`);
//   // Append it
//   $('#past-searches').append($button);

//   // Event for this button 
//   $button.on('click',function(){
//     getCurrentWeather(JSON.stringify(localStorage.getItem(city)));
//   }); 

// })

// }

// pastSearches();