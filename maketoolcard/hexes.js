function hexPoints(x, y, radius) {
  var points = [];
  for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
    var pointX, pointY;

    pointX = x + radius * Math.sin(theta);
    pointY = y + radius * Math.cos(theta);

    points.push(pointX + ',' + pointY);
  }

  return points.join(' ');
}

var x, y, row, col, pointX, pointY, theta;

var svg = document.getElementById('s');
var radius = 50;

for (col = 0; col < 3; col += 1) {
  for (row = 0; row < 2; row += 1) {
    var offset = (Math.sqrt(3) * radius) / 2;
    x = 60 + offset * col * 2;
    y = 60 + offset * row * Math.sqrt(3);

    if (row % 2 !== 0) x += offset;

    var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.style.fill = 'white';
    polygon.style.stroke = 'gray';
    polygon.style.strokeWidth = '1px';
    polygon.setAttribute('points', hexPoints(x, y, radius));

    polygon.addEventListener('click', function (event) {
      event.target.style.boxShadow = '0 0 5px blue inset';
    }, false);

    svg.appendChild(polygon);
  }
}
