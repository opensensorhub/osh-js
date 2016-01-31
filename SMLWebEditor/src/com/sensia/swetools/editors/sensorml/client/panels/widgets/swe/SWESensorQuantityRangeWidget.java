package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorQuantityRangeWidget extends AbstractSensorElementWidget{

	private HorizontalPanel minPanel;
	private HorizontalPanel maxPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	
	private ISensorWidget rangeValueWidget;
	
	public SWESensorQuantityRangeWidget() {
		super("QuantityRange",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		minPanel = new HorizontalPanel();
		maxPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		uomPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		minPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		maxPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		container.add(minPanel);
		container.add(new HTML("&nbsp;&nbsp;to&nbsp;&nbsp;"));
		container.add(maxPanel);
		container.add(uomPanel);
		container.add(defPanel);
		
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
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("uom")){
			uomPanel.add(widget.getPanel());
		} else if(widget.getName().equals("value") && widget.getType() == TAG_TYPE.ELEMENT && widget.getDef() == TAG_DEF.SWE){
			if(widget.getElements().size() >= 1) {
				//FIXME:
				//Hack to get the both values of min max given <swe:value>-0.5 0.5</swe:value>
				String value = widget.getValue("value");
				if(value != null) {
					String [] split = value.split(" ");
					if(split != null && split.length == 2) {
						minPanel.add(new HTML(split[0]));
						maxPanel.add(new HTML(split[1]+"&nbsp;"));
						rangeValueWidget = widget;
					} else {
						minPanel.add(widget.getElements().get(0).getPanel());
					}
				}else {
					minPanel.add(widget.getElements().get(0).getPanel());
				}
			}
			if(widget.getElements().size() >= 2) {
				maxPanel.add(widget.getElements().get(1).getPanel());
			}
		} else {
			uomPanel.add(widget.getPanel());
		}
		
		//add advanced panel
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorQuantityRangeWidget();
	}
	
	@Override
	public boolean appendToLine() {
		return true;
	}
	
	@Override
	public void refresh() {
		super.refresh();
		
		//FIXME : should be driven by the RNG profile
		//update value by splitting min/max
		if(rangeValueWidget != null) {
			String value = rangeValueWidget.getValue("value");
			String [] split = value.split(" ");
			if(split.length == 2) {
				minPanel.clear();
				maxPanel.clear();
				
				minPanel.add(new HTML(split[0]));
				maxPanel.add(new HTML(split[1]+"&nbsp;"));
			}
		}
		
	}
}
