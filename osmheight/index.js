L.sm.apiKey = 'demo@gisconf';
var map = L.sm.map('map1');
map.setView([55.702935467932335,37.53076672554016], 16);

var hash = new L.Hash(map);

var drawOverpass = function(map, req, options) {
	var overpassUrl = '//overpass-api.de/api/interpreter';
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
	map.eachLayer(function (layer) {
		if (layer instanceof L.FeatureGroup) {
			map.removeLayer(layer);
		}
	});

	var req0 = '[out:xml][timeout:25]; ( way["building"]["height"]["building:levels"!~"."]({bbox}); relation["building"]["height"]["building:levels"!~"."]({bbox}); ); out body; >; out skel qt;';
	var opts0 = {
		style: {
			"color": "#0000CC",
			"weight": 2,
			"fill-opacity": 0.6,
			"opacity": 1,
		},
		popupTemplate: "{?tags.addr:street}<br/>{?tags.addr:housenumber}<br/>Height: {tags.height}"
	};
	drawOverpass(map, req0, opts0);

	var req1 = '[out:xml][timeout:25]; ( way["building"]["building:levels"]["height"!~"."]({bbox}); relation["building"]["building:levels"]["height"!~"."]({bbox}); ); out body; >; out skel qt;';
	var opts1 = {
		style: {
			"color": "#77CC00",
			"weight": 2,
			"fill-opacity": 0.6,
			"opacity": 1,
		},
		popupTemplate: "{?tags.addr:street}<br/>{?tags.addr:housenumber}<br/>Levels: {tags.building:levels}"
	};
	drawOverpass(map, req1, opts1);

	var req2 = '[out:xml][timeout:25]; ( way["building"]["building:levels"]["height"]({bbox}); relation["building"]["building:levels"]["height"]({bbox}); ); out body; >; out skel qt;';
	var opts2 = {
		style: {
			"color": "#00CC00",
			"weight": 2,
			"fill-opacity": 0.6,
			"opacity": 1,
		},
		popupTemplate: "{?tags.addr:street}<br/>{?tags.addr:housenumber}<br/>Height: {tags.height}, levels: {tags.building:levels}"
	};
	drawOverpass(map, req2, opts2);

	var req3 = '[out:xml][timeout:25]; ( way["building"]["building:levels"!~"."]["height"!~"."]({bbox}); relation["building"]["building:levels"!~"."]["height"!~"."]({bbox}); ); out body; >; out skel qt;';
	var opts3 = {
		style: {
			"color": "#CC0000",
			"weight": 2,
			"fill-opacity": 0.6,
			"opacity": 1,
		},
		popupTemplate: "{?tags.addr:street}<br/>{?tags.addr:housenumber}"
	};
	drawOverpass(map, req3, opts3);
});

var search = new L.Control.Search();
search.addTo(map);
