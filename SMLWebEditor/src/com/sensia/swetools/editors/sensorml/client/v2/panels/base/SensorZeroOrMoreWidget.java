package com.sensia.swetools.editors.sensorml.client.v2.panels.base;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.relaxNG.RNGZeroOrMore;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public class SensorZeroOrMoreWidget extends AbstractSensorElementWidget{

	private ISensorWidget panelToAdd;
	private VerticalPanel container;
	private VerticalPanel innerContainer;
	
	public SensorZeroOrMoreWidget(final RNGZeroOrMore zeroOrMore) {
		super("zeroOrMore", TAG_DEF.RNG, TAG_TYPE.ZERO_OR_MORE);
		
		container = new VerticalPanel();
		innerContainer = new VerticalPanel();
		
		Label addButton = new Label(zeroOrMore.getAnnotation());
		addButton.addStyleName("rng-optional-select");
		
		addButton.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				if(panelToAdd != null && getMode() == MODE.EDIT) {
					innerContainer.add(panelToAdd.getPanel());
				}
			}
		});
		
		final HorizontalPanel morePanel = new HorizontalPanel();
		morePanel.add(addButton);
		morePanel.add(new HTML(findLabel(zeroOrMore)));
		
		getPanel().add(innerContainer);
		getPanel().add(morePanel);
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		panelToAdd = widget;
	}

	@Override
	public Panel getPanel() {
		return container;
	}

}
