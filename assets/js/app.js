document.addEventListener('DOMContentLoaded', () => {
  let elems = document.querySelectorAll('.dropdown-trigger')
  let instances = M.Dropdown.init(elems)
})

const pushRadiusToRadiusArray = (rad) => {
  let arr = JSON.parse(localStorage.getItem('radius')) || []
  console.log(arr)
  arr.push(rad)
  localStorage.setItem('radius', JSON.stringify(arr))
}

document.getElementById('m-five').addEventListener('click', () => {
  pushRadiusToRadiusArray(5)
})

document.getElementById('m-ten').addEventListener('click', () => {
  pushRadiusToRadiusArray(10)
})

document.getElementById('m-twentyfive').addEventListener('click', () => {
  pushRadiusToRadiusArray(25)
})

document.getElementById('m-fifty').addEventListener('click', () => {
  pushRadiusToRadiusArray(50)
})
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
let listInfo = ''

document.getElementById('searchCity').addEventListener('click', event => {
  event.preventDefault()
  fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${document.getElementById('city').value},US&units=imperial&APPID=36728452c2aa87127fe604b265bdaef9`)
    .then(r => r.json())
    .then(({ list }) => {
      for (var i = 0; i < 5; i++){
       let listInfo = list[i]
        let weatherElem = document.createElement('div')
        weatherElem.innerHTML = `
        <div class="section">
        <div class="row">
        <div class="card light-blue lighten-5 z-depth-2 col m-2">
          <div class="row"> Date: ${listInfo.dt_txt} </div>
          <div class="row">Temperature: ${listInfo.main.temp}</div>
          <div class="row">Low: ${listInfo.main.temp_min}</div>
          <div class="row">High: ${listInfo.main.temp_max}</div>
          <div class="row">Humidity: ${listInfo.main.humidity}</div>
          <div class="row">Wind speed: ${listInfo.wind.speed}</div>
          <img src=${listInfo.weather[0].icon}></img>
          <div class="row"> ${listInfo.weather[0].description}</div>
        </div>
        </div>
        `
        document.getElementById('displayWeather').append(weatherElem)
        
        
        
        console.log(listInfo)
      
      }
     
    })
  })


