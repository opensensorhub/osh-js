package com.sensia.swetools.editors.sensorml.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.RootLayoutPanel;
import com.google.gwt.user.client.ui.RootPanel;
import com.sensia.gwt.relaxNG.RNGParser;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class SensorMLModule implements EntryPoint {

	public void onModuleLoad() {
		RNGParser.clearCache();

		RootPanel root = RootPanel.get("editor-area");
		if (root != null) {
			SensorMLEditor editor = new SensorMLEditor();
			editor.open(root);
		}

	}
}
