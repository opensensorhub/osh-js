package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.swetools.editors.sensorml.client.AbstractWidget;

/**
 * Temporary class to accept non-mapped panel elements
 * @author mathieu dhainaut
 *
 */
public class GenericContainerWidget extends AbstractWidget{

	private Widget widget;
	private Panel panel;
	
	public GenericContainerWidget() {
		super("", "");
	}

	public void setWidget(Widget widget) {
		this.widget = widget;
	}
	
	public void setPanel(Panel panel) {
		this.panel = panel;
	}
	
	@Override
	public Widget getWidget() {
		return widget;
	}

	@Override
	public Panel getPanel() {
		return panel;
	}

}
