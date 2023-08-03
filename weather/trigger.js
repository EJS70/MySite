const testnum = document.getElementById("testnum");
let locError = false;

///////////////////////////////////////////////////////////////
// LOCATION - translate from city, state, country to lat/lon //
///////////////////////////////////////////////////////////////

function getLocation() {
    setupLocation();
    setTimeout(function () {
    owmGeocode.request(displayLocation);
    }, 1000);
}

function setupLocation() {
    position = navigator.geolocation.getCurrentPosition(enterLocation);
}

function enterLocation(position) {
    owmGeocode.lat = position.coords.latitude;
    console.log(position.coords.latitude);
    owmGeocode.lon = position.coords.longitude;
    console.log(position.coords.longitude);
}

function testLocation() {
    owmGeocode.testRequest(testnum.value, displayLocation);
}

///////////////////////////////////////////////////////////////
// WEATHER - the current weather conditions                  //
///////////////////////////////////////////////////////////////

function getWeather() {
    owmWeather.lat = owmGeocode.getLat();
    owmWeather.lon = owmGeocode.getLon();

    owmWeather.request(displayWeather);
}

function testWeather() {
    owmWeather.testRequest(testnum.value, displayWeather);
}

///////////////////////////////////////////////////////////////
// FORECAST                                                  //
///////////////////////////////////////////////////////////////

function getForecast() {
    owmForecast.lat = owmGeocode.getLat();
    owmForecast.lon = owmGeocode.getLon();

    owmForecast.request(displayForecast);
}

function testForecast() {
    owmForecast.testRequest(testnum.value, displayForecast);
}

///////////////////////////////////////////////////////////////
// POLLUTION - the air quality index (AQI) and contaminants  //
///////////////////////////////////////////////////////////////

function getPollution() {
    owmPollution.lat = owmGeocode.getLat();
    owmPollution.lon = owmGeocode.getLon();

    owmPollution.request(displayPollution);
}

function testPollution() {
    owmPollution.testRequest(testnum.value, displayPollution);
}

function loadAll() {
	locError = false;
    getLocation();
    setTimeout(function () {
		if (!locError) {
        getWeather(); 
        setTimeout(function () {
            getForecast();
            getPollution(); 
        }, 200);
		}
    },  5000);
}