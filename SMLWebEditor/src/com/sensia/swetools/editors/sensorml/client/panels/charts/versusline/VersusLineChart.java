package com.sensia.swetools.editors.sensorml.client.panels.charts.versusline;

import org.moxieapps.gwt.highcharts.client.Chart;
import org.moxieapps.gwt.highcharts.client.ChartTitle;
import org.moxieapps.gwt.highcharts.client.Credits;
import org.moxieapps.gwt.highcharts.client.Point;
import org.moxieapps.gwt.highcharts.client.Series;
import org.moxieapps.gwt.highcharts.client.ToolTip;
import org.moxieapps.gwt.highcharts.client.ToolTipData;
import org.moxieapps.gwt.highcharts.client.ToolTipFormatter;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.Composite;
import com.sensia.swetools.editors.sensorml.client.panels.charts.ISensorChart;
import com.sensia.swetools.editors.sensorml.client.panels.charts.ISensorChart.CHART_TYPE;
import com.sensia.swetools.editors.sensorml.client.panels.charts.table.IDataChangeListener;
import com.sensia.swetools.editors.sensorml.client.panels.charts.table.SensorVersusDataArrayTable;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.MODE;

public class VersusLineChart implements ISensorChart {

	private String xLabel;
	private String yLabel;
	private String title;
	
	private Number[][] values;
	
	private Chart chart;
	private SensorVersusDataArrayTable dataGrid;
	private Series serie;
	
	public VersusLineChart(String title,String xLabel, String yLabel, Number[][] values) {
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.title  = title;
		this.values = values;
		getChart();
		getTable();
	}

	@Override
	public Chart getChart() {
		if(chart == null) {
			chart = new Chart();
			chart.setType(Series.Type.LINE);
			chart.setMarginRight(20);
			chart.setMarginBottom(70)
					.setChartTitle(new ChartTitle().setText(title).setX(-20)).setToolTip(new ToolTip().setFormatter(new ToolTipFormatter() {
						public String format(ToolTipData toolTipData) {
							return "<b>" + toolTipData.getXAsString() + "," + toolTipData.getYAsDouble();
						}
					}));
	
			Credits credits = new Credits();
			credits.setText("");
			
			chart.setCredits(credits);
			chart.getYAxis().setAxisTitleText(yLabel);
			chart.getXAxis().setAxisTitleText(xLabel);
			chart.getXAxis().setGridLineWidth(1);
	
			serie = chart.createSeries().setPoints(values);
			serie.setOption("showInLegend", false);
			chart.addSeries(serie);
		} else {
			//sync table and chart
			Number[][] values = dataGrid.getRowData();
			chart.removeAllSeries();
			serie = chart.createSeries().setPoints(values);
			serie.setOption("showInLegend", false);
			chart.addSeries(serie);
		}
		return chart;
	}

	@Override
	public Composite getTable() {
		if(dataGrid == null) {
			dataGrid = new SensorVersusDataArrayTable(xLabel,yLabel,values);
			dataGrid.addChangeListener(new IDataChangeListener() {
				
				@Override
				public void notifyAddChanges(Number[][] values) {
					if(chart != null) {
						/*serie.remove();
						serie = chart.createSeries().setPoints(values);
						serie.setOption("showInLegend", false);
						chart.addSeries(serie);
						chart.redraw();*/
						
						//work around of a addPoint bug
						serie.setPoints(values);
					}
				}

				@Override
				public void notifyRemoveChanges(Number[][] values) {
					if(chart != null) {
						//find corresponding points
						Point [] points = serie.getPoints();
						for(int i=0;i < values.length;i++){
							for(int j=0;j < points.length;j++){
								if(points[j].getX().doubleValue() ==  values[i][0].doubleValue()  && 
								   points[j].getY().doubleValue() ==  values[i][1].doubleValue()){
									serie.removePoint(points[j], true, true);
									break;
								}
							}
						}
					}
				}
			});
		}
	    return dataGrid;
	}

	@Override
	public void update(String...args) {
		String title = args[0];
		String xLabel = args[1];
		String yLabel = args[2];
		
		//update chart axis
		chart.getYAxis().setAxisTitleText(yLabel);
		chart.getXAxis().setAxisTitleText(xLabel);
		chart.setChartTitle(new ChartTitle().setText(title).setX(-20)).setToolTip(new ToolTip().setFormatter(new ToolTipFormatter() {
			public String format(ToolTipData toolTipData) {
				return "<b>" + toolTipData.getXAsString() + "," + toolTipData.getYAsDouble();
			}
		}));
		
		//update data table
		dataGrid.update(xLabel, yLabel);
		
		//redraw chart
		chart.redraw();
	}

	@Override
	public CHART_TYPE getType() {
		return CHART_TYPE.VERSUS_LINE;
	}

	@Override
	public void switchMode(MODE mode) {
		if(dataGrid != null) {
			dataGrid.switchMode(mode);
		}
	}
}
