$( document ).ready( function () {
    if(localStorage.getItem('token')) {
        getCountries()
    }

    $('#searchButton').on('click', function (e) {
        e.preventDefault()
        getPixabay()
    })
})