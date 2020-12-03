// function to build chart 1
  // function to set filepath for chart 1
  // function to build dataset for chart 1
  // function to build trace for chart 1

// function to build chart 2
  // function to set filepath for chart 2
  // function to build dataset for chart 2
  // function to build trace for chart 2

// define layout with subplots

// define default picker value

// function to create callback for chart 1
// function to create callback for chart 2

// call chart 1 function
// call chart 2 function


function defT1() {
  var trace1 = {
    x: ['a', 'b', 'c'],
    y: [4, 5, 6],
    type: 'scatter'
  };
  //console.log(trace1);
  return trace1;
}

function defT2() {
  var trace2 = {
    x: ['a', 'b', 'c'],
    y: [50, 60, 70],
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter'
  };
  return trace2;
}

trace1 = defT1();
trace2 = defT2();

var data = [trace1, trace2];

var layout = {
  grid: {rows: 1, columns: 2, pattern: 'independent'},
};

Plotly.newPlot('myDiv', data, layout);
