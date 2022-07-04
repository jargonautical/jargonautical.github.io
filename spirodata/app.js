const params = {
		width: 200,
		height: 200,
		t_min: 0,
		t_max: 100,
		t_step: .1,
		render_time: 5000,
		stroke_color: "#c00000",
		stroke_width: 1,
		pen_radius: 5
	},
	root_graph = d3.select('#graph');

function asyncFor(start, end, step, cb, done) {
	function loop(i) {
		cb(i, function() {
			i += step;
			if (i < end) {
				loop(i);
			} else if (typeof done === 'function') {
				done();
			}
		});
	}

	loop(start);
}

// scalers for start-end range of drawing trace and graph x/y
const t_scale = d3.scaleLinear().domain([params.t_min, params.t_max]).range([0, 2*Math.PI]),
	x = d3.scaleLinear().domain([-2, 2]).range([25, params.width-25]),
	y = d3.scaleLinear().domain([-2, 2]).range([params.height-25, 25]);

// helpers
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

// main spirograph function, return in struct: x, y, width, color
// t_max is from params, data is array of the data we're trying to display
function position(t, data) {
	var a = 1,  // whole turn
		b = 50,   // smaller surrounding turns
		b_r = 1;  // radius of smaller turns

	let data_scale = d3.scaleLinear().domain([t_scale.range()[0], t_scale.range()[1]]).range([0, data.length]),
		r_scale = d3.scaleLinear().domain([getMinOfArray(data), getMaxOfArray(data)]).range([0.2, 0.95])

	// scale smaller turns to data
	b_r = r_scale(data[Math.floor(data_scale(t))]);

	return {
		x: Math.sin(a*t) + Math.sin(b * t) * b_r,
		y: Math.cos(a*t) + Math.cos(b * t) * b_r,
		width: params.stroke_width,
		color: params.stroke_color
	};
};

function wrapInGroup(element) {
	let group = document.createElementNS("http://www.w3.org/2000/svg", "g")
	element.parentNode.appendChild(group)
	group.appendChild(element)
	return group
}

function unwrapChild(element) {
	let child = element.children[0]
	element.parentNode.appendChild(child)
	element.remove()
}

function getBoundingBoxCenter(selection) {
  // get the DOM element from a D3 selection
  // you could also use "this" inside .each()
  let element = selection.node();

	// catch failure
	if (element == null) {
		console.log(selection);
		return {
			x: 0,
			y: 0
		};
	}

	// use the native SVG interface to get the bounding box
	let group = wrapInGroup(element);
	let bbox = group.getBBox();
	unwrapChild(group);

	console.log(bbox);

	// return the center of the bounding box
	// considering matrix(1,0,0,1.6,0,-73.7) from parent -- hack
  return {
		x: bbox.x + bbox.width/2 - params.width / 2,
		y: (bbox.y + bbox.height/2) * 1.6 - 73.7 - params.height / 2
	};
}

// main program draws each spirograph according to position function and time params
function draw_graph(svg, id, meta, data) {
	// clear svg content matching our id
	svg.select(`#s${id}`).remove();

	// find where we need to put this spirograph
	let trans_pos = getBoundingBoxCenter(svg.select(`#${meta.id.replace(/\s/g, "\\$&")}`));

	let svg_id = svg.append("g")
		.attr("id", `s${id}`)
		.attr("width", params.width)
		.attr("height", params.height)
		.attr("transform", `translate(${trans_pos.x + meta.offset.x} ${trans_pos.y + meta.offset.y})`);

	// circle showing trace position ("pen")
	const brush = svg_id.append('circle')
		.attr("r", params.pen_radius);

	const start_at = +new Date;
	const num_steps = (params.t_max - params.t_min) / params.t_step;
	let current_step = 0;
	let previous = position(params.t_min, data);

	asyncFor(params.t_min + params.t_step, params.t_max, params.t_step, (time, next) => {
		if (time > t_scale.domain()[1]) {
			return true;
		}

		var t = t_scale(time),
			pos = position(t, data);

		brush.attr("cx", x(pos.x))
			.attr("cy", y(pos.y));
		svg_id.append('line')
			.attr("x1", x(previous.x))
			.attr("y1", y(previous.y))
			.attr("x2", x(pos.x))
			.attr("y2", y(pos.y))
			.attr("stroke", pos.color)
			.attr("stroke-width", pos.width);

		previous = pos;

		current_step++;

		const expected_time = start_at + (params.render_time * current_step / num_steps);
		const actual_time = +new Date;
		if (actual_time < expected_time) {
				setTimeout(next, expected_time - actual_time);
		} else {
				try {
						next();
				} catch (ex) {
						// Probably a stack overflow
						setTimeout(next, 0);
				}
		}
	}, () => {
		// done, hide trace circle
		brush.attr("visibility", "hidden");
	});
};

function build_spirograph(data) {
	let filtered_data = data.Dice({
		"measures": "20100"
		}, {"clone": true});

	// maps data to geo svg we're using
	let geomap = {
		"1807745164": {
			"id": "Bath and North East Somerset",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745172": {
			"id": "Christchurch",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745166": {
			"id": "Bristol",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745167": {
			"id": "Cornwall",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745177": {
			"id": "Mid Devon",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745179": {
			"id": "North Dorset",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745180": {
			"id": "Gloucester",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745168": {
			"id": "Isles of Scilly",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745169": {
			"id": "North Somerset",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745170": {
			"id": "Plymouth",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745181": {
			"id": "West Somerset",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745173": {
			"id": "South Gloucestershire",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745174": {
			"id": "Swindon",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745175": {
			"id": "Torbay",
			"offset": {
				"x": 0,
				"y": 0
			}
		},
		"1807745176": {
			"id": "Wiltshire",
			"offset": {
				"x": 0,
				"y": 0
			}
		}
	}

	d3.xml('uk-southwest.svg')
		.then(svgxml => {
			// clear anything in graph div
			root_graph.selectAll('*').remove();

			// load map
			root_graph.node().append(svgxml.documentElement);

			// scale and store
			let svg = root_graph.select("svg")
				.attr("preserveAspectRatio", "xMinYMin meet")
				.attr("viewBox", "0 0 1425 1118")

			for (id in geomap) {
				let male_wage = filtered_data.Data({"geography": id, "sex": "5"}, false);
				let female_wage = filtered_data.Data({"geography": id, "sex": "6"}, false);

				let wage_difference = male_wage.map(function(item, index) {
					if (item == null || female_wage[index] == null) return null;
					return Math.abs(item - female_wage[index]);
				})

				draw_graph(svg, id, geomap[id], wage_difference);
			}
		});
}

JSONstat("jsonstat.json").then(build_spirograph)
