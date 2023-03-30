let celsius = 25;
let fahrenheit = 10000;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "Saturday",
];

let days2 = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

let apiKey = "2b6fdad0cbd018949c50c70f72250726";

let temperatureTag = document.querySelector("#temperature");



function celsiusToFahrenheit(event) {
  event.preventDefault();
  fahrenheit = (celsius * 9) / 5 + 32;
  temperatureTag.innerHTML = Math.round(fahrenheit);

fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
}


function fahrenheitToCelsius(event) {
  event.preventDefault();
  if (fahrenheit != 10000) {
    celsius = ((fahrenheit - 32) * 5) / 9;
    temperatureTag.innerHTML = Math.round(celsius);
  }

celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", fahrenheitToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", celsiusToFahrenheit);


function formatDate(timestamp){
 timestamp=timestamp * 1000;
let date = new Date(timestamp);
let hours = date.getHours();
if(hours<10)
{
hours=`0${hours}`;
}

let minutes = date.getMinutes();
if(minutes<10)
{
minutes=`0${minutes}`;
}




let today = days[date.getDay()];

return `${today} ${hours}:${minutes}`

}

function formatDay(timeStamp){
  let date = new Date(timeStamp*1000);
  let day = date.getDay();
  return days2[day];
}


function displayForecast(response){

let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecastSection");

let foreCastHtml = ``;
forecast.forEach(function(foreCastDay,Index){

  if(Index<7)
  {
    foreCastHtml = foreCastHtml + `<div class="col forecast">
    <div class="forecastDay">${formatDay(foreCastDay.dt)}</div>
    <div>
      <img id="icon" src="http://openweathermap.org/img/wn/${foreCastDay.weather[0].icon}@2x.png" alt="Cloudy icon" class="" width="50" height="50">
    </div>
    <div>
      <span class="maxTemp">${Math.round(foreCastDay.temp.max)}°</span><span class="minTemp">${Math.round(foreCastDay.temp.min)}°</span>
    </div>
  </div>`;
  }
 


});

forecastElement.innerHTML = foreCastHtml;
forecastElement.classList.remove("hide");

}


function getForecast(coordinates){
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);

}



function showWeather(response) {

  getForecast(response.data.coord);

  //---------------------------
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let temp = Math.round(response.data.main.temp);
  celsius = temp;

  temperatureTag.innerHTML = temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt);

celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

let contentSection = document.querySelector("#contentSection");
contentSection.classList.remove("hide");

}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function retrievePosition(position) {
  let apiKey = "2b6fdad0cbd018949c50c70f72250726";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
  axios.get(url).then(showWeather);
}
navigator.geolocation.getCurrentPosition(retrievePosition);







