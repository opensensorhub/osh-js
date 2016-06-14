OSH.UI.D3ChartView = Class.create(OSH.UI.View,{
  initialize: function($super,divId,options) {
    $super(divId);
    
    var xLabel = 'Time';
    var yLabel = 'yLabel';
    var xTickFormat = null;
    
    var yTickFormat = d3.format('.02f');
    var useInteractiveGuideline = true;
    var showLegend = true;
    var showYAxis = true;
    var showXAxis = true;
    var transitionDuration = 1;
    
    if(typeof(options) != "undefined") {
      if(options.xLabel) {
        xLabel = options.xLabel;
      }
      
      if(options.yLabel) {
        yLabel = options.yLabel;
      }
      
      if(options.xTickFormat) {
        xTickFormat = options.xTickFormat;
      }
      
      if(options.yTickFormat) {
        yTickFormat = options.yTickFormat;
      }
      
      if(options.showLegend) {
        showLegend = options.showLegend;
      }
      
      if(options.showXAxis) {
        showXAxis = options.showXAxis;
      }
      
      if(options.showYAxis) {
        showYAxis = options.showYAxis;
      }
      
      if(options.useInteractiveGuideline) {
        useInteractiveGuideline = options.useInteractiveGuideline;
      }
      
      if(options.transitionDuration) {
        transitionDuration = options.transitionDuration;
      }
    }
    
    this.chart = nv.models.lineChart()
      .margin({
            left: 75,
            right: 25
     }) //Adjust chart margins to give the x-axis some breathing room.
     .options({
        duration: 1,    // This should be duration: 300
        useInteractiveGuideline: useInteractiveGuideline
      }) //We want nice looking tooltips and a guideline!
      .duration(1)
     //.transitionDuration(1) //how fast do you want the lines to transition?
     .showLegend(showLegend) //Show the legend, allowing users to turn on/off line series.
     .showYAxis(showYAxis) //Show the y-axis
     .showXAxis(showXAxis) //Show the x-axis
        // .forceY([27.31,28])
    ;
    
    this.chart.xAxis //Chart x-axis settings
        .axisLabel(xLabel)
        .tickFormat(function(d) {
            return d3.time.format('%H:%M:%S ')(new Date(d))
        });
    
    this.chart.yAxis //Chart y-axis settings
        .axisLabel(yLabel)
        .tickFormat(d3.format('.02f'));
  
    var width = "500";
    var height = "250";
    var css = "";
    
    if(options.width) {
      width = options.width;
    }
    
    if(options.height) {
      height = options.height;
    }
    
    if(options.css) {
      css = options.css;
    }
    
    //create svg element
    var svg = document.createElementNS(d3.ns.prefix.svg, 'svg');

    var div = document.getElementById(divId);
    div.setAttribute("width",width);
    div.setAttribute("height",height);
    div.setAttribute("class",css);    
    div.appendChild(svg);
    
    this.svgChart = d3.select('#'+divId+' svg'); //Select the <svg> element you want to render the chart in. 
    /*this.data = {
      values: [],
      key: yLabel,
      interpolate: "cardinal",
      area: true,
    }
  
    //Done setting the chart up? Time to render it!
    var svgChart = d3.select('#'+divId+' svg'); //Select the <svg> element you want to render the chart in. 
    
    svgChart.datum([this.data]) //Populate the <svg> element with chart data...
        .call(this.chart); //Finally, render the chart!*/
        
    nv.addGraph(this.chart);    
    
    this.data = new Hashtable();
    this.d3Data = [];
  },
  
  addCurve: function(options){
    var dataViewId = options.dataViewId;
    var name = options.name;
    
    var data = {
      values: [],
      key: name,
      interpolate: "cardinal",
      area: true,
    }
    
    this.data.put(dataViewId,data);
    
    this.d3Data.push(data);
    
    this.svgChart.datum(this.d3Data) //Populate the <svg> element with chart data...
            .call(this.chart);
    
  },
  
  setData: function(data) {
    /*this.data.values.push({
        y: data.data,
        x: data.timeStamp
    });
    
    this.chart.update();

    if (this.data.values.length > 20) {
        this.data.values.shift();
    }*/
  },
  
  update: function($super,dataViewId, data) {
    /*if(dataViewId == this.dataViewId) {
        this.setData(data);
    }*/
    if(this.data.containsKey(dataViewId)){
      var d3Data = this.data.get(dataViewId);
      d3Data.values.push({
        y: data.data,
        x: data.timeStamp
      });
      this.chart.update();
      if (d3Data.values.length > 20) {
          d3Data.values.shift();
      }
    }
  },
  
  setDataViewId: function(dataViewId) {
    this.dataViewId = dataViewId;
    //TODO
    //this.video.setAttribute("id", dataViewId); 
  },
  
  hasDataView: function($super,dataViewId) {
      return this.dataViewId == dataViewId || this.associatedViews.indexOf(dataViewId) >= 0;
  }
});
