OSH.UI.RangeSlider = Class.create(OSH.UI.View, {
	initialize: function ($super, divId, options) {
		$super(divId, [], options);
		var slider = document.getElementById(this.divId);

		var startTime = new Date().getTime();
		this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055
		slider.setAttribute('disabled', true);

		this.dataSourcesId = [];

		this.multi = false;
		// compute a refresh rate
		this.dataCount = 0;
		this.refreshRate = 10;

		if(typeof options != "undefined") {
			if(typeof options.startTime != "undefined") {
				startTime = new Date(options.startTime).getTime();
				slider.removeAttribute('disabled');
			}

			if(typeof options.endTime != "undefined") {
				this.endTime = new Date(options.endTime).getTime();
			}

			if(typeof options.dataSourcesId != "undefined") {
				this.dataSourcesId = options.dataSourcesId;
			}

			if(typeof options.refreshRate != "undefined") {
				this.refreshRate = options.refreshRate;
			}

		}

		noUiSlider.create(slider, {
			start: [startTime]/*,timestamp("2015-02-16T08:09:00Z")]*/,
			range: {
				min: startTime,
				max: this.endTime
			},
			//step:  1000* 60* 60,
			format: wNumb({
				decimals: 0
			}),
			behaviour: 'tap',
			connect: 'upper',
			tooltips: [
				wNumb({
					decimals: 1,
					edit:function( value ){
						var date = new Date(parseInt(value)).toISOString();
						return date.split("T")[1].split("Z")[0];
					}
				})
			],
			pips: {
				mode: 'positions',
				values: [5,25,50,75,90],
				density: 1,
				//stepped: true,
				format: wNumb({
					edit:function( value ){
						return new Date(parseInt(value)).toISOString();
					}
				})
			}
		});

		//noUi-handle noUi-handle-lower
		var self = this;
		this.isSliding = false;

		this.count = 0;

		// start->update->end
		slider.noUiSlider.on("start", function (values, handle) {
			self.startEvent();
		});

		slider.noUiSlider.on("update", function (values, handle) {
			self.updateEvent();
		});

		slider.noUiSlider.on("end", function (values, handle) {
			self.endEvent(values,handle);
		});

		// listen for DataSourceId
		for(var i=0;i < this.dataSourcesId.length;i++) {
			OSH.EventManager.observe(OSH.EventManager.EVENT.DATA+"-"+this.dataSourcesId[i], function (event) {
				if(!self.isSliding && self.count != 2 && ((++self.dataCount)%self.refreshRate == 0)) {
					slider.noUiSlider.set([event.data.timeStamp]);
					self.dataCount = 0;
				}
			});
		}
	},

	startEvent: function() {
		this.isSliding = true;
		this.count = 1;
	},

	updateEvent: function() {
		if(this.count == 1) {
			this.count++;
		}
	},

	endEvent: function(values,handle) {
		var timeout = 0;
		var self = this;
		if(self.count == 2) {
			OSH.EventManager.fire(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, {
				startTime: new Date(parseInt(values[handle])).toISOString(),
				endTime: new Date(self.endTime).toISOString(),
				dataSourcesId: self.dataSourcesId
			});
			// update slider again after a few time
			timeout = 3000;
		}

		window.setTimeout(function(){
			self.count = 0;
			self.isSliding = false;
		},3000);
	}
});