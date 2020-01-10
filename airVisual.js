$( document ).ready( function () {
  
  $('#submit-city').on('click', function( event ) {
    event.preventDefault();
    getWeather()
    getPixabay()
  })
})


function getCountries(){
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/airvisual/country'
  })
    .done(({data}) => {
      insertCountries(data)
    })
    .fail((err) => {
      Swal.fire({
            icon:'error',
            title:'Cannot get countries',
            showConfirmButton: false,
            timer: 1500
        })
    })

}

function insertCountries(array){
  let countryList = ''
  array.forEach((el) => {
    countryList += `<option value="${el.country}">${el.country}</option>`
  })
  $('#country-list').append(countryList)
}

function getState(country){
  $.ajax({
    method: 'get',
    url: `http://localhost:3000/airvisual/${country}/state`
  })
    .done(({data}) => {
      insertState(data)
      insertCity()
    })
    .fail((err) => {
      Swal.fire({
            icon:'error',
            title:'Cannot get states',
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function insertState(array){
  $('#state-list').empty()
  $('#state-list').append(`<option>Select State</option>`)
  let stateList = ''
  array.forEach((el) => {
    stateList += `<option value="${el.state}">${el.state}</option>`
  })
  $('#state-list').append(stateList)
}

function getCity(state){
  let country = $('#country-list').val()
  $.ajax({
    method: 'get',
    url: `http://localhost:3000/airvisual/${country}/${state}/city`
  })
    .done(({data}) => {
      insertCity(data)
    })
    .fail((err) => {
      Swal.fire({
            icon:'error',
            title:'Cannot get cities',
            showConfirmButton: false,
            timer: 1500
        })
    })
}

function insertCity(array){
  $('#city-list').empty()
  $('#city-list').append(`<option>Select City</option>`)
  if (!array) return
  let cityList = ''
  array.forEach((el) => {
    cityList += `<option value="${el.city}">${el.city}</option>`
  })
  $('#city-list').append(cityList)
}

function getWeather(){
  let country = $('#country-list').val()
  let state = $('#state-list').val()
  let city = $('#city-list').val()
  $.ajax({
    method: 'get',
    url: `http://localhost:3000/airvisual/${country}/${state}/${city}`
  })
    .done((data) => {
      showWeather(data)
    })
    .fail((err) => {
      Swal.fire({
            icon:'error',
            title:'Cannot get weather',
            showConfirmButton: false,
            timer: 1500
        })
    }) 
}

function showWeather(data){ 
  $('#air-visual').empty()
  $('#air-visual').append(`
    <img src="https://www.airvisual.com/images/${data.weather}.png" class="mx-auto" style="max-width:100%;"></img>
    <div>${data.description}</div>
  `)
}