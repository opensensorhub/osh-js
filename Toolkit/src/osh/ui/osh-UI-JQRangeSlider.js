/**
 * Properties : {
 * 	startDate : '',
 *  endDate : ''
 * }
 */
OSH.UI.JQRangeSlider = Class.create({
	initialize : function(divId,properties) {
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
		            return new Date(next.setHours(value.getHours() + 1));
		        },
		        label: function (value) {
		            if( value.getHours() %  3 == 0){
		              return (value.getHours() > 0 )?TwoDigits(value.getHours()): 0;            
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
		
		sliderDiv.dateRangeSlider(rangeSliderProperties);
		
		this.initEvents(editButton);
	},
	
	//TODO: replace JQuery by native JS implementation
	//TODO: use dynamic ids instead of static ones
	initEvents: function(editButtonDivId) {
	  $(editButtonDivId).observe("click", function(event) {
	    var editValidate = $("#editValidate");
	    if(editValidate.hasClass("glyphicon-edit")){
	      $("#editValidate").removeClass("glyphicon-edit");
	      $("#editValidate").addClass("glyphicon-ok");
	      $("#editValidate").addClass("glyphicon-custom-color");
	      $('#editButton').attr("title", "validate");	
	      $("#slider").dateRangeSlider("enable");
	      $("#editButton").trigger( "change", ["edit"] );
	    } else {
	      $("#editValidate").removeClass("glyphicon-ok");
	      $("#editValidate").addClass("glyphicon-edit");
	      $("#editValidate").removeClass("glyphicon-custom-color");
	      $('#editButton').attr("title", "edit");	
	      $("#slider").dateRangeSlider("disable");
	      $("#editButton").trigger( "change", ["validate"] );
	    }    
	    return false;
	  });
	}
});