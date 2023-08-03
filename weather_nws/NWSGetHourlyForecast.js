class NWSGetHourlyForecast {
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
        let URL = `https://api.weather.gov/gridpoints/${this.gridId}/${this.gridX},${this.gridY}/forecast/hourly`;
        xhttp.open("GET", URL, true);
        xhttp.send();
    }

    getCurrentCondition(i) {
        return this.json.properties.periods[i].shortForecast;
    }

    getTemperature(i) {
        return this.json.properties.periods[i].temperature;
    }

    getTime(i) {
        let time = this.json.properties.periods[i].startTime;
        let intTime = parseInt(time.substring(11, 13));
        if (intTime == 23) return "12 AM";
        if (intTime < 12) return intTime + 1 + " AM";
        if (intTime == 11) return "12 PM";
        return (intTime - 11) + " PM";
    } 
}

