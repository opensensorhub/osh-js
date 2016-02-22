package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.FocusPanel;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Image;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.line.SensorGenericLineWidget;
import com.sensia.swetools.editors.sensorml.client.utils.Utils;
	
public class SWESensorCondtionWidget extends AbstractSensorElementWidget{

	private HorizontalPanel container;
	
	private SensorGenericLineWidget innerContainer;
	
	public SWESensorCondtionWidget() {
		super("condition",TAG_DEF.SWE,TAG_TYPE.ATTRIBUTE);
		//create panels
		container = new HorizontalPanel();
		innerContainer = new SensorGenericLineWidget("conditionInner",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
		
		Image conditionImage = new Image(GWT.getModuleBaseURL()+"images/condition.png");
		conditionImage.setTitle("Condition");
		
		FocusPanel conditionImageWrapper = new FocusPanel(conditionImage);
		
		//add icons
		conditionImageWrapper.addStyleName("graphic-icon");
		
		//add to container
		container.add(conditionImageWrapper);
		
		//add listeners
		conditionImageWrapper.addClickHandler(new ConditionImageWrapperHandler());
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
		innerContainer.addElement(widget);
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorCondtionWidget();
	}
	
	@Override
	public APPENDER appendTo() {
		return APPENDER.HORIZONTAL;
	}
	
	public boolean isIcon() {
		return true;
	}
	
	private class ConditionImageWrapperHandler implements ClickHandler{

		@Override
		public void onClick(ClickEvent event) {
			final DialogBox dialogBox = Utils.createDialogBox(innerContainer.getPanel(),"Condition",null);
			dialogBox.show();
		}
	}

}
