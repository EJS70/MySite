class NWSGetForecast {
    constructor () {
        this.gridId = null;
        this.gridX = null;
        this.gridY = null;
    }

    request(callback) {
        var xhttp = new XMLHttpRequest();
        let self = this;

        xhttp.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                alert(`payload bad: code ${this.status}`);
                return;
            }
            self.json = JSON.parse(this.responseText);
            if (callback !== undefined) {
                callback();
            }
        }
        let URL = `https://api.weather.gov/gridpoints/${this.gridId}/${this.gridX},${this.gridY}/forecast`;
        xhttp.open("GET", URL, true);
        xhttp.send();
    }

    getCurrentCondition() {
        return this.json.properties.periods[0].shortForecast;
    }

    getTemperature() {
        let output = {low : null, high : null};

        let isDay = this.json.properties.periods[0].isDaytime;
        if (isDay) {
            output.high = this.json.properties.periods[0].temperature;
            output.low = this.json.properties.periods[1].temperature;
        } else {
            output.low = this.json.properties.periods[0].temperature;
            output.high = this.json.properties.periods[1].temperature;
        }

        return output;
    }

    getPrecipitation() {
        let output = {};

        output.chance = this.json.properties.periods[0].probabilityOfPrecipitation.value;
        if (output.chance == null) {
            output.chance = 0;
        }

        return output;
    }
}

