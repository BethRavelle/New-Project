// display date
let now = new Date();
let currentDateTime = document.querySelector("#currentDateTime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let year = now.getFullYear();
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDateTime.innerHTML = `${day}, ${date} ${month}, ${year}, ${hour}:${minutes}`;

// search form
function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector(".today-temperature");
  displayTemp.innerHTML = `${temperature}`;

  let minimum = Math.round(response.data.main.temp_min);
  let displayMin = document.querySelector("#min");
  displayMin.innerHTML = `${minimum}`;

  let maximum = Math.round(response.data.main.temp_max);
  let displayMax = document.querySelector("#max");
  displayMax.innerHTML = `${maximum}`;

  let description = response.data.weather[0].main;
  let displayDescrip = document.querySelector("#description");
  displayDescrip.innerHTML = `${description}`;

  let humidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `${humidity}`;

  let wind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind");
  displayWind.innerHTML = `${wind}`;
}

function showCityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-field");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;

  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCityName);

function getCurrentTemp(userCity) {
  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCurrentTemp);
}

function getCity(response) {
  let userCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${userCity}`;
  getCurrentTemp(userCity);
}

function getLocation(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  let apiKey = "bc5ca568ee2d7c71357ca430a3ff8705";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getCity);
}

function sendCoords() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let locationButton = document.querySelector("#locationButton");
locationButton.addEventListener("click", sendCoords);
