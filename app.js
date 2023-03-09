// Searh Input
const search = document.getElementById("location-input")

// Search Button
const searchBtn = document.getElementById("search-button")


// Init Weather Object
const weather = new Weather("san francisco");

// Init Ui object
const ui = new DisplayWeather();

// Call getCurrentWeather method and log the weather data
weather.getCurrentWeather()
  .then(data => ui.Display(data))
  .catch(error => console.log(error));

weather.getWeatherNow()
  .then(data => ui.DisplayNow(data))
  .catch(err => console.log(err))

// Change weather Data from Search Input
search.addEventListener("keyup", function(e) {
  if (e.key == "Enter") {
    let newCity  = e.target.value.toLowerCase()
    weather.changeLocation(newCity)
    weather.getCurrentWeather()
    .then(data => ui.Display(data))
    .catch(error => console.log(error));
  
    weather.getWeatherNow()
    .then(data => ui.DisplayNow(data))
    .catch(err => console.log(err))
  }
})

// Change weather Data from Search Btn
searchBtn.addEventListener("click", function(e) {
  // Input City
  const inputCity = document.getElementById("input-city").value.toLowerCase()

  let newCity  = inputCity
    weather.changeLocation(newCity)
    weather.getCurrentWeather()
    .then(data => ui.Display(data))
    .catch(error => console.log(error));
  
    weather.getWeatherNow()
    .then(data => ui.DisplayNow(data))
    .catch(err => console.log(err))
  }
)
