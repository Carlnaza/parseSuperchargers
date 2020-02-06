// NHTSA Car Query API
let carDetailsArr = JSON.parse(localStorage.getItem('carDetailsArr')) || []

const renderCarDetails = _ => {
  fetch('https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/tesla?format=json')
    .then(r => r.json())
    .then(({ Results }) => {
      for (let i = 0; i < Results.length; i++) {
        let carDetailElem = document.createElement('div')
        carDetailElem.innerHTML = `
              <li class="collection-item">
                <div>
                    <h3>Model Name:</h3> 
                    <p>${Results[i].Model_Name}</p>
                    <a class="secondary-content">
                    <button class="waves-effect waves-light btn car-details" value="${Results[i].Model_Name}">Save</button>
                  </a>
                </div>
              </li>
        `
        document.getElementById('car-details').append(carDetailElem)
      }
    })
    .catch(e => console.error(e))
  document.getElementById('car-details').innerHTML = ' '
}

// Renders my Car to Div
const renderMyCar = _ => {
  setTimeout( _ => {document.getElementById('car-details').innerHTML = ' '}, 300)
  document.getElementById('my-car').innerHTML = ' '
  for(let i = 0; i < carDetailsArr.length; i++) {
    let myCarDiv = document.createElement('div')
    myCarDiv.innerHTML = `
    <h3>Model Name:</h3>
    <p>${carDetailsArr[i].car_model}</p>
    <a class="secondary-content"><button class="waves-effect waves-light btn red remove-car" value="${i}">Remove</button>
    </a>
    `
    document.getElementById('my-car').append(myCarDiv)
  }
}

// Removes Saved Cars
const removeMyCar = index => {
  console.log(index)
  console.log(carDetailsArr)
  carDetailsArr.splice(index, 1)
  localStorage.setItem('carDetailsArr', JSON.stringify(carDetailsArr))
}

// Button to add/remove my Car
document.addEventListener('click', event => {
  if (event.target.classList.contains('car-details')) {
    carDetailsArr.push({
      car_model: event.target.value
    })
    document.getElementById('my-car').innerHTML = ' '
    localStorage.setItem('carDetailsArr', JSON.stringify(carDetailsArr))
    renderMyCar()
  } else if (event.target.classList.contains('remove-car')) {
    removeMyCar(event.target.value)
    document.getElementById('my-car').innerHTML = ' '
    renderMyCar()
  }
})
renderMyCar()

// Shows Car Details
document.getElementById('car-details-btn').addEventListener('click', _ => {
  console.log('ping')
  renderCarDetails()
})



// Weather Api call


document.getElementById('searchCity').addEventListener('click', event => {
  event.preventDefault()

  document.getElementById('displayWeather').innerHTML = ``

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('city').value}&APPID=e2bb961f87ee45b7f3164d336e92a97a&units=imperial`)
    .then(r => r.json())
    .then(({ list }) => {

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea4d3d5c304c48499f2204108200502&q=${document.getElementById('city').value}&days=5`)
      .then(r => r.json())
      .then(({ location, current, forecast, condition }) => {

        document.getElementById('displayWeather').innerHtml = ``

          for (var i = 0; i < 5; i++) {

            let forecastInfo = forecast.forecastday[i]
            let daily = forecastInfo.day
            let date = moment(`${forecastInfo.date}`, 'YYYY-MM-DD').format('MMM-DD-YYYY');
            let listInfo = list[i]
            console.log(current.condition.icon)
            let weatherElem = document.createElement('div')
            weatherElem.innerHTML = `
        
        <div class="card indigo-text text-darken-4 light-blue lighten-5 z-depth-2 col s12">
        
          <div class="row">
            <div class="col s6">
              <h5>${location.name}
              <h6>${date}</h6>
              <img src="http://openweathermap.org/img/w/${listInfo.weather[0].icon}.png">
            </div>
            
            <div class="col s6">
              <h6>High: ${daily.maxtemp_f}</h6>
              <h6>Low: ${daily.mintemp_f}</h6>
              <h6>Humidity: ${daily.avghumidity}</h6>
              <h6>Maximum Windspeed: ${daily.maxwind_mph}</h6>
            </div>
          </div>
        </div>
       `
            document.getElementById('displayWeather').append(weatherElem)
          } 
        })
      document.getElementById('city').value = ''
    })
  })


  // < img src = "http://openweathermap.org/img/w/${listInfo.weather[0].icon}.png" >

  // < img src = ${ current.condition.icon }></img >



