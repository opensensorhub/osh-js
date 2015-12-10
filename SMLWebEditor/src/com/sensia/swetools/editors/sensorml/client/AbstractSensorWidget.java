package com.sensia.swetools.editors.sensorml.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;

public abstract class AbstractSensorWidget{

	private String name;
	
	private String description;
	
	private static final int NORMALIZE_DOT_SEPARATOR_SIZE = 70;
	
	protected AbstractSensorWidget(final String name, final String description){
		this.name = name;
		this.description = description;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
	/**
	 * Get the corresponding widget.
	 * @return the corresponding widget
	 */
	public abstract Widget getWidget();
	
	public abstract Panel getPanel();
	
	public void addPanel(AbstractSensorWidget widget) {
		getPanel().add(widget.getPanel());
	}
	
	protected String SMLtoNiceLabel(String name) {
		// special cases
		if (name.equals("id"))
			name = "Local ID";
		else if (name.equals("beginPosition"))
			name = "Begin";
		else if (name.equals("endPosition"))
			name = "End";

		return toNiceLabel(name);
	}
    
	protected static String toNiceLabel(String name) {
		String label = toCamelCase(name).replace('_', ' ');
		StringBuilder b = new StringBuilder(label);

		if (label.length() > 1) {
			boolean space = true;

			for (int i = 1; i < b.length(); i++) {
				char c = b.charAt(i);
				if (!space && Character.isUpperCase(c)
						&& Character.isLowerCase(b.charAt(i - 1))) {
					b.insert(i, ' ');
					space = true;
					i++;
				}

				else if (c == ' ')
					space = true;

				else
					space = false;
			}
		}

		return b.toString();
	}

	protected static String toCamelCase(String s) {
		String s1 = s.substring(0, 1).toUpperCase();
		if (s.length() > 1)
			s1 += s.substring(1);
		return s1;
	}
	

	protected String getNormalizedLabel(int originalSize) {
		String newValue = "";
		for(int i=0;i < NORMALIZE_DOT_SEPARATOR_SIZE;i++) {
			newValue += ".";
		}
		return newValue;
	}
}
