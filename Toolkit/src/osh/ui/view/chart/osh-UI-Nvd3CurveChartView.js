OSH.UI.Nvd3CurveChartView = Class.create(OSH.UI.View, {
	initialize : function($super,divId,viewItems, options) {
		$super(divId,viewItems,options);

		this.entityId = options.entityId;
		var xLabel = 'Time';
		var yLabel = 'yLabel';
		var xTickFormat = null;

		var yTickFormat = d3.format('.02f');
		var useInteractiveGuideline = true;
		var showLegend = true;
		var showYAxis = true;
		var showXAxis = true;
		var transitionDuration = 1;

		if (typeof (options) != "undefined") {
			if (options.xLabel) {
				var xLabel = options.xLabel;
			}

			if (options.yLabel) {
				var yLabel = options.yLabel;
			}

			if (options.xTickFormat) {
				xTickFormat = options.xTickFormat;
			}

			if (options.yTickFormat) {
				yTickFormat = options.yTickFormat;
			}

			if (options.showLegend) {
				showLegend = options.showLegend;
			}

			if (options.showXAxis) {
				showXAxis = options.showXAxis;
			}

			if (options.showYAxis) {
				showYAxis = options.showYAxis;
			}

			if (options.useInteractiveGuideline) {
				useInteractiveGuideline = options.useInteractiveGuideline;
			}

			if (options.transitionDuration) {
				transitionDuration = options.transitionDuration;
			}
		}

		this.chart = nv.models.lineChart().margin({
			left : 75,
			right : 25
		}) //Adjust chart margins to give the x-axis some breathing room.
		.options({
			duration : 1, // This should be duration: 300
			useInteractiveGuideline : useInteractiveGuideline
		}) //We want nice looking tooltips and a guideline!
		.duration(1)
		//.transitionDuration(1) //how fast do you want the lines to transition?
		.showLegend(showLegend) //Show the legend, allowing users to turn on/off line series.
		.showYAxis(showYAxis) //Show the y-axis
		.showXAxis(showXAxis) //Show the x-axis
		// .forceY([27.31,28])
		;

		this.chart.xAxis //Chart x-axis settings
		.axisLabel(xLabel).tickFormat(function(d) {
			return d3.time.format('%H:%M:%S ')(new Date(d))
		});

		this.chart.yAxis //Chart y-axis settings
		.axisLabel(yLabel).tickFormat(d3.format('.02f'))
		.axisLabelDistance(15);

		this.width = "500px";
		this.height = "300px";
		this.css = document.getElementById(this.divId).className;

		if(typeof (options) != "undefined") {
			if (options.width) {
				this.width = options.width;
			}

			if (options.height) {
				this.height = options.height;
			}

			if (options.css) {
				this.css += " " + options.css;
			}

			if (options.cssSelected) {
				this.cssSelected = options.cssSelected;
			}
		}

		//create svg element
		var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');

		this.div = document.getElementById(divId);
		this.div.setAttribute("class", this.css);
		this.div.appendChild(svg);

		this.div.style.width = this.width;
		this.div.style.height = this.height;
		
		this.svgChart = d3.select('#' + divId + ' svg'); //Select the <svg> element you want to render the chart in.

		OSH.EventManager.observeDiv(this.divId,"click",function(event){
			OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW,{
				dataSourcesIds: [self.dataSourceId],
				entityId : self.entityId
			});
		});

	},

	setData : function(dataSourceId, data) {
		var selected = false;

		for (var i = 0; i < this.stylers.length; i++) {
			this.stylers[i].setData(dataSourceId, data, this, {
				selected : selected
			});
		}
	},

	updateCurve : function(styler, timestamp, options) {
		if (typeof (this.data) == "undefined") {
			this.d3Data = [];	
			var name = options.name;

			this.data = {
				values : [],
				key : this.names[styler.getId()],
				interpolate : "cardinal",
				area : true,
			}

			this.data.values.push({
				y : styler.y,
				x : styler.x
			});
			
			this.svgChart
					.datum([this.data]) //Populate the <svg> element with chart data...
					.call(this.chart);

		} else {
			this.data.values.push({
				y : styler.y,
				x : styler.x
			});
		}

		this.chart.update();
		if (this.data.values.length > 20) {
			this.data.values.shift();
		}
	},

	selectDataView: function($super,dataSourceIds) {
		if(dataSourceIds.indexOf(this.dataSourceId) > -1) {
			this.div.setAttribute("class",this.css+" "+this.cssSelected);
		} else {
			this.div.setAttribute("class",this.css);
		}
	}

});