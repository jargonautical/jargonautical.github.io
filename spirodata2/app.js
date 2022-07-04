const params = {
		width: 512,
		height: 512,
		t_min: 0,
		t_max: 200, // smoothness of line
		t_step: .1,
		render_time: 20000, // speed of drawing
		move_time: 100,
		stroke1_color: "#c0000060",
		stroke2_color: "#0000c060",
		stroke_width: 2.0,
		pen_radius: 5 // size of pen marker
	},
	root_graph = d3.select('#graph'),
	root_controls = d3.select('#selectors'),
	dropdown_1 = root_controls.select("select#geo-1"),
	dropdown_2 = root_controls.select("select#geo-2"),
	year_slider = root_graph.select("#year-slider"),
	year_label = root_graph.select("#year-label");

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
	x = d3.scaleLinear().domain([-2, 2]).range([32, params.width-32]),
	y = d3.scaleLinear().domain([-2, 2]).range([params.height-32, 32]);



// helpers
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

// main spirograph function, return in struct: x, y, width, color
// t_max is from params, data is array of the data we're trying to display
function position(t, meta, data) {
	var a = 1,  // whole turn
		b = 50,   // smaller surrounding turns
		b_r = 1;  // radius of smaller turns

	let data_scale = d3.scaleLinear().domain([t_scale.range()[0], t_scale.range()[1]]).range([0, data.length]),
		r_scale = d3.scaleLinear().domain([meta.data_min, meta.data_max]).range([0.2, 0.95])

	// scale smaller turns to data
	b_r = r_scale(data[Math.floor(data_scale(t))]);
	if (data[Math.floor(data_scale(t))] == null) b_r = 0;

	return {
		x: Math.sin(a*t) + Math.sin(b * t) * b_r,
		y: Math.cos(a*t) + Math.cos(b * t) * b_r,
		//width: b_r * 5,
		width: params.stroke_width,
		color: meta.color
	};
};

// main program draws each spirograph according to position function and time params
function draw_graph(svg, id, meta, data, years, set_year = null) {
	let svg_id = svg.append("g")
		.attr("id", `s${id}`)
		.attr("width", params.width)
		.attr("height", params.height)

	// circle showing trace position ("pen")
	const brush = svg_id.append('circle')
		.attr("r", params.pen_radius);
	//console.log('pen radius here is ', params.pen_radius);

	const start_at = +new Date;
	const num_steps = (params.t_max - params.t_min) / params.t_step;
	let current_step = 0;
	let previous = position(params.t_min, meta, data);

	asyncFor(params.t_min + params.t_step, params.t_max, params.t_step, (time, next) => {
		if (time > t_scale.domain()[1]) {
			return true;
		}

		var t = t_scale(time),
		pos = position(t, meta, data);

		brush.attr("cx", x(pos.x))
		.attr("cy", y(pos.y));
		svg_id.append('line')
		.attr("x1", x(previous.x))
		.attr("y1", y(previous.y))
		.attr("x2", x(pos.x))
		.attr("y2", y(pos.y))
		.attr("stroke", pos.color)
		.attr("stroke-width", pos.width);

		// update date span
		let data_scale = d3.scaleLinear().domain([t_scale.range()[0], t_scale.range()[1]]).range([0, data.length]);
		// have we drawn up to the set year? if so, done
		if (Math.ceil(data_scale(t)) > parseInt(set_year)) return true;
		year_label.text(years[Math.floor(data_scale(t))]);

		previous = pos;
		current_step++;

		// render instantly if we asked for a specific year
		let expected_time = 0
		let actual_time = +new Date;
		if (set_year == null) {
			year_slider.node().value = data_scale(t); // only update slider if user didn't set it
			expected_time = start_at + (params.render_time * current_step / num_steps);
		}

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

function array_difference(arr1, arr2) {
	if (arr1.length != arr2.length) {
		return null;
	}
	return arr1.map(function(item, index) {
		if (item == null || arr2[index] == null) return null;
		return Math.abs(item - arr2[index]);
	})
}

// run graph program for each dropdown
function refresh_graphs(data, set_year = null) {
	// clear svg
	root_graph.select("svg").selectAll('*').remove();

	let years = data.Dimension("time").id;

	// this got a bit messy for having to set the domain for data
	let wage_difference_1 = [], wage_difference_2 = [];
	if(dropdown_1.property("value") != "0") {
		let male_data = data.Data({"geography": dropdown_1.property("value"), "sex": "5"}, false);
		let female_data = data.Data({"geography": dropdown_1.property("value"), "sex": "6"}, false);
		wage_difference_1 = array_difference(male_data, female_data);
	}
	if(dropdown_2.property("value") != "0") {
		let male_data = data.Data({"geography": dropdown_2.property("value"), "sex": "5"}, false);
		let female_data = data.Data({"geography": dropdown_2.property("value"), "sex": "6"}, false);
		wage_difference_2 = array_difference(male_data, female_data);
	}

	let combined_data = wage_difference_1.concat(wage_difference_2);
	let data_min = getMinOfArray(combined_data);
	let data_max = getMaxOfArray(combined_data);
	console.log('data min', data_min, ' and max ', data_max);

	if(dropdown_1.property("value") != "0")
		draw_graph(root_graph.select("svg"), dropdown_1.property("value"), {color: params.stroke1_color, data_min: data_min, data_max: data_max}, wage_difference_1, years, set_year);
	if(dropdown_2.property("value") != "0")
		draw_graph(root_graph.select("svg"), dropdown_2.property("value"), {color: params.stroke2_color, data_min: data_min, data_max: data_max}, wage_difference_2, years, set_year);
}

// make graphs move apart when hovered
function move_graphs(away) {
	let graphs = root_graph.select("svg").selectAll("g");

	// don't move if there's less than 2 graphs
	if (graphs.size() < 2) return;

	if (away == true) {
		graphs.transition().duration(params.move_time)
		.attr("transform", function(d, i) {
				let pos = {};
				if (i == 0) {
					// first graph
					pos = {x: 0, y: params.height * 0.3};
				} else {
					// second graph
					pos = {x: params.width * 0.3, y: 0};
				}
				return `matrix(0.7,0,0,0.7,${pos.x},${pos.y})`;
			});
	} else {
		graphs.transition().duration(params.move_time)
			.attr("transform", "matrix(1,0,0,1,0,0)");
	}
}

function build_spirograph(data) {
	let filtered_data = data.Dice({
		"measures": "20100"
		}, {"clone": true});

	// gambiarra to let us access dataset on console
	dataset = filtered_data;
	console.log('dataset: ', dataset);

	// initialize dropdowns
	dropdown_1.selectAll('*').remove();
	dropdown_1.append("option")
		.attr("value", "0",)
		.text("Select...");
	dropdown_2.selectAll('*').remove();
	dropdown_2.append("option")
		.attr("value", "0",)
		.text("Select...");

	// populate dropdowns with geo, value = data id, text = data label
	for (let i = 0; i < filtered_data.Dimension("geography").length; i++) {
		dropdown_1.append("option")
			.attr("value", filtered_data.Dimension("geography").id[i])
			.text(filtered_data.Dimension("geography").Category(i).label);
		dropdown_2.append("option")
			.attr("value", filtered_data.Dimension("geography").id[i])
			.text(filtered_data.Dimension("geography").Category(i).label);
	}

	// initialize svg
	root_graph.select("svg").selectAll('*').remove();
	root_graph.select("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", `0 0 ${params.width} ${params.height}`)
	year_slider
		.attr("min", 1)
		.attr("max", filtered_data.Dimension("time").length)
		.attr("step", 1);

	// register on change for each dropdown
	// can probably be prettier
	dropdown_1.on("change", function() {
		refresh_graphs(filtered_data);
	});
	dropdown_2.on("change", function() {
		refresh_graphs(filtered_data);
	});
	year_slider.on("change input", function() {
		refresh_graphs(filtered_data, year_slider.node().value);
	});
	//console.log('working ...?');
}

// gambiarra to let us access dataset on console
let dataset;

// start main program
JSONstat("uk-full-data.json").then(build_spirograph)
