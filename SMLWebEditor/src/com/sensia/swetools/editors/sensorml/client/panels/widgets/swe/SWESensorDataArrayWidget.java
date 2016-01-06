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
import com.googlecode.gwt.charts.client.ChartLoader;
import com.googlecode.gwt.charts.client.ChartPackage;
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
	
	private boolean initTable;
	
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
		
		initTable = false;
	}

	@Override
	public Panel getPanel() {
		if(!initTable) {
			createTable();
			getParent().getPanel().add(disclosurePanel);
		}
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
			blockSeparator = widget.getValue("blockSeparator");
		}else if(widget.getName().equals("values") && widget.getType() == TAG_TYPE.ELEMENT  && widget.getDef() == TAG_DEF.SWE) {
			values = widget.getValue("values");
		}//skip others
	}

	/**
	 * THe table is created after getting the separators AND values
	 */
	private void createTable() {
		if(tokenSeparator == null || tokenSeparator.isEmpty()) {
			tokenSeparator = " ";
		}
		
		if(blockSeparator == null || blockSeparator.isEmpty()) {
			blockSeparator = " ";
		}
		
		//find fields
		List<ISensorWidget> fields = findWidgets(this, "field", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		if(fields.size() == 2) {
			create1LineVersusChart(fields.get(0), fields.get(1));
		}
		
		initTable = true;
	}
	
	private void create1LineVersusChart(ISensorWidget data1,ISensorWidget data2) {
		String uom1 = "No supported uom";
		String label1 = "No supported label";
		
		String uom2 = "No supported uom";
		String label2 = "No supported label";
		
		//handle data 1
		ISensorWidget quantity = findWidget(data1, "Quantity", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		//if Quantity found
		//TODO: add other tags if needed
		if(quantity != null) {
			label1 = quantity.getValue("label");
			if(label1 == null) {
				label1 = quantity.getValue("name");
			}
			
			ISensorWidget uom = findWidget(quantity, "uom", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
			if(uom != null) {
				String uomValue = uom.getValue("code");
				if(uomValue != null) {
					uom1 = uomValue;
				}
			}
		}
		
		//handle data 2
		quantity = findWidget(data2, "Quantity", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		//if Quantity found
		//TODO: add other tags if needed
		if(quantity != null) {
			label2 = quantity.getValue("label");
			if(label2 == null) {
				label2 = quantity.getValue("name");
			}
			
			ISensorWidget uom = findWidget(quantity, "uom", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
			if(uom != null) {
				String uomValue = uom.getValue("code");
				if(uomValue != null) {
					uom2 = uomValue;
				}
			}
		}
		
		//built values array
		String [] tokens = values.split(tokenSeparator);
		
		if(tokens != null && tokens.length > 0) {
			final double [][] valuesArray = new double[tokens.length][2];
			
			int pos = 0;
			for(String token : tokens) {
				String[] block = token.split(blockSeparator);
				if(block != null && block.length == 2) {
					valuesArray[pos][0] = Double.parseDouble(block[0]);
					valuesArray[pos][1] = Double.parseDouble(block[1]);
				}
				pos++;
			}
			
			final String xLabel = uom2;
			final String yLabel = uom1;
			
			final String title = label2 + " vs. "+label1;
			
			 // Create the API Loader
            ChartLoader chartLoader = new ChartLoader(ChartPackage.CORECHART);
            chartLoader.loadApi(new Runnable() {

                    @Override
                    public void run() {
                    	// Prepare the data
            			DataTable dataTable = DataTable.create();
            			dataTable.addColumn(ColumnType.NUMBER);
            			dataTable.addColumn(ColumnType.NUMBER);
            			
            			dataTable.addRows(valuesArray.length);
            			
            			for (int i = 0; i < valuesArray.length; i++) {
            				dataTable.setValue(i, 0, valuesArray[i][1]);
            				dataTable.setValue(i, 1, valuesArray[i][0]);
            			}
            			
            			// Set options
            			LineChartOptions options = LineChartOptions.create();
            			options.setBackgroundColor("#f0f0f0");
            			options.setFontName("Tahoma");
            			options.setTitle(title);
            			options.setHAxis(HAxis.create(xLabel));
            			options.setVAxis(VAxis.create(yLabel));
            			options.setWidth(600);
            			options.setHeight(400);
            			
            			// Draw the chart
            			LineChart chart = new LineChart();
            			innerContainer.add(chart);
            			chart.draw(dataTable, options);
                    }
            });
		}
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
