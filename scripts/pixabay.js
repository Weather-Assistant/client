function getPixabay () {
    let city = $('#state-list').val()
    $.ajax({
        method:'post',
        url:'http://localhost:3000/pixabay',
        data:{
            keyword:city
        }
    })
    .done( result => {
        Swal.fire({
            icon:'success',
            showConfirmButton: false,
            timer: 2000
        })
        $('#pixabay').empty()
        $('#pixabay').append(`
            <img src="${result.picUrl}" style="max-width:100%;"></img>
        `)
    } )
    .fail( (xhr, textStatus, errorThrown) => {
        var err = eval("(" + xhr.responseText + ")");
        Swal.fire({
            icon:'error',
            title:'error sini',
            showConfirmButton: false,
            timer: 1500
        })
        $('#search').val('')
    })
}