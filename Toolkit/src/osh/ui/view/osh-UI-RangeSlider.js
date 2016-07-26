OSH.UI.RangeSlider = Class.create(OSH.UI.View, {
	initialize: function ($super, divId, options) {
		$super(divId, [], options);
		function timestamp(str){
			return new Date(str).getTime();
		}

		var pipsValues = document.getElementById(this.divId);

		noUiSlider.create(pipsValues, {
			start: [timestamp("2015-02-16T07:58:00Z")]/*,timestamp("2015-02-16T08:09:00Z")]*/,
			range: {
				min: timestamp("2015-02-16T07:58:00Z"),
				max: timestamp("2015-02-16T08:09:00Z")
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

		pipsValues.noUiSlider.on('update', function ( values, handle ) {
			console.log(new Date(parseInt(values[handle])).toISOString());
		});
	}
});