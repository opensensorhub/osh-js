package com.sensia.swetools.editors.sensorml.client.v2.panels.base;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.google.gwt.core.shared.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.relaxNG.RNGZeroOrMore;
import com.sensia.swetools.editors.sensorml.client.panels.Utils;
import com.sensia.swetools.editors.sensorml.client.v2.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.v2.panels.base.xsd.SensorXSDDecimalWidget;

public class SensorZeroOrMoreWidget extends AbstractSensorElementWidget{

	private VerticalPanel container;
	private RNGZeroOrMore zeroOrMore;
	
	public SensorZeroOrMoreWidget(final RNGZeroOrMore zeroOrMore) {
		super("zeroOrMore", TAG_DEF.RNG, TAG_TYPE.ZERO_OR_MORE);
		
		this.zeroOrMore = zeroOrMore;
		container = new VerticalPanel();
		
		Label addButton = new Label(zeroOrMore.getAnnotation());
		addButton.addStyleName("rng-optional-select");
		
		addButton.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				if(!getElements().isEmpty() && getMode() == MODE.EDIT) {
					//concatenates every panels
					VerticalPanel allEditPanels = new VerticalPanel();
					for(final ISensorWidget panelToAdd : getElements()) {
						ISensorWidget clone = panelToAdd.cloneSensorWidget();
						if(clone != null) {
							allEditPanels.add(clone.getPanel());	
						} else {
							GWT.log("Clone method is not implemented yet for class : "+panelToAdd.getClass().toString());
						}
						
					}
					
					final DialogBox dialogBox = Utils.createDialogBox(allEditPanels);
					dialogBox.show();
				}
			}
		});
		
		final HorizontalPanel morePanel = new HorizontalPanel();
		morePanel.add(addButton);
		morePanel.add(new HTML(findLabel(zeroOrMore)));
		
		getPanel().add(morePanel);
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		//do nothing
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
	protected AbstractSensorElementWidget newInstance() {
		return new SensorZeroOrMoreWidget(zeroOrMore);
	}
}
