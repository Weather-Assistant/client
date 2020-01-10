$( document ).ready( function () {
  getCountries()
  $('#submit-city').on('click', function( event ) {
    event.preventDefault();
    getWeather()
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
      console.log(err)
    })

}

function insertCountries(array){
  $('#country-list').append(`<option>Select Country</option>`)
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
      console.log(err)
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
      console.log(err)
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
    .done(({data}) => {
      console.log(data.current.weather)
    })
    .fail((err) => {
      console.log(err)
    }) 
}