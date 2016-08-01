OSH.UI.RangeSlider = Class.create(OSH.UI.View, {
	initialize: function ($super, divId, options) {
		$super(divId, [], options);
		var slider = document.getElementById(this.divId);

		var startTime = new Date().getTime();
		var endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055
		slider.setAttribute('disabled', true);

		this.dataSourcesId = [];

		this.multi = false;
		if(typeof options != "undefined") {
			if(typeof options.startTime != "undefined") {
				startTime = new Date(options.startTime).getTime();
				slider.removeAttribute('disabled');
			}

			if(typeof options.endTime != "undefined") {
				endTime = new Date(options.endTime).getTime();
			}

			if(typeof options.dataSourcesId != "undefined") {
				this.dataSourcesId = options.dataSourcesId;
			}

		}

		noUiSlider.create(slider, {
			start: [startTime]/*,timestamp("2015-02-16T08:09:00Z")]*/,
			range: {
				min: startTime,
				max: endTime
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
						return new Date(parseInt(value)).toISOString();
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

		var eventName = 'end';

		var self = this;
		this.isSliding = false;
		slider.noUiSlider.on("end", function (values, handle) {
			self.isSliding = false;
			OSH.EventManager.fire(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, {
				startTime: new Date(parseInt(values[handle])).toISOString(),
				endTime: new Date(endTime).toISOString(),
				dataSourcesId: self.dataSourcesId
			})
		});

		slider.noUiSlider.on("end", function (values, handle) {
			self.isSliding = true;
		});

		slider.noUiSlider.on("start", function (values, handle) {
			self.isSliding = true;
		});

		// listen for DataSourceId
		for(var i=0;i < this.dataSourcesId.length;i++) {
			OSH.EventManager.observe(OSH.EventManager.EVENT.DATA+"-"+this.dataSourcesId[i], function (event) {
				if(!self.isSliding) {
					slider.noUiSlider.set([event.data.timeStamp]);
				}
			});
		}
	}
});