function handlesearch(event) {
  event.preventDefault();
  let searchinput = document.querySelector(".search-form-input");

  searchCity(searchinput.value);
}

let searchFormElement = document.querySelector("#city-entered");
console.log(searchFormElement);
searchFormElement.addEventListener("submit", handlesearch);

function searchCity(city) {
  let api = "67c51o1bccat73f84f450a30f6ffcb49";
  let apiKey = `https://api.shecodes.io/weather/v1/current?query=${city}&key=67c51o1bccat73f84f450a30f6ffcb49&units=metric`;
  console.log(apiKey);
  axios.get(apiKey).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weatherdescription");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-city-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  windElement.innerHTML = `${response.data.wind.speed}km/hr`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  timeElement.innerHTML = formdate(date);

  console.log(response.data.condition.description);
  console.log(response.data);
  console.log(response.data.temperature.humidity);
  getforecast(response.data.city);
}

function formdate(date) {
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
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour} :${minute}`;
}

searchCity("Paris");

function getforecast(city) {
  let apikeyf = "67c51o1bccat73f84f450a30f6ffcb49";
  let apiurlf = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=67c51o1bccat73f84f450a30f6ffcb49`;

  axios(apiurlf).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecastjs");
  let days = ["Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let forecastHtml = "";
  response.data.daily.slice(0, 5).forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="col2">
      <div class="weather-forecast-date">${
        formdate(new Date(day.time * 1000)).split(" ")[0]
      }</div>
       <div class="forecast-icon" id="forecasticonid">
          <img src="${day.condition.icon_url}" class="weather-city-icon" />
        </div>
      
      <div class="weather-forecast-temp">
          <span class="forecast-temp-max"> ${day.temperature.maximum}°  </span>
          
          <span class="forecast-temp-min">  ${day.temperature.minimum}°</span>
        </div>
      </div>
    
    `;
  });

  forecastElement.innerHTML = forecastHtml;
}
console.log(
  "https://api.shecodes.io/weather/v1/forecast?query=perth&key=67c51o1bccat73f84f450a30f6ffcb49"
);
