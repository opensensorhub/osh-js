package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasVerticalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.IParsingObserver;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;
import com.sensia.swetools.editors.sensorml.client.listeners.LoadButtonClickListener;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.MODE;

public class CenterPanel extends Composite implements IParsingObserver{
	private static final long serialVersionUID = -7684111574093800909L;

	private final String[] LIST_PROFILES = {
			//"frame-sensor-model",
			//"anemometer",
			"thermometer-minimal-view",
			//"thermometer-minimal-edit"
	};
	
	private VerticalPanel dynamicCenterPanel;
	private CheckBox edit;
	private ISensorWidget root;
	
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
		edit = new CheckBox("Edit");
		
		panel.add(title);
		panel.add(profileListBox);
		panel.add(load);
		panel.add(edit);
		
		edit.setVisible(false);
		
		edit.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				if(root != null){
					MODE mode = (edit.isChecked()) ? MODE.EDIT : MODE.VIEW;
					root.switchMode(mode);
				}
			}
		});

		dynamicCenterPanel = new VerticalPanel();
		
		final VerticalPanel verticalPanel = new VerticalPanel();
		verticalPanel.add(panel);
		verticalPanel.add(dynamicCenterPanel);
		initWidget(verticalPanel);
		
		load.addClickHandler(new LoadButtonClickListener(profileListBox, sgmlEditorProcessor,edit));
	}

	/*
	 * (non-Javadoc)
	 * @see com.sensia.swetools.editors.sensorml.client.IParsingObserver#parseDone(com.sensia.swetools.editors.sensorml.client.panels.model.INodeWidget)
	 */
	@Override
	public void parseDone(final ISensorWidget topElement) {
		dynamicCenterPanel.clear();
		dynamicCenterPanel.add(topElement.getPanel());
		root = topElement;
	}
}
