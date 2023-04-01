// Search Input
const search = document.getElementById("location-input");

// Search Button
const searchBtn = document.getElementById("search-button");


// Define the base URL for the API calls
const API_BASE_URL = "https://myserver-yxlj.onrender.com";

// Init Ui object
const ui = new DisplayWeather();

// Call getCurrentWeather method and log the weather data
fetch(`${API_BASE_URL}/weather/current/san%20francisco`)
  .then(response => response.json())
  .then(data => ui.DisplayNow(data))
  .catch(error => console.log(error));

fetch(`${API_BASE_URL}/weather/forecast/san%20francisco`)
  .then(response => response.json())
  .then(data => ui.Display(data))
  .catch(err => console.log(err));

// Change weather Data from Search Input
search.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    changeWeatherData();
    e.preventDefault();
  }
});

// Change weather Data from Search Btn
searchBtn.addEventListener("click", function(e) {
  changeWeatherData();
  e.preventDefault();
});


function changeWeatherData() {
  // Input City
  const inputCity = document.getElementById("input-city").value.toLowerCase();
  const encodedCity = encodeURIComponent(inputCity); // Encode inputCity
  fetch(`${API_BASE_URL}/weather/current/${encodedCity}`)
    .then(response => response.json())
    .then(data => ui.DisplayNow(data))
    .catch(error => console.log(error));

  fetch(`${API_BASE_URL}/weather/forecast/${encodedCity}`)
    .then(response => response.json())
    .then(data => ui.Display(data))
    .catch(err => console.log(err));
}


