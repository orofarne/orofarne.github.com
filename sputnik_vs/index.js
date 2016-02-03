if (!Object.values) { Object.values = function(obj) { return Object.keys(obj).map(function(key) { return obj[key]; }) }; }

var map = L.sm.map('map');

var hash = new L.Hash(map);

var sputnikLayer = null;
map.eachLayer(function(layer) {
	sputnikLayer = layer;
});

var rightLayers = {
	'OSM': L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
		}).addTo(map),

	'HOT': L.tileLayer('https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
			maxZoom: 20,
			subdomains: 'abc',
			attribution: '© <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors. Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
		}),

	'MapSurfer.net': L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
			attribution: 'Map data &copy; <a href=\'http://osm.org\'>OpenStreetMap</a> contributors, rendering <a href="http://giscience.uni-hd.de/" target="_blank">GIScience Research Group @ Heidelberg University</a>'
		}),

	'Rekod': L.tileLayer('http://basemap.rekod.ru/worldmap/{z}/{x}/{y}.png', {
			attribution: '&copy; Rekod'
		}),

	'Россреестр': L.tileLayer('http://{s}.maps.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/tile/{z}/{y}/{x}.png', {
			attribution: '&copy; Россреестр'
		})
};


var sbs = L.control.sideBySide(sputnikLayer, Object.values(rightLayers)).addTo(map);
var ls = L.control.layers(rightLayers).addTo(map);
