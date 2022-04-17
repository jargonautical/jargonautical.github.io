var rows = 4;
var cols = 5;
var max_rows = 5;
var max_cols = 7;
var url = "times2.csv";
var request = new XMLHttpRequest();

request.open("GET", url, false);
request.send(null);

var lines = request.responseText.split(/\r?\n|\r/);
var secs = [];
var colours = [];
var headings = lines[0].split(','); // slice up the first row
for (var j=1; j<lines.length; j++) {
  var values = lines[j].split(','); // Split up the comma separated values
  secs.push(values[3]);
  colours.push(values[2]);
}
console.log(secs);
console.log(colours);

addElements(secs);
drawRandom(secs,max_rows,max_cols);

$("#showGrid").click(function(){
    rows = 3;
    cols = 5;
    reDrawGrid(secs,rows,cols);
});

$("#showNumberLine").click(function(){
    rows = 1;
    cols = 1000;
    reDrawGrid(secs,rows,cols);
});

$("#showRandom").click(function(){
  reDrawRandom(secs,max_rows,max_cols);
});
/*
$(".number").click(function(event) {
  $("#"+event.target.id).toggleClass('red');
});
*/
$(".number").on('mousedown', function (evt) {
  $(".number").on('mouseup mousemove', function handler(evt) {
    if (evt.type === 'mouseup') {
      $("#"+event.target.id).toggleClass('red');
    } else {
      // drag
    }
    $(".number").off('mouseup mousemove', handler);
  });
});

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function formatTime(num) {
  let mins = Math.floor(num/60);
  let modu = num % 60;
  var newTime = mins + 'm ' + modu + 's';
  return newTime;
}

function addElements(secs) {
  $.each(secs, function(idx) {
    $("body").append('<div id="number'+idx+'" class="'+colours[idx]+'">'+formatTime(secs[idx])+'</div>');
  });
  /*
  $.each(markers, function(idx) {
    $("body").append('<div id="marker'+idx+'" class="marker"><text class="marker_text">'+formatNumber(markers[idx])+'</text><arrow class="marker_arrow"></arrow></div>');
  });
  */
}

function drawRandom(secs,max_rows,max_cols) {
  var done = {};
  $.each(secs, function(idx) {
    var row = Math.floor(Math.random() * max_rows);
    var col = Math.floor(Math.random() * max_cols);
    var key = row + ',' + col;
    while (done[key]) {
      var row = Math.floor(Math.random() * max_rows);
      var col = Math.floor(Math.random() * max_cols);
      var key = row + ',' + col;
    }
    done[key] = "true";
    var y = 100 * row;
    var x = 200 * col;
    var element = document.getElementById('number'+idx);
    makeInteractive(element,x,y);
  });
}

function reDrawRandom(secs,max_rows,max_cols) {
  var done = {};
  //console.log('in here');
  $.each(secs, function(idx) {
    var row = Math.floor(Math.random() * max_rows);
    var col = Math.floor(Math.random() * max_cols);
    var key = row + ',' + col;
    while (done[key]) {
      var row = Math.floor(Math.random() * max_rows);
      var col = Math.floor(Math.random() * max_cols);
      var key = row + ',' + col;
    }
    done[key] = "true";
    var y = 100 * row;
    var x = 200 * col;
    putBackGrid('number'+idx,x,y);
  });
}


function drawGrid(secs,rows,cols) {
  var row = 0;
  $.each(secs, function(idx) {
    if (idx % cols == 0 && idx > 0) {
      row += 1;
    }
    var y = 100 * row;
    var x = 200 * (idx % cols);
    var element = document.getElementById('number'+idx);
    makeInteractive(element,x,y);
    $.each(markers, function(index) {
      if ((markers[index] >= secs[idx]) && (markers[index] <= secs[idx + 1])) {
        var markerElement = document.getElementById('markers'+index);
        makeInteractive(markerElement,x+160,y-20);
      }
    });
  });
}

function putBackGrid(element,x,y) {
    var transitionEvent = whichTransitionEvent();
    $("#"+element).css('transition','all 0.3s linear');
    $("#"+element).css('transform','translate(' + x + 'px, ' + y + 'px)');
    $("#"+element).one(transitionEvent, function(event) {
      var topass = document.getElementById(element);
      makeInteractive(topass,x,y);
    });
}

function reDrawGrid(secs,rows,cols) {
  var row = 0;
  $.each(secs, function(idx) {
    if (idx % cols == 0 && idx > 0) {
      row += 1;
    }
    var y = 100 * row;
    var x = 200 * (idx % cols);
    putBackGrid('number'+idx,x,y);
  });
  setTimeout(function () { drawGrid(secs,rows,cols);},1000);
}

function whichTransitionEvent(){
  var t,
      el = document.createElement("fakeelement");

  var transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

function makeInteractive(element,x,y) {
  element.style.transition = '';
  element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
  interact(element)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.createSnapGrid({ x: 10, y: 10 })
          ],
        range: Infinity,
        restrictlativePoints: [ { x: 0, y: 0 } ]
        }),
        /*interact.modifiers.restrict({
          restriction: element.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        })*/
      ],
    inertia: true
  })
  .on('dragmove', function (event) {
    x += event.dx
    y += event.dy

    event.target.style.webkitTransform =
    event.target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  })

}
