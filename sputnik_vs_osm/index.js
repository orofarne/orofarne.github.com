var map = L.sm.map('map');

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
}).addTo(map);

var layers = [];
map.eachLayer(function (layer) {
    layers.push(layer);
});

console.log(layers);

L.control.sideBySide(layers[0], layers[1]).addTo(map);
