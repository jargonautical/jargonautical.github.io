// define the data for the chart ------------------------------
function makeplot() {
  Plotly.d3.csv("https://raw.githubusercontent.com/jargonautical/data-mince/master/pop-data.csv", function(data){ processData(data) } );

};

// process the data for the chart ----------------------------
function processData(allRows) {

  console.log(allRows);
  var x = [], y = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['C_AGE_NAME'] );
    y.push( row['OBS_VALUE'] );
  }
  console.log( 'X',x, 'Y',y );
  makePlotly( x, y );
}
// chart layout --------------------------------------------

var layout = {
  title: 'Footfall counters',
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
   showlegend: true,
   legend: {x: 1, y: 1},
   annotations: [{
     x: -0.2,
       y: 0,
       xref: 'paper',
       yref: 'paper',
     text: 'Source: PCC and TDP',
     showarrow: false
   }]
 };
// make the plotly -----------------------

function makePlotly( x, y ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];

  Plotly.newPlot('popDiv', traces, layout);
};

// call the functions ----------------------

makeplot();
