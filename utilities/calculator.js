const places = {
    science: {
        latitude: 24.5820909,
        longitude: 90.3776124
    },
    sociology: {
        latitude: 24.5821173,
        longitude: 90.3776532
    },
    second: {
        latitude: 24.5821173,
        longitude: 90.3776532
    }
}

const calculator = (lat2, lon2) => {
    let lat1 = places.second.latitude;
    let lon1 = places.second.longitude;

    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = (Math.pow(Math.sin(dlat / 2), 2)) + (Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2));

    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;

    return (c * r)*1000;
}

module.exports = calculator;