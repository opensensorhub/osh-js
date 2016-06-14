/**
 * Properties : {
 * 	startDate : '',
 *  endDate : ''
 * }
 */
var $j = jQuery.noConflict();

OSH.UI.JQRangeSlider = Class.create({
	initialize : function(divId,properties) {
		function TwoDigits(val){
		    if (val < 10){
		         return "0" + val;
		    }
		    return val;
		}
		
		var rangeSliderProperties = {
		    bounds: {min: new Date(properties.startDate), max: new Date(properties.endDate)},
		    enabled: false,
		    defaultValues: {min: new Date(properties.startDate), max: new Date(properties.endDate)},
		    formatter: function(value){
		        var hours = value.getHours(),
		            minutes = value.getMinutes();
		        return TwoDigits(hours) + ":" + TwoDigits(minutes);
		    },
		    
		    scales: [{
		        first: function (value) {
		            return value;
		        },
		        end: function (value) {
		            return value;
		        },
		        next: function (value) {
		            var next = new Date(value);
		            return new Date(next.setMinutes(value.getMinutes() + 1));
		        },
		        label: function (value) {
		            if( value.getMinutes() %  1 == 0){
		              return (value.getMinutes() > 0 )?TwoDigits(value.getMinutes()): 0;            
		            } else {
		              return "";
		            }
		        },
		        format: function(tickContainer, tickStart, tickEnd){ 
		          tickContainer.addClass("sliderCustomLabel");
		        }
		    }]
		};
		
		var div = document.getElementById(divId);
		
		var sliderDiv = document.createElement("div");
		sliderDiv.setAttribute("class", "rangeSlider adapt-size");
		sliderDiv.setAttribute("id", "slider");
		
		// adds to div
		div.appendChild(sliderDiv);
		
		// creates buttons
		var containerButtonDiv = document.createElement("div");
		containerButtonDiv.setAttribute("style", "float:right;margin-top: 28px;margin-right: 10px;");
		
		// creates edit button
		var editButton = document.createElement("button");
		editButton.setAttribute("type","button");
		editButton.setAttribute("class","btn btn-default btn-sm");
		editButton.setAttribute("title","Edit");
		editButton.setAttribute("id","editButton");
		
		// creates span
		var span = document.createElement("span");
		span.setAttribute("id","editValidate");
		span.setAttribute("class","glyphicon glyphicon-edit");
		
		// adds span to button
		editButton.appendChild(span);
		
		// adds button to container div
		containerButtonDiv.appendChild(editButton);
		
		// adds container button div to div
		div.appendChild(containerButtonDiv);
		
		var obj = $(sliderDiv);
		
		$j(sliderDiv).dateRangeSlider(rangeSliderProperties);
		
		this.initEvents(editButton);
	},
	
	//TODO: replace JQuery by native JS implementation
	//TODO: use dynamic ids instead of static ones
	initEvents: function(editButtonDivId) {
	  $(editButtonDivId).observe("click", function(event) {
	    var editValidate = $j("#editValidate");
	    if(editValidate.hasClass("glyphicon-edit")){
	      $j("#editValidate").removeClass("glyphicon-edit");
	      $j("#editValidate").addClass("glyphicon-ok");
	      $j("#editValidate").addClass("glyphicon-custom-color");
	      $j('#editButton').attr("title", "validate");	
	      $j("#slider").dateRangeSlider("enable");
	      $j("#editButton").trigger( "change", ["edit"] );
	    } else {
	      $j("#editValidate").removeClass("glyphicon-ok");
	      $j("#editValidate").addClass("glyphicon-edit");
	      $j("#editValidate").removeClass("glyphicon-custom-color");
	      $j('#editButton').attr("title", "edit");	
	      $j("#slider").dateRangeSlider("disable");
	      $j("#editButton").trigger( "change", ["validate"] );
	    }    
	    return false;
	  });
	}
});