// Formatted the days and time 

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// Hourly forecast function

function formathour(timestamp) {
  let hour = new Date(timestamp * 1000);
  let hours = hour.getHours();
  let timeHour = [
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  return timeHour[hours];
}



// Daily forecast function

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayDailyForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="daily-temp col">
        <div class="day">${formatDay(forecastDay.dt)}</div>
        <img 
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="" width="42" 
        />
        <div class="weather-daily-temp">
          <span class="weather-daily-max">${Math.round(
            forecastDay.temp.max
          )}° </span>
          |
          <span class="weather-daily-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>  
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayHourlyForecast(response) {
  let hourlyForecast = response.data.hourly;

  let hourlyForecastElement = document.querySelector("#hourly-forecast");

  let hourlyForecastHTML = `<div class="row">`;
  hourlyForecast.forEach(function (forecastHour, index) {
    if (index < 5) {
      hourlyForecastHTML =
        hourlyForecastHTML +
        `<div class="hourly-temp col">
        <div class="hourly">${formathour(forecastHour.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${
          forecastHour.weather[0].icon
        }@2x.png" alt="" width="42" 
        />
        <div><span>${Math.round(forecastHour.temp)}</span> °C</div>
      </div>  
`;
    }
  });
  hourlyForecastHTML = hourlyForecastHTML + `</div>`;
  hourlyForecastElement.innerHTML = hourlyForecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6944106f98547ab3f1415842da965c69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayDailyForecast);
  axios.get(apiUrl).then(displayHourlyForecast);
}

// Main weather forecast function 

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  windElement.innerHTML = Math.round(celsiusTemp) + "km/h";
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity + "%";
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "6944106f98547ab3f1415842da965c69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

search("Stockholm");
