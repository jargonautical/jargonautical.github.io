function makemap() {
  Plotly.d3.csv('https://raw.githubusercontent.com/jargonautical/new-park-app/master/map_data.csv', function(err, rows){

    var classArray = unpack(rows, 'class');
    var classes = [...new Set(classArray)];

    function unpack(rows, key) {
      return rows.map(function(row) { return row[key]; });
    }
    var map_data = classes.map(function(classes) {
      var rowsFiltered = rows.filter(function(row) {
          return (row.class === classes);
      });
      return {
         type: 'scattermapbox',
         name: classes,
         lat: unpack(rowsFiltered, 'latitude'),
         lon: unpack(rowsFiltered, 'longitude'),
         text: unpack(rowsFiltered, 'CounterID'),
         marker: {
           color: 'green',
           opacity: 0.8,
           size: unpack(rowsFiltered, 'triggers'),
           sizemode: 'area',
           sizeref: 220,
           sizemax: 10,
         },
         hovertemplate:
              "<i>id</i>: %{text}</br>" +
              "<i>lat</i>: %{lat:.0}<br>" +
              "<i>lon</i>: %{lon:.0}<br>" +
              "<extra></extra>",
       };
    });
    var map_layout = {
  	 //title: 'Footfall counters',
  	 font: {
  		 color: 'black'
  	 },
      dragmode: 'zoom',
      mapbox: {
        center: {
          lat: 50.376258,
          lon: -4.171036
        },
        domain: {
          x: [0, 1],
          y: [0, 1]
        },
        style: 'open-street-map',
        zoom: 12,
      },
      margin: {
        r: 20,
        t: 40,
        b: 20,
        l: 20,
        pad: 0
      },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      showlegend: false,
  	 annotations: [{
  		 x: 0,
         y: 0,
         xref: 'paper',
         yref: 'paper',
  		 text: 'Source: Plymouth City Council and The Data Place. Map tiles: Open Street Map.',
  		 showarrow: false
  	 }]
    };
    Plotly.setPlotConfig({
      mapboxAccessToken: "pk.eyJ1IjoiamFyZ29uYXV0IiwiYSI6ImNrZWUybmR5ZjBicWMyc295NTR4N3I4OWIifQ.scaKTg7g6zt8i9_zk8NjWg"
    });
    Plotly.newPlot('mapDiv', map_data, map_layout);
    // put a placeholder value in the hoverInfo DIV
    elHover = document.getElementById('hoverInfo');
    elHover.innerHTML = 'Starting view; all counters.\n  Hover over a point on the map to see data for an individual location.';

    // get the counter ID from the hover event
    myMap = document.getElementById('mapDiv')
    var hoverInfo = document.getElementById('hoverInfo');
    myMap.on('plotly_hover', function(eventdata){
        var infotext = eventdata.points[0]['text'];
        //console.log(infotext)
        hoverInfo.innerHTML = infotext;
      });

      // define the data for the chart ------------------------------
      function makeplot() {
        Plotly.d3.csv("https://raw.githubusercontent.com/jargonautical/new-park-app/master/counters_data.csv", function(data){ processData(data) } );

      };

      // chart layout --------------------------------------------

      var layout = {
        //title: 'Footfall counters',
        xaxis: {'title': 'Time of day', 'range': [0]},
        yaxis: {'title': 'Footfall count', 'range': [0]},
        height: 400,
        font: {
           color: 'black'
         },
         mode: 'lines',
         hovertemplate: 'Events: %{y:2f}<br>Time: %{x}<extra></extra>',
         hovermode: 'closest',
         dragmode: 'zoom',
         margin: {
           r: 20,
           t: 60,
           b: 80,
           l: 60,
           pad: 0
         },
         paper_bgcolor: '#ffffff',
         plot_bgcolor: '#ffffff',
         showlegend: false,
         legend: {x: 1, y: 1},
         annotations: [{
           x: 0,
             y: 1.0,
             xref: 'paper',
             yref: 'paper',
           text: 'Counter data',
           showarrow: false
         }]
       };

      // process the data for the chart ----------------------------
      function processData(allRows) {

        //console.log(allRows);

        var x = [], y = [], yall = [], clearTrace = [];

        // get all_counters data for starting chart
        for (var i=0; i<allRows.length; i++) {
              row = allRows[i];
              x.push( row['interval'] );
              y.push( row['all_counters'] );
            };
            console.log( 'allcounters', 'X',x, 'Y',y );
            var allcounters = [{
              x: x,
              y: y
            }];

            // draw the starting chart
            Plotly.newPlot('chartDiv', allcounters, layout, 0);

        myMap = document.getElementById('mapDiv')
        var hoverInfo = document.getElementById('hoverInfo');
        //var infotext = 'all_counters';
        myMap.on('plotly_hover', function(eventdata){
            var infotext = eventdata.points[0]['text'];
            console.log(infotext);
            hoverInfo.innerHTML = infotext;
            y = [];
            for (var i=0; i<allRows.length; i++) {
                  row = allRows[i];
                  x.push( row['interval'] );
                  y.push( row[infotext] );
                  yall.push( row['all_counters'] );
                };
                console.log( 'counter', infotext, 'X',x, 'Y',y );
                var traces = [{
                  x: x,
                  y: y
                }];

                // draw the new chart
                Plotly.newPlot('chartDiv', traces, layout, 0);

          });
          }

      makeplot();

  });
}

makemap();
