class NWSGetGrid {
    constructor () {
        this.lat = 42.2959;
        this.lon = -71.7129;
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
        let URL = `https://api.weather.gov/points/${this.lat},${this.lon}`;
        xhttp.open("GET", URL, true);
        xhttp.send();
    }

    getGridId() {
        return this.json.properties.gridId;
    }

    getGridX() {
        return this.json.properties.gridX;
    }

    getGridY() {
        return this.json.properties.gridY;
    }

    getLocation() {
        return `${this.json.properties.relativeLocation.properties.city}, ${this.json.properties.relativeLocation.properties.state}`;
    }
}
