package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_DEF;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.TAG_TYPE;

public class SWESensorQuantityWidget extends AbstractSensorElementWidget{

	private HorizontalPanel quantityPanel;
	private HorizontalPanel container;
	private HorizontalPanel defPanel;
	private HorizontalPanel uomPanel;
	protected HorizontalPanel advancedPanel;
	protected VerticalPanel editPanel;
	
	//edit Panel
	private TextBox definitionBox;
	private TextBox nameBox;
	private TextBox uomBox;
	private TextBox valueBox;
	
	public SWESensorQuantityWidget() {
		super("Quantity",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		container = new HorizontalPanel();
		defPanel = new HorizontalPanel();
		quantityPanel = new HorizontalPanel();
		uomPanel = new HorizontalPanel();
		advancedPanel = new HorizontalPanel();
		
		container.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		defPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		uomPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		quantityPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_LEFT);
		
		advancedPanel.addStyleName("rng-advanced-button");
		advancedPanel.setTitle("Edit Quantity");
		
		FocusPanel wrapper = new FocusPanel();
		wrapper.add(advancedPanel);
		wrapper.addClickHandler(new ClickHandler() {
		  @Override
		  public void onClick(ClickEvent event) {
			  displayEditPanel(getAdvancedPanel(),"Edit Quantity",new IButtonCallback() {
					@Override
					public void onClick() {
						if(definitionBox != null) {
							//update definition
							setValue("definition", definitionBox.getText());
						}
						if(uomBox != null) {
							//update uom
							setValue("code", uomBox.getText());
						}
						if(nameBox != null) {
							//update name
							setValue("name", nameBox.getText());
						}
						if(valueBox != null) {
							//update value
							setValue("value", valueBox.getText());
						}
						
						//update chart into DataArray
						getParent().refresh();
					}
				});
		  }
		});
		
		container.add(quantityPanel);
		container.add(uomPanel);
		container.add(defPanel);
		container.add(wrapper);
		
		activeMode(getMode());
		
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
		advancedPanel.setVisible(getMode() == MODE.EDIT);
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getType() == TAG_TYPE.ATTRIBUTE && widget.getName().equals("definition")){
			defPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("uom")){
			uomPanel.add(widget.getPanel());
		} else if(widget.getType() == TAG_TYPE.ELEMENT && widget.getName().equals("value")){
			quantityPanel.add(widget.getPanel());
		} else {
			uomPanel.add(widget.getPanel());
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorQuantityWidget();
	}

	public Panel getAdvancedPanel() {
		if(editPanel == null){
			editPanel = new VerticalPanel();
			editPanel.setSpacing(10);
			for(ISensorWidget child : getElements()) {
				if(child.getType() == TAG_TYPE.ATTRIBUTE && child.getName().equals("definition")){
					Panel aPanel = getEditPanel(child.getName());
					String value = getValue("definition");
					definitionBox = new TextBox();
					definitionBox.setWidth("500px");
					definitionBox.setText(value);
					
					aPanel.add(definitionBox);
					editPanel.add(aPanel);
				} else if(child.getType() == TAG_TYPE.ELEMENT && child.getName().equals("uom")){
					Panel aPanel = getEditPanel(child.getName());
					
					String value = getValue("code");
					uomBox = new TextBox();
					uomBox.setWidth("500px");
					uomBox.setText(value);
					
					aPanel.add(uomBox);
					editPanel.add(aPanel);
				} else if(child.getType() == TAG_TYPE.ELEMENT && child.getName().equals("value")){
					Panel aPanel = getEditPanel(child.getName());
					String value = getValue("value");
					valueBox = new TextBox();
					valueBox.setWidth("500px");
					valueBox.setText(value);
					
					aPanel.add(valueBox);
					editPanel.add(aPanel);
				} else if(child.getType() == TAG_TYPE.ELEMENT && child.getName().equals("name")){
					Panel aPanel = getEditPanel(child.getName());
					String value = getValue("name");
					nameBox = new TextBox();
					nameBox.setWidth("500px");
					nameBox.setText(value);
					
					aPanel.add(nameBox);
					editPanel.add(aPanel);
				}
			}
		}
		return editPanel;
	}
}
