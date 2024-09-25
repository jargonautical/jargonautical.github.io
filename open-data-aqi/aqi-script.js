// aqi data from open api openaq.org
var apikey = "1dc0ea5648bffcc7f6b7565dae1e90536405fec1d7879c9ce44d637e0355dec1";
var headers = '{"X-API-Key": apikey, "Access-Control-Allow-Headers": "x-requested-with"}';
var aqi = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'headers': headers,
     url: "https://api.openaq.org/v1/measurements?country=GB&parameter=pm25",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });
  return json.results;
})();

var mapData = [];
var keys = Object.keys(aqi);
keys.forEach(function(key) {
  var item = aqi[key];
  city = item.city;
  loc = item.location;
  param = item.value;
  lat = item.coordinates.latitude;
  lon = item.coordinates.longitude;
  console.log(city, param, lat, lon);
  result = {
    "city": city,
    "location": loc,
    "param": param,
    "lat": lat,
    "lon": lon
  };
  mapData.push(result);
});

  function getFields(input, field) {
    var output = [];
    for (var i=0; i < input.length ; ++i)
        output.push(input[i][field]);
    return output;
  }

  var allLat = getFields(mapData, "lat");
  var allLon = getFields(mapData, "lon");
  var vals = getFields(mapData, "param");
  var allCity = getFields(mapData, "city");
  var locations = getFields(mapData, "location");

  var map_data = [{
    type:'scattermapbox',
    lat:allLat,
    lon:allLon,
    mode:'markers',
    marker: {
        opacity: 0.75,
        color: 'rgb(178,34,34)', // firebrick
        size: vals,
        sizemode: 'area',
        sizemax: 15,
        sizemin: 0,
        sizeref: 0.1,
    },
    customdata:locations,
    hovertemplate: 'Location: %{customdata}<br><extra></extra>',
  }]

var layout = {
	 title: 'Air quality measurements - PM2.5',
   height: 500,
   hovermode:'closest',
	 font: {color: 'black'},
    dragmode: 'zoom',
    mapbox: {
      center: {lat: 53.3755,lon: -4.1427},
      domain: {x: [0, 1],y: [0, 1]},
      //style: 'stamen-terrain',
      style: 'open-street-map',
      zoom: 4
    },
    margin: {r: 10,t: 50,b: 20,l: 20,pad: 0},
    paper_bgcolor: 'white',
    showlegend: false,
	 annotations: [{x: 0,y: 0, xref: 'paper',yref: 'paper',
		 text: 'Source: <a href="" style="color: rgb(0,0,0)">Open Air Quality API at https://api.openaq.org</a>',
		 showarrow: false
   }]
  };

  Plotly.newPlot('root', map_data, layout);
