package com.sensia.swetools.editors.sensorml.client.listeners;

import java.util.Map;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.CheckBox;
import com.google.gwt.user.client.ui.ListBox;
import com.sensia.swetools.editors.sensorml.client.RNGProcessorSML;

public class LoadButtonClickListener implements ClickHandler{

	private ListBox profileListBox;
	private RNGProcessorSML sgmlEditorProcessor;
	private CheckBox edit;
	private Map<String,String> profiles;
	
	public LoadButtonClickListener(final ListBox profileListBox,final Map<String,String> profiles,final RNGProcessorSML sgmlEditorProcessor,CheckBox edit) {
		this.profileListBox = profileListBox;
		this.sgmlEditorProcessor = sgmlEditorProcessor;
		this.edit = edit;
		this.profiles = profiles;
	}
	
	@Override
	public void onClick(ClickEvent event) {
		String key = profileListBox.getValue(profileListBox.getSelectedIndex());
		
		if(key != null && !key.isEmpty()){
			sgmlEditorProcessor.parse(profiles.get(key));
			if(edit != null) {
				edit.setVisible(true);
				edit.setChecked(false);
			}
		}
	}

}
