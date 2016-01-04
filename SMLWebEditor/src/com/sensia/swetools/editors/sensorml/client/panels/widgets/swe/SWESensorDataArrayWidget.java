package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.DisclosurePanel;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.googlecode.gwt.charts.client.ColumnType;
import com.googlecode.gwt.charts.client.DataTable;
import com.googlecode.gwt.charts.client.corechart.LineChart;
import com.googlecode.gwt.charts.client.corechart.LineChartOptions;
import com.googlecode.gwt.charts.client.options.HAxis;
import com.googlecode.gwt.charts.client.options.VAxis;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorDataArrayWidget extends AbstractSensorElementWidget{

	private HorizontalPanel container;
	
	private VerticalPanel innerContainer;
	private DisclosurePanel disclosurePanel;
	
	private HorizontalPanel defPanel;
	protected HorizontalPanel advancedPanel;
	protected VerticalPanel editPanel;
	
	private String tokenSeparator;
	private String blockSeparator;
	private String values;
	
	//edit panel
	private TextBox definitionBox;
	
	public SWESensorDataArrayWidget() {
		super("DataArray", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		innerContainer = new VerticalPanel();
		advancedPanel = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		disclosurePanel = new DisclosurePanel();
		disclosurePanel.setOpen(false);
		disclosurePanel.setAnimationEnabled(true);
		
		Image defImage = new Image(GWT.getModuleBaseURL()+"images/data_array.png");
		defImage.setTitle("DataArray");
		
		disclosurePanel.setContent(innerContainer);
		defImage.setTitle("DataArray");
		
		defImage.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				disclosurePanel.setOpen(!disclosurePanel.isOpen());
			}
		});
		
		advancedPanel.addStyleName("rng-advanced-button");
		advancedPanel.setTitle("Edit Data Array");
		
		FocusPanel wrapper = new FocusPanel();
		wrapper.add(advancedPanel);
		wrapper.addClickHandler(new ClickHandler() {
		  @Override
		  public void onClick(ClickEvent event) {
			  displayEditPanel(getAdvancedPanel(),"Edit DataArray",new IButtonCallback() {
					@Override
					public void onClick() {
						if(definitionBox != null) {
							//update definition
							setValue("definition", definitionBox.getText());
						}
					}
				});
		  }
		});
		
		container.add(defImage);
		container.add(new HTML("&nbsp;&nbsp;"));
		container.add(defPanel);
		container.add(wrapper);
	}

	@Override
	public Panel getPanel() {
		getParent().getPanel().add(disclosurePanel);
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
		
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if((widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition"))){
			defPanel.add(widget.getPanel());
		} else if(widget.getName().equals("elementType") && widget.getType() == TAG_TYPE.ELEMENT  && widget.getDef() == TAG_DEF.SWE) {
			innerContainer.add(widget.getPanel());
		} else if(widget.getName().equals("encoding") && widget.getType() == TAG_TYPE.ELEMENT  && widget.getDef() == TAG_DEF.SWE) {
			tokenSeparator = widget.getValue("tokenSeparator");
			if(tokenSeparator == null || tokenSeparator.isEmpty()) {
				tokenSeparator = " ";
			}
			
			blockSeparator = widget.getValue("blockSeparator");
			
			if(blockSeparator == null || blockSeparator.isEmpty()) {
				blockSeparator = " ";
			}
			if(values != null) {
				createTable();
			}
		}else if(widget.getName().equals("values") && widget.getType() == TAG_TYPE.ELEMENT  && widget.getDef() == TAG_DEF.SWE) {
			values = widget.getValue("values");
			if(tokenSeparator != null && blockSeparator != null) {
				createTable();
			}
		}//skip others
	}

	/**
	 * THe table is created after getting the separators AND values
	 */
	private void createTable() {
		/*String [] blocks = values.split(blockSeparator);
		
		if(blocks != null && blocks.length > 0) {
			List<String[]> valuesArray = new ArrayList<String[]>();
			
			int maxNumberOfLinesChart = 0;
			
			for(int i=0;i < blocks.length;i++){
				String [] token = blocks[i].split(tokenSeparator);
				valuesArray.add(token);
				maxNumberOfLinesChart = Math.max(maxNumberOfLinesChart, token.length);
			}
			
			String[] legends = new String[] { "Temperature(cel)","Resistance(kohm)" };
			
			int[] x = new int[50];
			for(int i=0;i < 50;i++) {
				x[i] = i;
			}
			
			
			int[][] values = new int[][] { { 1336060, 1538156, 1576579, 1600652, 1968113, 1901067 },
					{ 400361, 366849, 440514, 434552, 393032, 517206 },
					{ 1001582, 1119450, 993360, 1004163, 979198, 916965 },
					{ 997974, 941795, 930593, 897127, 1080887, 1056036 } };

			
			// Prepare the data
			DataTable dataTable = DataTable.create();
			dataTable.addColumn(ColumnType.STRING, "Cel/Kohm");
			for (int i = 0; i < legends.length; i++) {
				dataTable.addColumn(ColumnType.NUMBER, countries[i]);
			}
			dataTable.addRows(years.length);
			for (int i = 0; i < years.length; i++) {
				dataTable.setValue(i, 0, String.valueOf(years[i]));
			}
			for (int col = 0; col < values.length; col++) {
				for (int row = 0; row < values[col].length; row++) {
					dataTable.setValue(row, col + 1, values[col][row]);
				}
			}

			// Set options
			LineChartOptions options = LineChartOptions.create();
			options.setBackgroundColor("#f0f0f0");
			options.setFontName("Tahoma");
			options.setTitle("TODO");
			options.setHAxis(HAxis.create("TODO"));
			options.setVAxis(VAxis.create("TODO"));
			
			LineChart chart = new LineChart();
			
			// Draw the chart
			chart.draw(dataTable, options);
		}*/
	}
	
	private Panel getAdvancedPanel() {
		if(editPanel == null){
			editPanel = new VerticalPanel();
			editPanel.setSpacing(10);
			for(ISensorWidget child : getElements()) {
				if((child.getType() == TAG_TYPE.ATTRIBUTE && child.getName().equals("definition"))){
					Panel aPanel = getEditPanel(child.getName());
					String value = getValue("definition");
					definitionBox = new TextBox();
					definitionBox.setWidth("500px");
					definitionBox.setText(value);
					
					aPanel.add(definitionBox);
					editPanel.add(aPanel);
				}
			}
		}
		return editPanel;
	}
	
	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorDataArrayWidget();
	}

}
