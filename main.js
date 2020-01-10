$( document ).ready( function () {
    $('#searchButton').on('click', function (e) {
        e.preventDefault()
        getPixabay()
    })
})