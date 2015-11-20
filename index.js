L.sm.apiKey = 'demo@gisconf';
var map = L.sm.map('map1');
map.setView([55.79694192712681,37.53780484199524], 16);

var drawOverpass = function(map, req, options) {
	var overpassUrl = 'http://overpass-api.de/api/interpreter';
	var bounds = map.getBounds();
	var bbox = bounds.getSouth() + ',' + bounds.getWest()  + ',' + bounds.getNorth() + ',' + bounds.getEast();
	var reqData = L.Util.template(req, {bbox: bbox});
	$.ajax({
		method: 'POST',
		url: overpassUrl,
		data: {data: reqData}
		})
		.done(function(xmlData) {
			var data = osmtogeojson(xmlData);
			L.sm.geoJson(data, options).addTo(map);
		})
		.fail(function() {
			alert('ERROR');
		});
};

var button = new L.sm.Button('!');
button.addTo(map);
button.on('click', function () {
	var req0 = '[out:xml][timeout:25]; ( way["building"]["height"]({bbox}); relation["building"]["height"]({bbox}); ); out body; >; out skel qt;';
	var opts0 = {style: {
		"color": "#0000CC",
		"weight": 2,
		"fill-opacity": 0.6,
		"opacity": 0.6,
	}};
	drawOverpass(map, req0, opts0);

	var req1 = '[out:xml][timeout:25]; ( way["building"]["building:levels"]({bbox}); relation["building"]["building:levels"]({bbox}); ); out body; >; out skel qt;';
	var opts1 = {style: {
		"color": "#00CC00",
		"weight": 2,
		"fill-opacity": 0.3,
		"opacity": 0.6,
	}};
	drawOverpass(map, req1, opts1);

	var req2 = '[out:xml][timeout:25]; ( way["building"]["building:levels"!~"."]["height"!~"."]({bbox}); relation["building"]["building:levels"!~"."]["height"!~"."]({bbox}); ); out body; >; out skel qt;';
	var opts2 = {style: {
		"color": "#CC0000",
		"weight": 2,
		"fill-opacity": 0.3,
		"opacity": 0.6,
	}};
	drawOverpass(map, req2, opts2);
});
