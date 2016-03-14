var map1 = L.sm.map('map1');
var map2 = L.sm.map('map2');

map1.setView([55.71492794801968, 37.223052978515625], 12);
map2.setView([55.72358152360602, 36.95251464843749], 14);

var markerLL = [55.72663278117177, 36.96718633174896]; 
L.sm.marker(markerLL).addTo(map1);
L.sm.marker(markerLL).addTo(map2);