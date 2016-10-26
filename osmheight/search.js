L.Control.Search = L.Control.extend({
    options: {
        position: 'topright',
    },
    onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div');
        var form = L.DomUtil.create('form', 'search-form', controlDiv);
        form.innerHTML = '<input type="edit" name="q" /><input type="submit"/>';
        form.addEventListener("submit", searchForm);
        return controlDiv;
    }
});

var searchForm = function(e) {
  e.stopPropagation();
  e.preventDefault();

  var q = $(this).find('[name=q]').val();
  var center = map.getCenter();
  var searchUrl = '//maps-search.apissputnik.ru/search'
    + '?q=' + encodeURIComponent(q)
    + '?vlat=' + center.lat
    + '?vlon=' + center.lon
    + '?callback=callback'
    + '&apikey=demo@gisconf';
  $.ajax({
    url: searchUrl,
    dataType: "jsonp",
    jsonp: "callback",
    success: function(data){
      if (data.result && data.result.length > 0) {
        var elem = data.result[0];
        map.setView(elem.position);
      }
    }
  });
};
