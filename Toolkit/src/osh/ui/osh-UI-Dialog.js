OSH.UI.Dialog = Class.create({
	initialize : function(divId,options) {
		// creates HTML element
		var uniqueId = "dialog-"+OSH.Utils.randomUUID();

		var strVar = "";
		strVar += "<div id=\"dialog-0142ab00-59f1-4a15-a41b-4f1c3ca0c0dc\" class=\" pop-over\" draggable=\"true\" style=\"width: 150px; height: 150px; display: block; left: -21.7708%; top: 109px;\">" +
			"<a class=\"pop-close\">x<\/a>" +
			"<h3>Android Video<\/h3>" +
			"</div>";

		this.rootTag = document.createElement("div");
		this.rootTag.setAttribute("id",uniqueId);
		this.rootTag.setAttribute("class","pop-over");
		this.rootTag.setAttribute("draggable",(typeof(options.draggable) != "undefined")?options.draggable: false);
		this.rootTag.innerHTML = htmlVar;


		document.body.appendChild(this.rootTag);

		// removes the div from its parent
		var div = document.getElementById(divId);
		div.parentNode.removeChild(div);

		// plugs it into the new draggable dialog
		this.rootTag.appendChild(div);
		div.setAttribute("class","pop-content");

		/*var appendToBody = false;
		if(typeof(options.div) != "undefined") {
			this.div = options.div;
			var css= options.div.className;
			css += " pop-over";
			this.div.className = css;
		}else {
			this.div = document.createElement("div");
			this.div.setAttribute("class", "pop-over");
			this.div.setAttribute("id", uniqueId);
			appendToBody = true;
		}
		
		this.div.setAttribute("draggable", "true");

		// creates close button
		var closeButton = document.createElement("a");
		closeButton.setAttribute("class", "pop-close");
		closeButton.innerHTML = "x";
		closeButton.onclick = this.close.bind(this);

		this.div.appendChild(closeButton);

		// creates title
		var title = "Title";
		var h3 = document.createElement("h3");
		h3.innerHTML = title;

		if (options.title) {
			h3.innerHTML = options.title;
		}

		this.div.appendChild(h3);

		// creates div content
		this.divContent = document.createElement("div");
		this.divContent.setAttribute("class", "pop-content");

		// adds div content to div
		this.div.appendChild(this.divContent);

		// adds style
		//this.div.style.display = "block";

		// adds div to body
		if(appendToBody) {
			document.body.appendChild(this.div);
		}

		// adds listener
		this.div.addEventListener('dragstart', this.drag_start.bind(this), false);
		document.addEventListener('dragover', this.drag_over.bind(this), false);
		document.addEventListener('drop', this.drop.bind(this), false);*/
	},
	
	onClose: function (callback) {
		  this.onClose = callback;
	},

	close: function() {
  	  //this.div.parentNode.removeChild(this.div);
	  this.div.style.display = "none";
	  if(this.onClose) {
	    this.onClose();
	  }
	},

	drag_start: function(event) {
	    event.stopPropagation();
	    // Grab all computed styles of the dragged object
	    var style = window.getComputedStyle(event.target, null);
	    // dataTransfer sets data that is being dragged. In this case, the current X and Y values (ex. "1257,104")
	    event.dataTransfer.effectAllowed = 'all';
	    event.dataTransfer.setData("text-"+this.div.id,
	    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
	     
	},

	drag_over: function(event) { 
	    event.stopPropagation();
	    event.preventDefault(); 
	    return false; 
	},
	 
	drop: function(event) {
	    event.stopPropagation();
	    // Set array of x and y values from the transfer data
	    var offset = event.dataTransfer.getData("text-"+this.div.id).split(',');
	    this.div.style.left = ((event.clientX + parseInt(offset[0],10)) * 100) / window.innerWidth + "%";
	    this.div.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
	    event.preventDefault();
	    return false;
	}
});