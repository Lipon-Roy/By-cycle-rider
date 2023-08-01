const places = {
    science: {
        lat: 24.5820909,
        lon: 90.3776124
    },
    bba: {
        lat: 24.5821173,
        lon: 90.3776532
    },
    second: {
        lat: 24.5821173,
        lon: 90.3776532
    },
    second: {
        lat: 24.5821173,
        lon: 90.3776532
    }
}

const calculator = (lat2, lon2) => {

    for (let place in places) {
        let lat1 = places[place].lat;
        let lon1 = places[place].lon;

        lon1 = lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;

        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = (Math.pow(Math.sin(dlat / 2), 2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2));

        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 6371;

        if ((c * r) * 1000 <= 2) {
            return place;
        } 
    }
    return 'undefined';
}

module.exports = calculator;