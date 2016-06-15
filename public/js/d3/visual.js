$(document).ready(function() {

	var id = $('input[type="hidden"]').val();
	$.ajax({
		url: '/control/report/getMetrics',
		type: 'GET',
		data: {
			id: id
		},
		dataType: 'json',
		success: function(res) {

			var xdate = [],
				bodySize = [];

			var formatDate = d3.time.format("%d-%b-%y");

			res.metrics.forEach(function(item, index) {
				for (key in item) {
					xdate.push(key);
					bodySize.push(item[key].metrics.bodySize);
				}
			});

			var dataset = [];
			for (var i = 0; i < xdate.length; i++) {
				dataset.push({
					'date': xdate[i],
					'close': bodySize[i]
				});
			}

			console.log(dataset);

			// 初始化画布
			var margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 60
				},
				width = 900 - margin.left - margin.right,
				height = 400 - margin.top - margin.bottom;


			var x = d3.time.scale()
				.domain(d3.extent(dataset, function(d) {
					return d.date;
				}))
				.range([0, width]);


			var y = d3.scale.linear()
				.domain([0, d3.max(dataset, function(d) {
					return d.close;
				})])
				.range([height, 0]);


			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.ticks(20);;

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.ticks(15);;

			var line = d3.svg.line()
				.x(function(d) {
					return x(d.date);
				})
				.y(function(d) {
					return y(d.close);
				})
				.interpolate('bundle');;

			var svg = d3.select(".svg-container").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


			x.domain(d3.extent(dataset, function(d) {
				return d.date;
			}));
			y.domain(d3.extent(dataset, function(d) {
				return d.close;
			}));

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
				.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("bodySize (kb)");

			svg.append("path")
				.datum(dataset)
				.attr("class", "line")
				.attr("d", line);
		}

	});


});