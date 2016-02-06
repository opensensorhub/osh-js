package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

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
import com.google.gwt.user.client.ui.SimplePanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.panels.charts.ISensorChart;
import com.sensia.swetools.editors.sensorml.client.panels.charts.SWESensorDataArrayChartHelper;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;

/*public class SWESensorDataArrayWidget extends AbstractSensorElementWidget{

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
	
	private ISensorChart chart;
	
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
			  VerticalPanel container = new VerticalPanel();
			  getAdvancedPanel(container);
			  displayEditPanel(container,"Edit DataArray",new IButtonCallback() {
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
		
		advancedPanel.setVisible(getMode() == MODE.EDIT);
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
		advancedPanel.setVisible(getMode() == MODE.EDIT);
		chart.switchMode(mode);
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
			if(values != null) {
				values = values.replaceAll("\n", "").replaceAll("\\s+", " ").trim();
			}
		}//skip others
	}

	//
	//  THe table is created after getting the separators AND values
	//
	private void createTable() {
		if(tokenSeparator == null || tokenSeparator.isEmpty()) {
			tokenSeparator = " ";
		}
		
		if(blockSeparator == null || blockSeparator.isEmpty()) {
			blockSeparator = " ";
		}
		
		//find fields
		chart = SWESensorDataArrayChartHelper.createChart(this, values, tokenSeparator, blockSeparator);
		
		if(chart != null) {
			HorizontalPanel hPanel = new HorizontalPanel();
			hPanel.add(chart.getChart());
			hPanel.add(chart.getTable());
			innerContainer.add(hPanel);
		}
		
		initTable = true;
	}
	
	@Override
	public void refresh() {
		SWESensorDataArrayChartHelper.updateChart(chart, this, values, tokenSeparator, blockSeparator);
	}
	
	@Override
	public void getAdvancedPanel(Panel container){
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
		container.add(editPanel);
	}
	
	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorDataArrayWidget();
	}
	
	@Override
	public boolean appendToLine() {
		return true;
	}
}*/
/**
 * The DataArray is represented as a part of a line such as : 
 * @author nevro
 *
 */
public class SWESensorDataArrayWidget extends AbstractSensorElementWidget {
	
	private static final String VS = " vs ";

	private HorizontalPanel container;
	
	private String values;
	private String blockSeparator;
	private String tokenSeparator;
	private String decimalSeparator;
	
	private Panel concatenedAxisNamesPanel;
	private Panel defPanel;
	
	private ISensorChart chart;
	
	public SWESensorDataArrayWidget() {
		super("DataArray", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		
		//create panels
		container = new HorizontalPanel();
		concatenedAxisNamesPanel = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		
		Image graphicImage = new Image(GWT.getModuleBaseURL()+"images/data_array.png");
		graphicImage.setTitle("Graphic");
		
		Image tableImage = new Image(GWT.getModuleBaseURL()+"images/table.png");
		tableImage.setTitle("Table");
		
		FocusPanel graphicImageWrapper = new FocusPanel(graphicImage);
		FocusPanel tableImageWrapper = new FocusPanel(tableImage);
		
		//add icons
		graphicImageWrapper.addStyleName("graphic-icon");
		tableImageWrapper.addStyleName("graphic-icon");
		defPanel.addStyleName("graphic-icon");
		
		//add to container
		container.add(concatenedAxisNamesPanel);
		container.add(graphicImageWrapper);
		container.add(tableImageWrapper);
		container.add(defPanel);
		
		
		//add listeners
		graphicImageWrapper.addClickHandler(new GraphicImageWrapperHandler());
		tableImageWrapper.addClickHandler(new TableImageWrapperHandler());
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getDef() == TAG_DEF.SWE) {
			String name = widget.getName();
			if(name.equals("encoding")) {
				//looking for separator
				//<swe:TextEncoding tokenSeparator="" blockSeparator="" decimalSeparator="" />
				tokenSeparator = widget.getValue("tokenSeparator");
				blockSeparator = widget.getValue("blockSeparator");
				decimalSeparator = widget.getValue("decimalSeparator");
			} else if(name.equals("values")) {
				//<swe:values>...</swe:values>
				values = widget.getValue("values");
				if(values != null) {
					values = values.replaceAll("\n", "").replaceAll("\\s+", " ").trim();
				}
			} else if(name.equals("elementType")) {
				//looking for fields
				List<ISensorWidget> fields = findWidgets(widget, "field", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
				
				//<swe:DataRecord> <swe:field name=".."> ... </swe:field> </swe:DataRecord>
				String concatenedAxisNames = "";
				for(ISensorWidget field : fields) {
					//prior label
					String label = field.getValue("label");
					if(label == null) {
						//if no label, takes the attribute name
						label = toNiceLabel(field.getValue("name"));
					}
					concatenedAxisNames +=  label + VS;
				}
				
				//remove extra "vs"
				if(!concatenedAxisNames.isEmpty()) {
					concatenedAxisNames = concatenedAxisNames.substring(0, concatenedAxisNames.length()-VS.length());
				}
				concatenedAxisNamesPanel.add(new HTML(concatenedAxisNames));
			}
		} else if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorDataArrayWidget();
	}
	
	@Override
	public boolean appendToLine() {
		return true;
	}
	
	private class GraphicImageWrapperHandler implements ClickHandler{

		@Override
		public void onClick(ClickEvent event) {
			if(chart == null) {
				chart = SWESensorDataArrayChartHelper.createChart(SWESensorDataArrayWidget.this, values, tokenSeparator, blockSeparator);
			}
			
			SimplePanel panel = new SimplePanel(chart.getChart());
			panel.addStyleName("graph-dataarray-panel");
		    displayEditPanel(panel,"Edit DataArray",null);
		}
	}
	
	private class TableImageWrapperHandler implements ClickHandler{

		@Override
		public void onClick(ClickEvent event) {
			if(chart == null) {
				chart = SWESensorDataArrayChartHelper.createChart(SWESensorDataArrayWidget.this, values, tokenSeparator, blockSeparator);
			}
			SimplePanel panel = new SimplePanel(chart.getTable());
			panel.addStyleName("table-dataarray-panel");
			
			chart.switchMode(getMode());
			
			IButtonCallback cb = null;
			
			if(getMode() == MODE.EDIT) {
				cb = new IButtonCallback() {
					
					@Override
					public void onClick() {
						
					}
				};
			}
			displayEditPanel(panel,"Edit DataArray",cb);
		}
	}
}
