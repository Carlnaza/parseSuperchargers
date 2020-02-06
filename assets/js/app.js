// LocalStorage ARRAY of Locations saved
let locations = JSON.parse(localStorage.getItem('locations')) || []

// Renders saved locations
const renderItems = _ => {
  document.getElementById('saved-locations').innerHTML = ''
  for (let i = 0; i < locations.length; i++) {
    let locationElem = document.createElement('div')
    locationElem.innerHTML = `  
        <div class="row ${i}">
          <div class="col s12 m6">
            <div class="card">
              <div class="card-image">
                <img src="https://via.placeholder.com/300">
                <span class="card-title">${locations[i].location}</span>
                <a class="btn-floating halfway-fab waves-effect waves-light red del-location"><i class="material-icons" data-value="${i}">clear</i></a>
              </div>
              <div class="card-content">
                <p>xx Miles Away</p>
                <p>Street: 1234 UCICodingBootcamp</p>
                <p>City: Irvine, Zip: 92697</p>
              </div>
            </div>
          </div>
        </div>
        `
    document.getElementById('saved-locations').append(locationElem)
  }
  document.getElementById('location').textContent = ' '
}

// Removes saved locations
const removeItem = index => {
  console.log(index)
  locations.splice(index, 1)
  localStorage.setItem('locations', JSON.stringify(locations))
  renderItems()
}

// Event Listener to add Items to list
document.getElementById('add-location').addEventListener('click', _ => {
  event.preventDefault()
  console.log('ping add')
  // Adds "Location" input to Locations Array
  locations.push({
    location: document.getElementById('location').value,
  })
  // Adds "Location" input to Local Storage
  localStorage.setItem('locations', JSON.stringify(locations))
  // Renders items AGAIN to page after the input is made
  renderItems()
  // Sets "Location Input" back to empty 
  document.getElementById('location').value = ' '
})

// Event Listener to remove Items
document.addEventListener('click', event => {
  event.preventDefault()
  if (event.target.className === 'material-icons') {
    console.log('ping clear')
    removeItem(event.target.dataset.value)
  }
})
renderItems()

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



