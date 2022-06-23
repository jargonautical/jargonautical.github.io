chart = {
  let links = []
  let nodes = []

  links = data.links.map(d => Object.create(d));
  nodes = data.nodes.map(d => Object.create(d));

  if(periodId === "All"){
     links = data.links.map(d => Object.create(d));
     nodes = data.nodes.map(d => Object.create(d));
  } else {
    links = data.links.filter(d => d.period == periodId).map(d => Object.create(d));
  }

  const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.player))
      .force("charge", d3.forceManyBody(1).strength(2))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide(30));
      //.force("collision", d3.forceCollide(d => 5*d.role));

  const svg = d3.select(DOM.svg(width, height))
    .style('max-width', '100%')
    .style('max-height', '100%');

  const link = svg.append("g")
      .attr("stroke", "#6495ED")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", d => d.weight);

  const node = svg.append("g")
    .selectAll(".node")
    .data(nodes)
    .join("g")
      .attr('class', 'node')
      .call(drag(simulation));

  node.append('circle')
      .attr("r", 20)
      .attr("fill", clanFill);

  node.append("text")
      .text(function(d) {
        return d.code;
      })
      .style('fill', '#fff')
      .style('font-size', '14px')
      .style('font-family', 'sans-serif')
      .attr('x', -5)
      .attr('y', 5);


  simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("transform", d => `translate(${d.x}, ${d.y})`);
  });

  invalidation.then(() => simulation.stop());

  return svg.node();
}

var data = ("clandata.json").json()

var height = 400;
var width = 400;

color = {
  const scale = d3.scaleOrdinal(d3.schemeCategory10);
  return d => scale(d.clan);
}

clanFill = {
  const scale2 = d3.scaleOrdinal()
    .domain(["1","2"])
    .range(["#FF69B4", "slategray"]);
  return d => scale2(d.clan);
}

label = {
  return d => d;
}

drag = simulation => {

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

d3 = require("d3@5")
