package com.sensia.swetools.editors.sensorml.client.listeners;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.ListBox;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;

public class LoadButtonClickListener implements ClickHandler{

	private ListBox profileListBox;
	private RNGProcessorSML sgmlEditorProcessor;
	private CheckBox edit;
	
	public LoadButtonClickListener(final ListBox profileListBox,final RNGProcessorSML sgmlEditorProcessor,CheckBox edit) {
		this.profileListBox = profileListBox;
		this.sgmlEditorProcessor = sgmlEditorProcessor;
		this.edit = edit;
	}
	
	@Override
	public void onClick(ClickEvent event) {
		String value = profileListBox.getValue(profileListBox.getSelectedIndex());
		if(value != null && !value.isEmpty()){
			final String url = "rng1.0/profiles/CSM/"+value+".rng";
			sgmlEditorProcessor.parse(url);
			edit.setVisible(true);
			edit.setChecked(false);
		}
	}

}
