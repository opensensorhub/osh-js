package com.sensia.swetools.editors.sensorml.client.panels.elements;

import com.google.gwt.regexp.shared.RegExp;
import com.google.gwt.regexp.shared.SplitResult;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;
import com.sensia.relaxNG.RNGAttribute;
import com.sensia.swetools.editors.sensorml.client.AbstractSensorWidget;

/**
 * Create the generic panel for RNG Attribute
 * @author mathieu dhainaut
 */
public class RNGAttributeWidget extends AbstractSensorWidget{

	private static final int NORMALIZE_STRING_LENGTH = 150;

	private HorizontalPanel panel;
	
	private String value = "";
	private Label label;
	
	
	public RNGAttributeWidget(final RNGAttribute attribute) {
		super(fixedLengthString(attribute.getName(),NORMALIZE_STRING_LENGTH),"");
		panel = new HorizontalPanel();
        panel.setSpacing(5);
        label = new Label(getName());
        panel.add(label);
	}
	
	@Override
	public Widget getWidget() {
		return panel;
	}

	@Override
	public Panel getPanel() {
		return panel;
	}
	
	public void addPanel(AbstractSensorWidget widget) {
		if(widget instanceof RNGValueWidget) {
			value = widget.getName();
		} else {
			super.addPanel(widget);
		}
	}
	
	public void setValue(String value) {
		this.value = value;
		label.setText(fixedLengthString(this.value,NORMALIZE_STRING_LENGTH));
	}
	public String getValue() {
		return value;
	}

	//TODO : do not fix length
	public static String fixedLengthString(final String format, final Object... args) {
		  final RegExp regex = RegExp.compile("%[a-z]");
		  final SplitResult split = regex.split(format);
		  final StringBuffer msg = new StringBuffer();
		  for (int pos = 0; pos < split.length() - 1; ++pos) {
		    msg.append(split.get(pos));
		    msg.append(args[pos].toString());
		  }
		  msg.append(split.get(split.length() - 1));
		  return msg.toString();
		}
}
