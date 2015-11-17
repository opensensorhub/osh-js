package com.sensia.swetools.editors.sensorml.client;

import java.io.Serializable;
import java.util.List;

import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.ISensorMLPanel;

public interface IParsingObserver extends Serializable{

	/**
	 * Callback the tree of created Widgets .
	 * @param root The root element of the Tree-based structure
	 */
	void parseDone(List<AbstractWidget> topElements);
}
