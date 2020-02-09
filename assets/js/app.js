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
            ${Results[i].Model_Name}
            <a href="#!" class="secondary-content">
             <i class="material-icons car-details" data-value="${Results[i].Model_Name}">add_circle_outline</i>
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
  setTimeout(_ => { document.getElementById('car-details').innerHTML = ' ' }, 300)
  document.getElementById('my-car').innerHTML = ' '
  for (let i = 0; i < carDetailsArr.length; i++) {
    let myCarDiv = document.createElement('div')
    myCarDiv.innerHTML = `
    <li class="collection-item">
      <div>
        ${carDetailsArr[i].car_model}
        <a href="#!" class="secondary-content">
         <i class="material-icons remove-car" data-value="${i}">remove_circle</i>
        </a>
      </div>
    </li>
    `
    document.getElementById('my-car').append(myCarDiv)
  }
}

// Removes Saved Cars
const removeMyCar = index => {
  carDetailsArr.splice(index, 1)
  localStorage.setItem('carDetailsArr', JSON.stringify(carDetailsArr))
}

// Button to add/remove my Car
document.addEventListener('click', event => {
  if (event.target.classList.contains('car-details')) {
    carDetailsArr.push({
      car_model: event.target.dataset.value
    })
    document.getElementById('my-car').innerHTML = ' '
    localStorage.setItem('carDetailsArr', JSON.stringify(carDetailsArr))
    renderMyCar()
  } else if (event.target.classList.contains('remove-car')) {
    removeMyCar(event.target.dataset.value)
    document.getElementById('my-car').innerHTML = ' '
    renderMyCar()
  }
})
renderMyCar()

// Shows Car Details
document.getElementById('car-details-btn').addEventListener('click', _ => {
  renderCarDetails()
})

// Quote API
let savedQuotes = JSON.parse(localStorage.getItem('savedQuote')) || []

const renderChosenQuote = event => {
  fetch(`https://favqs.com/api/qotd`)
  .then ( r => r.json())
  .then (({ quote }) => {
    let genQuote = document.createElement('div')
    genQuote.innerHTML = `
      <i class="material-icons circle"></i>
      <p>${quote.body} <br>
      -${quote.author}
      </p>
    `
    document.getElementById('ran-quote-result').append(genQuote)
  })
}

const saveFavQuoteDiv = _ => {
  let favQuoteDiv = document.createElement('div')
 favQuoteDiv.id = 'fav-quote-div'
  document.getElementById('saved-quotes').append(favQuoteDiv)
}

fetch('https://favqs.com/api/qotd')
.then (r => r.json())
.then (({ quote }) => {
  document.getElementById('quote').textContent = `"${quote.body}"`
  document.getElementById('author').textContent = `-${quote.author}`
})
    // Quote Btn
document.getElementById('ran-quote').addEventListener('click', _ => {
  document.getElementById('ran-quote-result').innerHTML = ' '
  renderChosenQuote()
})


// Weather Api call
// localStorage.clear()
let city = JSON.parse(localStorage.getItem('city')) || ''

const makeAJAX = () => {

  const URL_BASE = 'https://api.weatherapi.com/v1/forecast.json';
  const KEY_PARAMETER = 'key=ea4d3d5c304c48499f2204108200502';
  const DAY_COUNT_PARAMETER = 'days=5'
  let queryURL = URL_BASE + '?' + '&' + KEY_PARAMETER + '&' + DAY_COUNT_PARAMETER;

  let cityParameter = 'q=' + city;
  queryURL += '&' + cityParameter;

  console.log(queryURL);

  fetch(queryURL)
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
              <h6>${weather.current.condition.text}</h6>
              <img src="https:${weather.current.condition.icon}">
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
        document.getElementById('displayWeather').append(weatherElem)
      }
    });
}

document.getElementById('searchCity').addEventListener('click', event => {
  localStorage.clear();
  let searchTerm = document.getElementById('city').value;
  document.getElementById('city').value = ''
  localStorage.setItem('city', JSON.stringify(searchTerm));
  city = JSON.parse(localStorage.getItem('city'))
  document.getElementById('displayWeather').innerHTML = ``

    document.getElementById('destroy').addEventListener('click', _ => {
      let confirmDel = confirm('Are you sure you want to delete everything?')
      if (confirmDel === true) {
        document.getElementById('body').innerHTML = ' '
      }
    })

  if (city) makeAJAX();
})


localStorage.clear();

if (city) makeAJAX();

// RickRoll/Bitcoin Btn
document.getElementById('free-bitcoin').addEventListener('click', () => {
  let randNum
  fetch('https://qrng.anu.edu.au/API/jsonI.php?length=1&type=uint16')
    .then(r => r.json())
    .then(res => {
      randNum = res.data[0]
      document.getElementById('congrats-free-bitcoin-display').textContent = 
        `Congrats! You received ${randNum} bitcoin(s)! Check your bank account ;)`
    })
})

// Delete Website Btn
document.getElementById('destroy').addEventListener('click', _ => {
  let destroyConfirm = confirm('Are you sure you want to delete the website?')
  if (destroyConfirm === true) {
    document.getElementById('body').innerHTML = ` `
  }
 })