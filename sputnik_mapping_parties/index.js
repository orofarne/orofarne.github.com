var pointToLayer = function(featureData, latlng) {
	var myIcon = L.divIcon({
		iconSize: [0,0],
		iconAnchor: [32, 64],
		className: 'mp-marker-div-icon',
		html: L.Util.template('<div class="mp-marker-icon"></div><div class=mp-marker-date><span>{date}<span></div>', featureData.properties)
	});

	return L.marker(latlng, {icon: myIcon});
};

var clusterToIcon = function(cluser) {
	return L.icon({
		iconUrl: 'img/flag_group.png',
		iconSize: [96, 66],
		iconAnchor: [48, 66]
	});
};

var map = L.sm.map('map');

var cluster = L.sm.cluster({
	maxClusterRadius: 125,
	iconCreateFunction: clusterToIcon
});

L.sm.geoJson(_data, {
	pointToLayer: pointToLayer
}).addTo(cluster);

cluster.addTo(map);
map.fitBounds(cluster.getBounds());
