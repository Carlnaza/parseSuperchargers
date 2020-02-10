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

// Quote of the Day API
fetch('https://favqs.com/api/qotd')
.then (r => r.json())
.then (({ quote }) => {
  console.log(quote)
  console.log(quote.author)
  console.log(quote.body)
  document.getElementById('quote').textContent = `"${quote.body}"`
  document.getElementById('author').textContent = `-${quote.author}`
})


// Weather Api call
let weatherSavedArr = JSON.parse(localStorage.getItem('displayWeather')) || []

document.getElementById('searchCity').addEventListener('click', event => {
  event.preventDefault()
  document.getElementById('displayWeather').innerHTML = ``
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=ea4d3d5c304c48499f2204108200502&q=${document.getElementById('city').value}&days=5`)
      .then(r => r.json())
      .then(weather => {

        document.getElementById('displayWeather').innerHtml = ``

          for (var i = 0; i < 5; i++) {
            let weatherElem = document.createElement('div')
            weatherElem.innerHTML = `
        
        <div class="card indigo-text text-darken-4 light-blue lighten-5 z-depth-2 col s12">
        
          <div class="row">
            <div class="col s6">
              <h5>${weather.location.name}, ${weather.location.region}</h5>
              <h6>${weather.forecast.forecastday[i].day.condition.text}</h6>
              <img src="https:${weather.forecast.forecastday[i].day.condition.icon}">
            </div>
            
            <div class="col s6">
              <h6>Date: ${moment(weather.forecast.forecastday[i].date).format('MM-DD-YYYY')}</h6>
              <h6>High: ${weather.forecast.forecastday[i].day.maxtemp_f}°</h6>
              <h6>Low: ${weather.forecast.forecastday[i].day.mintemp_f} °</h6>
              <h6>Humidity: ${weather.forecast.forecastday[i].day.avghumidity}</h6>
              <h6>Windspeed: ${weather.forecast.forecastday[i].day.maxwind_mph}mph</h6>
            </div>
          </div>
        </div>
       `  
            console.log(weather.forecast)
            document.getElementById('displayWeather').append(weatherElem)
          } 
        })
      weatherSavedArr.push({
          city: event.target.value
        })
      localStorage.setItem('weatherSavedArr', JSON.stringify(weatherSavedArr))
      document.getElementById('city').value = ' '
      
    })





// modal js


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems, options);
});

// Or with jQuery

// $(document).ready(function () {
//   $('.modal').modal();
// });


