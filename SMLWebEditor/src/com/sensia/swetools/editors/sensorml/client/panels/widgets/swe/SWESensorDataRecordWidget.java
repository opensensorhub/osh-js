package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;

public class SWESensorDataRecordWidget extends AbstractSensorElementWidget{

	private VerticalPanel container;
	
	private FocusPanel wrapperAdvancedPanel;
	private VerticalPanel editPanel;
	
	//edit panel
	private TextBox nameBox;
	
	public SWESensorDataRecordWidget() {
		super("DataRecord", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
		
		container = new VerticalPanel();
		HorizontalPanel advancedPanel = new HorizontalPanel();
		
		advancedPanel.addStyleName("rng-advanced-button");
		advancedPanel.setTitle("Edit Data Array");
		
		wrapperAdvancedPanel = new FocusPanel();
		wrapperAdvancedPanel.add(advancedPanel);
		
		final ISensorWidget currentWidget = this;
		wrapperAdvancedPanel.addClickHandler(new ClickHandler() {
		  @Override
		  public void onClick(ClickEvent event) {
			  displayEditPanel(getAdvancedPanel(),"Edit DataRecord",new IButtonCallback() {
					@Override
					public void onClick() {
						if(nameBox != null) {
							//update label
							ISensorWidget labelWidget = findWidget(currentWidget, "label", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
							labelWidget.setValue("label", nameBox.getText());
						}
					}
				});
		  }
		});
		
	}

	@Override
	public Panel getPanel() {
		return container;
	}

	@Override
	protected void activeMode(MODE mode) {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		if(widget.getName().equals("label") && widget.getDef() == TAG_DEF.SWE) {
			if(!widget.getElements().isEmpty()) {
				widget.getElements().get(0).getPanel().addStyleName("font-bold");
			}
			HorizontalPanel hPanel = new HorizontalPanel();
			hPanel.add(widget.getPanel());
			hPanel.add(wrapperAdvancedPanel);
			container.add(hPanel);
			
		} else {
			container.add(widget.getPanel());
		}
		
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorDataRecordWidget();
	}
	
	private Panel getAdvancedPanel() {
		if(editPanel == null){
			editPanel = new VerticalPanel();
			editPanel.setSpacing(10);

			String value = null;
			String name = "";
			for(ISensorWidget child : getElements()) {
				if((child.getType() == TAG_TYPE.ELEMENT && child.getName().equals("label"))){
					name = child.getName();
					value = getValue("label");
					break;
				} else if(child.getType() == TAG_TYPE.ATTRIBUTE && child.getName().equals("name")) {
					name = child.getName();
					value = getValue("name");
				}
			}
			
			Panel aPanel = getEditPanel(name);
			
			nameBox = new TextBox();
			nameBox.setWidth("500px");
			nameBox.setText(value);
			
			aPanel.add(nameBox);
			editPanel.add(aPanel);
			
		}
		return editPanel;
	}

}
