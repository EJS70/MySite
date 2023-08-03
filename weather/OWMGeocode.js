class OWMGeocode {
    constructor(APIKEY) {
        this.APIKEY = APIKEY;
        this.lat = 0;
        this.lon = 0;
        this.limit = 1;
    }

    request(callback) {
        var xhttp = new XMLHttpRequest();
        let self = this;

        xhttp.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                alert(`Payload bad (code ${this.status})`);
                return;
            }
            self.json = JSON.parse(this.responseText);
            if (callback !== undefined) {
                callback();
            }
        }

        let URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${this.lat}&lon=${this.lon}&limit=${this.limit}&appid=${this.APIKEY}`;
        xhttp.open("GET", URL, true);
        xhttp.send();
    }

    testRequest(num, callback) {
        let self = this;
        fetch(`./testjson/geocode${num}.json`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                self.json = data;
                callback();
            });
    }

    getLat() {
        return this.lat;
    }

    getLon() {
        return this.lon;
    }
}