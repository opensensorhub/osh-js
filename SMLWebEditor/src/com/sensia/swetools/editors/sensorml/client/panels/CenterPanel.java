package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasVerticalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.IParsingObserver;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.listeners.LoadButtonClickListener;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget.MODE;

public class CenterPanel extends Composite implements IParsingObserver{
	private static final long serialVersionUID = -7684111574093800909L;

	private final String[] LIST_PROFILES = {
			"anemometer",
			"frame-sensor-model",
			"csm-common",
			"geopositioning-models",
			"optical-sensor-parameters",
			"pushbroom-sensor-model",
			"scanner-sensor-parameters",
			"whiskbroom-sensor-model"
	};
	
	private VerticalPanel dynamicCenterPanel;
	private Button edit;
	
	public CenterPanel(final RNGProcessorSML sgmlEditorProcessor){
		sgmlEditorProcessor.addObserver(this);
		final HorizontalPanel panel = new HorizontalPanel();
		panel.setSpacing(20);
		panel.setVerticalAlignment(HasVerticalAlignment.ALIGN_MIDDLE);
		
		final ListBox profileListBox = new ListBox(false);
		
		profileListBox.addItem("");
		for(final String profile : LIST_PROFILES) {
			profileListBox.addItem(profile);
		}
		
		HTML title = new HTML("<b>Profiles:</b>");
		
		Button load = new Button("Load");
		edit = new Button("Edit");
		
		panel.add(title);
		panel.add(profileListBox);
		panel.add(load);
		panel.add(edit);
		
		edit.setVisible(false);
		
		dynamicCenterPanel = new VerticalPanel();
		
		final VerticalPanel verticalPanel = new VerticalPanel();
		verticalPanel.add(panel);
		verticalPanel.add(dynamicCenterPanel);
		initWidget(verticalPanel);
		
		load.addClickHandler(new LoadButtonClickListener(profileListBox, sgmlEditorProcessor));
	}

	/*
	 * (non-Javadoc)
	 * @see com.sensia.swetools.editors.sensorml.client.IParsingObserver#parseDone(com.sensia.swetools.editors.sensorml.client.panels.model.INodeWidget)
	 */
	@Override
	public void parseDone(final ISensorWidget topElement) {
		dynamicCenterPanel.clear();
		dynamicCenterPanel.add(topElement.getPanel());
		
		edit.setVisible(true);
		edit.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				topElement.switchMode(MODE.EDIT);
				edit.setEnabled(false);
			}
		});
	}
}
