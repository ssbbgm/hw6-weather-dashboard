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
            // console.log(data);
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
        for(let i=0; i < (copyOfList.length); i++) {
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
          card.innerHTML = `
            <div class="card">
              <div class="card-header">Featured</div>
              <ul class=" list-group list-group-flush border-0">
              <li class="list-group-item">An item</li>
              <li class="list-group-item">A second item</li>
              <li class="list-group-item">A third item</li>
              <li class="list-group-item">A fourth item</li>
              </ul>
            </div>
          `;

          $('#future-weather-data').append(card);


  
          

        }





      })
}

// function get5Day (lon, lat) {

//   let apiKey = 'e4bf4f9f84d50f60c4906ff3e10373be';
//   let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=5&appid=${apiKey}`; THIS ONE WORKED

//   fetch(apiUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function(data){
//       // console.log(data);
//       let list = data['list'];
//       console.log(list);
//       list.forEach(function(item, index){
//         let retrievedDate = new Date(list[index].dt * 1000);
//         let topDates = retrievedDate.getMonth() + "/" + retrievedDate.getDate() + "/" + retrievedDate.getFullYear();
//         console.log(topDates);
//         let weatherIcon = item.weather[0].icon;
//         let temp = item.main.temp;
//         let wind = item.wind.speed;
//         let humidity = item.main.humidity;

//         let card = document.createElement('div');
//         card.classList.add('card');
//         card.style.width = '18erem';



//         // <div class="card" style="width: 18rem;">
//         // <div class="card-header">Featured</div>
//         // <ul class="list-group list-group-flush">
//         // <li class="list-group-item">An item</li>
//         // <li class="list-group-item">A second item</li>
//         // <li class="list-group-item">A third item</li>
//         // </ul>
//         // </div>

//       })





//     })
// }