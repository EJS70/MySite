const APIKEY = "015a49e1ee86b6c2d96c402a9c4dcfa7";
let units = "imperial";
let units_temp = `&deg;F`;
let units_humid = `%`;
let units_speed = "mph";

let owmGeocode = new OWMGeocode(APIKEY);
let owmWeather = new OWMWeather(APIKEY, units);
let owmForecast = new OWMForecast(APIKEY, units);
let owmPollution = new OWMPollution(APIKEY);

///////////////////////////////////////////////////////////////
// LOCATION - translate from city, state, country to lat/lon //
///////////////////////////////////////////////////////////////

function displayLocation() {
    const loc = document.getElementById("location");
	if (owmGeocode.lon == 0) {
		locError = true;
		loc.innerHTML = `Location Error`;
		let button = document.createElement("button");
		button.innerHTML = "Try Again";
		button.setAttribute("onclick", "loadAll()");
		loc.append(button);
		return;
	}
    loc.innerHTML = `${owmGeocode.json[0].name}`;
    if (owmGeocode.json[0].hasOwnProperty("state")) {
        loc.innerHTML += `, ${owmGeocode.json[0].state}`;
    }
    loc.innerHTML += `, ${owmGeocode.json[0].country}`;
}

///////////////////////////////////////////////////////////////
// WEATHER - the current weather conditions                  //
///////////////////////////////////////////////////////////////

function displayWeather() {
    const weatherReport = document.getElementById("weather-report");

    // Weather Condition Strings
    let cond = owmWeather.json.weather[0].main;
    cond = cond.toLowerCase();
    let condLong = owmWeather.json.weather[0].description;
    condLong = condLong.toLowerCase();
    let condReport = `The current weather condition is ${condLong}.`;

    // Temperature and Feels-Like
    let temp = owmWeather.json.main.temp;
    let tempFeel = owmWeather.json.main.feels_like;
    temp = temp.toFixed(1);
    tempFeel = tempFeel.toFixed(1);
    let tempReport = `The temperature is ${temp}${units_temp} and it feels like ${tempFeel}${units_temp}.`;

    // See https://openweathermap.org/weather-conditions
    let img = `<img src="https://openweathermap.org/img/wn/${owmWeather.json.weather[0].icon}@4x.png">`;

    weatherReport.innerHTML = `${condReport}<br>${tempReport}<br>${img}`;
}

///////////////////////////////////////////////////////////////
// FORECAST                                                  //
///////////////////////////////////////////////////////////////

// See https://openweathermap.org/forecast5#5days

function displayForecast() {
    var table = document.getElementById('forecast-table');
    table.innerHTML = '';

    const headerColText = ["Time", "Temperature", "Condition", "Humidity", "Icon"];
    var header = document.createElement('tr');
    for (var j = 0; j < 5; j++) { // number of columns
        var cell = document.createElement('th');
        cell.textContent = headerColText[j];
        header.appendChild(cell);
    }
    table.appendChild(header);

    // Add the current weather if available
    if (owmWeather.json !== undefined) {
        var row = createRow(owmWeather.json);
        table.appendChild(row);
    }

    for (let i = 0; i < 5; i++) { // up to 40
        var row = createRow(owmForecast.json.list[i]);
        table.appendChild(row);
    }
}

function createRow(json) {
    var row = document.createElement('tr');
    var cell;

    cell = document.createElement('td');
    cell.innerHTML = owmForecast.convertTimecode(json.dt);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = `${json.main.temp.toFixed(1)}${units_temp}`;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = json.weather[0].main;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = `${json.main.humidity}${units_humid}`;
    row.appendChild(cell);

    cell = document.createElement('td');
    // Change end to "@2x.png" for larger images
    // See https://openweathermap.org/weather-conditions
    cell.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}.png">`;
    row.appendChild(cell);

    return row;
}

///////////////////////////////////////////////////////////////
// POLLUTION - the air quality index (AQI) and contaminants  //
///////////////////////////////////////////////////////////////

function displayPollution() {
    let aqr = document.getElementById("aqr");
    
    let aqi = owmPollution.getAQI();

    let caseText = "";

    switch (aqi) {
        case 1:
            caseText = "The air quality is good, there are very few pollutants in your area.";
            break;
        case 2:
            caseText = "The air quality is fair, almost everyone will notice no pollution.";
            break;
        case 3:
            caseText = "The air quality is moderate, and is unhealthy for sensitive groups.";
            break;
        case 4: 
            caseText = "The air quality is poor, wearing a mask outside is reccomended.";
            break;
        case 5:
            caseText = "The air quality is very poor, people should remain indoors for their safety."
            break;
    }

    aqr.innerHTML = `Air Quality Index: ${aqi} <br>${caseText}`;
}
