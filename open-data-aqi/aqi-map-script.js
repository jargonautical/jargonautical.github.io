mapboxgl.accessToken = 'pk.eyJ1IjoiamFyZ29uYXV0IiwiYSI6ImNrZWUybmR5ZjBicWMyc295NTR4N3I4OWIifQ.scaKTg7g6zt8i9_zk8NjWg';
Plotly.setPlotConfig({
  mapboxAccessToken: "pk.eyJ1IjoiamFyZ29uYXV0IiwiYSI6ImNrZWUybmR5ZjBicWMyc295NTR4N3I4OWIifQ.scaKTg7g6zt8i9_zk8NjWg"
});

// cities data from osm - read and store
var osm = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "../data/osm-cities.json",
    'dataType': "json",
    'success': function(data) {
      json = data;
    }
  });

  return json.elements;
})();

// aqi data from open api openaq.org
var aqi = (function() {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    url: "https://api.openaq.org/v1/cities?country=GB",
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
  // access the `key` variable and `item` variable
  city = item.city;
  count = item.count;
  var osmCity = Object.keys(osm);
  osmCity.forEach(function(key) {
    var cityItem = osm[key];
    //console.log(cityItem);
    cityInfo = cityItem.tags;
    cityLat = cityItem.lat;
    cityLon = cityItem.lon;
    if (cityInfo && cityItem.type === "node" && cityInfo.name != "City of London" && cityInfo.name != "London") {
      if (cityInfo.name == city) {
        //console.log(cityInfo.name, city, cityLat, cityLon);
        result = {
          "osmName": cityInfo.name,
          "aqiName": city,
          "aqiCount": count,
          "lat": cityLat,
          "lon": cityLon
        };
        mapData.push(result);
      } else {
        return;
      }
    } else {
      return;
    }
  })
});

  function getFields(input, field) {
    var output = [];
    for (var i=0; i < input.length ; ++i)
        output.push(input[i][field]);
    return output;
  }

  var allLat = getFields(mapData, "lat"); // returns [ 1, 3, 5 ]
  var allLon = getFields(mapData, "lon");
  var allCount = getFields(mapData, "aqiCount");
  var allCity = getFields(mapData, "osmName");
  // normalising function
  /*
  var numbers = allCount,
    ratio = Math.max.apply(Math, numbers) / 100,
    l = numbers.length, i;
    for (i = 0; i < l; i++) {
      numbers[i] = Math.round(numbers[i] / ratio);
    }
    */

  var map_data = [{
    type:'scattermapbox',
    lat:allLat,
    lon:allLon,
    mode:'markers',
    marker: {
        opacity: 0.75,
        size: 15,
        color: allCount,
        //cmin: 0,
        //cmax: 200000000,
        colorscale: 'Viridis',
        colorbar: {
            //title: 'Some rate',
            //ticksuffix: '%',
            showticksuffix: 'last'
        },
        line: {
            color: 'black',
            width: 5,
        },
    //marker: {
      //size:allCount,
      //sizemode: 'area',
      //sizemax: 10,
      //sizemin: 4,
      //sizeref: 200000
    },
    customdata:allCity,
    hovertemplate: 'City: %{customdata}<br><extra></extra>',
  }]

var layout = {
	 title: 'AQM Locations',
   geo: {
        scope: 'europe',
        resolution: 50,
        projection: 'airy',
    },
   hovermode:'closest',
   text:allCity,
	 font: {color: 'black'},
    dragmode: 'zoom',
    mapbox: {
      center: {lat: 53.3755,lon: -4.1427},
      domain: {x: [0, 1],y: [0, 1]},
      style: 'stamen-watercolor',
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
