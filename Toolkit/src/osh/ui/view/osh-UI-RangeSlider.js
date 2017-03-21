/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var rangeSlider = new OSH.UI.RangeSlider("rangeSlider-container",{
        startTime: "2015-02-16T07:58:00Z",
        endTime: "2015-02-16T08:09:00Z",
        refreshRate:1
 });
 */
OSH.UI.RangeSlider = Class.create(OSH.UI.View, {
	initialize: function ($super, divId, options) {
		$super(divId, [], options);

		this.slider = document.createElement("div");
		var activateButtonDiv = document.createElement("div");
		var aTagActivateButton = document.createElement("a");
		activateButtonDiv.appendChild(aTagActivateButton);


		this.slider.setAttribute("class","osh-rangeslider-slider");
		activateButtonDiv.setAttribute("class","osh-rangeslider-control");

		var self = this;

		activateButtonDiv.addEventListener("click",function(event) {
			if(activateButtonDiv.className.indexOf("osh-rangeslider-control-select") > -1) {
				activateButtonDiv.setAttribute("class","osh-rangeslider-control");
				self.deactivate();
			} else {
				activateButtonDiv.setAttribute("class","osh-rangeslider-control-select");
				self.activate();
			}
		});
		document.getElementById(this.divId).appendChild(this.slider);
		document.getElementById(this.divId).appendChild(activateButtonDiv);

		var startTime = new Date().getTime();
		this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055
		this.slider.setAttribute('disabled', true);

		this.dataSourcesId = [];

		this.multi = false;
		// compute a refresh rate
		this.dataCount = 0;
		this.refreshRate = 10;

		if(typeof options != "undefined") {
			if(typeof options.startTime != "undefined") {
				startTime = new Date(options.startTime).getTime();
				//slider.removeAttribute('disabled');
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

		noUiSlider.create(this.slider, {
			start: [startTime,this.endTime]/*,timestamp("2015-02-16T08:09:00Z")]*/,
			range: {
				min: startTime,
				max: this.endTime
			},
			//step:  1000* 60* 60,
			format: wNumb({
				decimals: 0
			}),
			behaviour: 'drag',
			connect: true,
			tooltips: [
				wNumb({
					decimals: 1,
					edit:function( value ){
						var date = new Date(parseInt(value)).toISOString();
						return date.split("T")[1].split("Z")[0];
					}
				}),
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
				values: [5,25,50,75],
				density: 1,
				//stepped: true,
				format: wNumb({
					edit:function( value ){
						return new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
					}
				})
			}
		});

		//noUi-handle noUi-handle-lower
		// start->update->end
		this.slider.noUiSlider.on("slide", function (values, handle) {
			self.update = true;
		});

		// listen for DataSourceId
		OSH.EventManager.observe(OSH.EventManager.EVENT.CURRENT_MASTER_TIME, function (event) {
			if(!self.lock && ((++self.dataCount)%self.refreshRate == 0)) {
				self.slider.noUiSlider.set([event.timeStamp]);
				self.dataCount = 0;
			}
		});
	},

	/**
	 * @instance
	 * @memberof OSH.UI.RangeSlider
	 */
	deactivate:function() {
		this.slider.setAttribute('disabled', true);
		this.lock = false;
		if(this.update) {
			var values = this.slider.noUiSlider.get();
			OSH.EventManager.fire(OSH.EventManager.EVENT.DATASOURCE_UPDATE_TIME, {
				startTime: new Date(parseInt(values[0])).toISOString(),
				endTime: new Date(parseInt(values[1])).toISOString()
			});
		}
		this.update = false;
	},

	/**
	 * @instance
	 * @memberof OSH.UI.RangeSlider
	 */
	activate: function() {
		this.slider.removeAttribute('disabled');
		this.lock = true;
	}
});