let nwsGetGrid = new NWSGetGrid();
let nwsGetForecast = new NWSGetForecast();
let nwsGetHourlyForecast = new NWSGetHourlyForecast();
position = navigator.geolocation.getCurrentPosition(enterLocation);

function getWeather() {
    nwsGetGrid.request(getForecast);
}

function getForecast() {
    nwsGetForecast.gridId = nwsGetGrid.getGridId();
    nwsGetForecast.gridX = nwsGetGrid.getGridX();
    nwsGetForecast.gridY = nwsGetGrid.getGridY();
    nwsGetHourlyForecast.gridId = nwsGetGrid.getGridId();
    nwsGetHourlyForecast.gridX = nwsGetGrid.getGridX();
    nwsGetHourlyForecast.gridY = nwsGetGrid.getGridY();
    nwsGetHourlyForecast.request(displayHourlyWeather);
    nwsGetForecast.request(displayWeather);
}

function displayWeather() {
    let cond = document.getElementById("p");
    cond.innerHTML = nwsGetForecast.getCurrentCondition() 

    let highLow = nwsGetForecast.getTemperature();
    cond.innerHTML += "<br>" + highLow.high + "&deg F High, " + highLow.low + "&deg F Low";
    if (highLow.high > 80) {
        document.getElementById("body").style.backgroundColor = "rgb(255,153,153)";
    }

    let precip = nwsGetForecast.getPrecipitation();
    cond.innerHTML += `<br>${precip.chance}% chance of rain`;
    let message = '';
    switch (parseInt(precip.chance)) {
        case 0:
        case 10:
        case 20:
            message = "You probably don't need an umbrella.";
            break;
        case 30:
        case 40:
        case 50:
        case 60:
            message = "You might need an umbrella.";
            break;
        case 70:
        case 80:
        case 90:
        case 100:
            message = "You defenitely need an umbrella.";
            break;
    }
    cond.innerHTML += "<br>" + message;

    document.getElementById("header").innerHTML = "Weather in " + nwsGetGrid.getLocation() + ":";
}

function displayHourlyWeather() {
    let table = document.getElementById("table");

    let row = document.createElement("tr");
    let cell = document.createElement("th");
    cell.innerHTML = "Time";
    row.appendChild(cell);
    for (let i = 0; i < 10; i++) {
        cell = document.createElement("td");
        cell.innerHTML = nwsGetHourlyForecast.getTime(i);
        row.appendChild(cell);
    }
    table.appendChild(row);

    
    row = document.createElement("tr");
    cell = document.createElement("th");
    cell.innerHTML = "Temp";
    row.appendChild(cell);
    for (let i = 0; i < 10; i++) {
        cell = document.createElement("td");
        cell.innerHTML = nwsGetHourlyForecast.getTemperature(i);
        row.appendChild(cell);
    }
    table.appendChild(row);
}

function enterLocation(position) {
    nwsGetGrid.lat = position.coords.latitude;
    console.log(position.coords.latitude);
    nwsGetGrid.lon = position.coords.longitude;
    console.log(position.coords.longitude);
}