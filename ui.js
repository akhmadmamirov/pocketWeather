class DisplayWeather {
    constructor(){
        this.mainDeg = document.getElementById("d-degrees-number")
        this.days = document.querySelector(".daily-forecast");
        this.toClearParent = document.querySelector(".toClear")
        this.mainImg = this.toClearParent.querySelector("img")
        this.details = document.querySelector(".details")
        this.dLocation = document.querySelector("#d-location")
        this.dDescription = document.querySelector("#d-description")
    }

    Display(data) {
      this.days.innerHTML = ''
       data.forEach((data) => {
        const curDate = data.date
        const temp = data.temp
        const description = data.description
        const icon = data.icon
        // Current Main Weather Image
    
        let output = ''

        output += `
        <div class="ml-3 mb-3 col-xl-2 col-lg-2 col-md-3 col-sm-4 forecast2" style="background-color: #1b7ca4; border-radius: 3px">              
            <div class="row">
                <div class="col-12 text-center mt-2">${curDate}</div>
                <div class="col-12 " style="display: flex; flex-direction: row; justify-content: center">  
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
                </div>
       
                <div class="col-12 daily-high" style="display: flex; flex-direction: row; justify-content: center"><h4>${temp}<span>°</span></h4></div>
                <div class="col-12 text-center">${description}</div>
            </div>
        </div>`

        this.days.innerHTML += output;
        

       })
    }

    // Display the Weather Right Now
    DisplayNow(data){
        
        let icon = data.weather[0].icon
        let output = ""
        output += `
            <div class="col-4  item0">Feels like ${data.main.feels_like}<span style="font-size: 1rem;">°</span> C</div>
            <div class="col-4  item1">Humidity: ${data.main.humidity}%</div>
            <div class="col-4  item2">wind speed: ${data.wind.speed} mph</div>
        `
        this.mainImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        this.mainDeg.textContent = `${data.main.temp}`;
        this.dLocation.innerHTML = `<h4>${data.name}, ${data.sys.country}</h4>`
        this.dDescription.textContent = `${data.weather[0].description}`
        this.details.innerHTML = output;
    }
}
