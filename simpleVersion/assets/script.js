$(document).ready(function () {
    // settings stored as variable
    let storedSettings;
    let showSettings = false;
    // resize the background image to match window
    $(window).resize(function (event) {
        // console.log('window is changed');
        $('#hero-container').height($(window).height())
    })
    const getPixabay = () => {
        const key = "15098624-f10536bb38a206b99977e7cf8";
        $.ajax({
            type: "GET",
            url: "https://pixabay.com/api/",
            data: {
                key,
                orientation: "horizontal",
                safesearch: "true",
                editors_choice: "true"
            },
            success: function (data) {
                // let randomNum = Math.floor(Math.random() * data.hits.length)
                // console.log(data.hits[0])
                $('#hero-container').css('background-image', `url(${data.hits[Math.floor(Math.random() * data.hits.length)].largeImageURL})`).height($(window).height());
            },
            error: function (err) {
                //handle error
            }
        })
    }

    const getKanye = () => {
        $.ajax({
            type: "GET",
            url: "https://api.kanye.rest/",
            success: function (data) {
                console.log(`kanye`)
                console.log(data)
                $('.quote').text(`"${data.quote}" -- Kanye West`)
            },
            error: function (err) {
                //handle error
            }
        })
    };

    const getWeatherPermissions = () => {
        function getCurrentWeather(position) {
            console.log(`position`)
            console.log(position.coords)
            //lat 41.89644793196374
            //long -87.6187753738478
            let appid = "5ad2f4b510ffea17251bc6aa325a6cb8"
            
            $.ajax({
                method: "GET",
                url: `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`,
                data: {
                    appid,
                    units: "imperial"
                },
                success: function(data) {
                    console.log(`Weather`)
                    console.log(data)
                    console.log(data.weather[0].description); // weather description
                    console.log(data.weather[0].main); // single word weather descriptor
                    console.log(data.main.temp); // temperature xx..xx degrees F
                    console.log(data.name);  // city name
                    renderWeather(data.name, data.main.temp.toFixed(0), data.weather[0].main)
                },
                error: function(err) {
                    // handle err
                    console.log(err)
                }
            })
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getCurrentWeather);
        } else {
            
        }
    }
    const renderWeather = (city, temperature, descriptor) => {
        let icon  = $('<span>');
        switch (descriptor) {
            case "Clear":
                icon.attr('class', 'fas fa-sun fa-2x weather-icon vert-middle icon');
                break;
            case "Rain":
                icon.attr('class', 'fas fa-cloud-rain fa-2x weather-icon vert-middle icon');
                break;
            case "Snow":
                icon.attr('class', 'fas fa-snowflake fa-2x weather-icon vert-middle icon');
                break;
            case "Extreme":
                icon.attr('class', 'fas fa-exclamation-triangle weather-icon fa-2x vert-middle icon')
                break;
            case "Clouds":
                icon.attr('class', 'fas fa-cloud fa-2x weather-icon vert-middle icon');
                break;
        };
        $('.weather').empty();
        let container = $('<div>').attr('class', 'weather-container');
        let cityTemp = $('<div>').attr('class', 'city-temp vert-flex');
        let $temp = $('<div>').html(temperature + "&#176;").attr('class', 'vert-middle weather-temp');
        let $city = $('<div>').text(city).attr('class','weather-city vert-middle tiny-line-height');
        cityTemp.append($temp, $city);
        container.append(icon, cityTemp);
        $('.weather').append(container);

    }
    const setSettings = () => {
        localStorage.setItem("settings", JSON.stringify(storedSettings))
    }

    const checkLocal = () => {
        JSON.parse(localStorage.getItem("settings")) !== null ? storedSettings = JSON.parse(localStorage.getItem("settings")) : storedSettings = {
            name: "",
            colorPreference: "",
            unitPreference: "",
            recentLocations: [],
            recentFocus: [],
            daysToDos:{
            }
        }
        console.log(storedSettings);
        setSettings();
        startEverything();
    };

    const startEverything = () => {
        getPixabay();
        getKanye();
        getWeatherPermissions();
    };

    const changeSettings = () => {
        console.log('ive been clicked')
        if (showSettings) {
            $('.settings-box').hide()
            showSettings = false;
        } else {
            $('.settings-box').show()
            showSettings = true;
        }
    }

    checkLocal();

    $('.settings').on('click', changeSettings);
})