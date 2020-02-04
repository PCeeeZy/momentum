$(document).ready(function() {
    // const { endPoint, key } = require('../../keys').pixabay;

    const endPoint = "https://pixabay.com/api/";
    const key = "15098624-f10536bb38a206b99977e7cf8";
    const wHeight = $( window ).height() - 20;
    console.log(window);
    console.log(`-------------------------------------------`)
    console.log($(window))

    $(window).resize(function(event) {
        console.log('window is changed');

        $('#hero-container').height($( window ).height())
    })
    


    $.ajax({
        type: "GET",
        url: endPoint,
        data: {
            key,
            orientation: "horizontal",
            safesearch: "true"
        },
        success: function(data) {
            let randomNum = Math.floor(Math.random() * data.hits.length)
            console.log(data.hits[0])
            $('#hero-container').css('background-image', `url(${data.hits[Math.floor(Math.random() * data.hits.length)].largeImageURL})`).height($( window ).height() - 20);
        },
        error: function(err) {
            //handle error
        }
    })
})