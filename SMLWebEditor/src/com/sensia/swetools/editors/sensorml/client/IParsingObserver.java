package com.sensia.swetools.editors.sensorml.client;

import java.io.Serializable;

import com.sensia.swetools.editors.sensorml.client.v2.ISensorWidget;

public interface IParsingObserver extends Serializable{

	/**
	 * Callback the tree of created Widgets .
	 * @param root The root element of the Tree-based structure
	 */
	void parseDone(ISensorWidget topElement);
}
