package com.sensia.swetools.editors.sensorml.client.panels.widgets.swe;

import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.AbstractSensorElementWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.base.line.SensorGenericLineWidget;

public class SWESensorFieldWidget extends AbstractSensorElementWidget{

	private ISensorWidget lineWidget;
	
	public SWESensorFieldWidget(){
		super("field",TAG_DEF.SWE,TAG_TYPE.ELEMENT);
	}

	@Override
	protected void addSensorWidget(ISensorWidget widget) {
		//skip embedded DataRecord
		if(widget.getName().equals("DataRecord") && widget.getDef() == TAG_DEF.SWE) {
			for(ISensorWidget child : widget.getElements()) {
				addSensorWidget(child);
			}
		} else {
			if(lineWidget == null) {
				lineWidget = new SensorGenericLineWidget("field", TAG_DEF.SWE, TAG_TYPE.ELEMENT);
			}
			lineWidget.addElement(widget);
		}
	}

	@Override
	protected AbstractSensorElementWidget newInstance() {
		return new SWESensorFieldWidget();
	}

	@Override
	public Panel getPanel() {
		if(lineWidget != null) {
			return lineWidget.getPanel();
		} else {
			return new HorizontalPanel();
		}
	}

	@Override
	protected void activeMode(MODE mode) {
		if(lineWidget != null) {
			lineWidget.switchMode(mode);
		}
	}
}
