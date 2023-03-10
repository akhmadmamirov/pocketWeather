class Weather {
  constructor(city) {
    this.city = city;
    this.geoApi = null;
    this.apiKey = null;
    this.fetchApiKey();
  }

  async fetchApiKey() {
    const response = await fetch('https://endearing-souffle-b7369a.netlify.app/apiKey');
    const { apiKey, geoApi } = await response.json();
    this.apiKey = apiKey;
    this.geoApi = geoApi;
  }

  // Get coordinates for a city
    async getCoordinates() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.city}&key=${this.geoApi}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      const result = data.results[0].geometry.location;
      const latitude = result.lat;
      const longitude = result.lng;
      return { latitude, longitude };
  } catch (error) {
      console.error(error);
  }
  }
  // Fetch Current Weather
  async getCurrentWeather() {
    
    while (this.apiKey === null || this.geoApi === null) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const coordinates = await this.getCoordinates();
    const longitude = coordinates.longitude;
    const latitude = coordinates.latitude;
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`);
    const data = await response.json();

    // Extract five-day forecast data
    const forecast = [];
    for (let i = 0; i < data.list.length; i += 8) {
      const dayData = data.list[i];
      const date = new Date(dayData.dt * 1000);
      const celsiusTemp = (dayData.main.temp - 273.15).toFixed(1);
      const weather = {
        date: date.toDateString(),
        temp: celsiusTemp,
        description: dayData.weather[0].description,
        icon: dayData.weather[0].icon,
      };
      forecast.push(weather);
    }
  
    return forecast;
  }
  

  // Fetch weather now
  async getWeatherNow() {
    while (this.apiKey === null) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Change weather location
  changeLocation(city) {
    this.city = city;
  }
}


