function getPixabay () {
    $.ajax({
        method:'post',
        url:'http://localhost:3000/pixabay',
        data:{
            keyword:$('#search').val()
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
        $('#search').val('')
    } )
    .fail( (xhr, textStatus, errorThrown) => {
        var err = eval("(" + xhr.responseText + ")");
        Swal.fire({
            icon:'error',
            title:err.Message,
            showConfirmButton: false,
            timer: 1500
        })
        $('#search').val('')
    })
}