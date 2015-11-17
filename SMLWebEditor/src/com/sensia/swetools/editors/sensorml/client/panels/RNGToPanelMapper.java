package com.sensia.swetools.editors.sensorml.client.panels;

import com.sensia.relaxNG.RNGAttribute;
import com.sensia.relaxNG.RNGData;
import com.sensia.relaxNG.RNGElement;
import com.sensia.relaxNG.RNGRef;
import com.sensia.relaxNG.RNGTagList;
import com.sensia.relaxNG.RNGText;
import com.sensia.relaxNG.RNGValue;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.GenericElementLabelPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.GenericRefLabelPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.GenericTextPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.GenericValuePanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.GenericXSDPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.ISensorMLPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.ListPanels;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.SWEDataComponentPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.SWEDataComponentPropertyPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.SWELabeledFieldPanel;
import com.sensia.swetools.editors.sensorml.client.panels.elementsold.SWEPropertyPanel;

public final class RNGToPanelMapper {

	private RNGToPanelMapper() {}
	
	public static ISensorMLPanel getPanelFromRNG(final RNGElement element) {
		ISensorMLPanel widget = null;
		
		
		return widget;
	}
	
	public static ISensorMLPanel getGenericXSDPanel(final RNGData<?> data, final int length, final String allowedChars) {
		ISensorMLPanel panel = new GenericXSDPanel(data,length,allowedChars);
		return panel;
	}
	
	public static ISensorMLPanel getGenericValuePanel(final RNGValue val) {
		ISensorMLPanel panel = new GenericValuePanel(val.getText());
		return panel;
	}
	
	public static ISensorMLPanel getGenericDataPanel(final RNGData<?> data) {
		String value = null;
		if (data != null && data.getValue() != null){
			value = data.getValue().toString();
		}
		ISensorMLPanel panel = new GenericTextPanel(value);
		return panel;
	}
	
	public static ISensorMLPanel getGenericTextPanel(final RNGText text) {
		ISensorMLPanel panel = new GenericTextPanel(text.getText());
		return panel;
	}
	
	public static ISensorMLPanel getGenericLabelPanel(final RNGElement tag) {
		ISensorMLPanel panel = new GenericElementLabelPanel(toNiceLabel(tag.getName()));
		return panel;
	}
	
	public static ISensorMLPanel getGenericLabelPanel(final RNGAttribute tag) {
		ISensorMLPanel panel = new GenericElementLabelPanel(toNiceLabel(tag.getName()));
		return panel;
	}
	
	public static ISensorMLPanel getGenericLabelPanel(final RNGRef tag) {
		ISensorMLPanel	panel = new GenericRefLabelPanel(toNiceLabel("Error fetching referenced pattern: "
					+ ((RNGRef) tag).getPatternName()));
		return panel;
	}
	
	
	/*public static ISensorMLPanel getSWEPanel(RNGElement element) {
		ListPanels panels = new ListPanels();
		String eltName = element.getName();

		if (eltName.startsWith("Boolean") || eltName.startsWith("Quantity")
				|| eltName.startsWith("Count")
				|| eltName.startsWith("Category") || eltName.startsWith("Time")
				|| eltName.equals("Text") || eltName.equals("DataRecord")
				|| eltName.equals("Vector") || eltName.equals("DataArray")
				|| eltName.equals("Matrix") || eltName.equals("DataChoice")
				|| eltName.equals("DataStream")) {
			ISensorMLPanel panel = new SWEDataComponentPanel("Type: " + toNiceLabel(element.getName()));
		} else if (eltName.equals("field") || eltName.equals("coordinate")
				|| eltName.equals("elementType") || eltName.equals("item")
				|| eltName.equals("quality") || eltName.equals("encoding")) {
			 renderDataComponentProperty(elt);
			renderPropertyPanel(elt);
		} else if (eltName.equals("identifier") || eltName.equals("label")
				|| eltName.equals("description") || eltName.equals("uom")
				|| eltName.equals("value")) {
			renderLabeledField(elt, toNiceLabel(elt.getName()));
		} else {
			return null;
		}
	}*/
	
	public static ISensorMLPanel getSWEDataComponentPanel(RNGElement element) {
		ISensorMLPanel panel = new SWEDataComponentPanel("Type: " + toNiceLabel(element.getName()));
		return panel;
	}
	
	public static SWEDataComponentPropertyPanel getSWEDataComponentPropertyPanel(RNGElement element) {
		SWEDataComponentPropertyPanel panel = new SWEDataComponentPropertyPanel();
		return panel;
	}
	
	public static ISensorMLPanel getSWEDataPropertyPanel(RNGElement element) {
		ISensorMLPanel panel = new SWEPropertyPanel(toNiceLabel(element.getName()));
		return panel;
	}
	public static ISensorMLPanel getSWELabeledFieldPanel(RNGTagList tagList, String label) {
		ISensorMLPanel panel = new SWELabeledFieldPanel(tagList.getAnnotation(),toNiceLabel(label));
		return panel;
	}
	private static String toNiceLabelSWE(String name) {
		return "";
	}
	
	private static String toNiceLabel(String name) {
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

	private static String toCamelCase(String s) {
		String s1 = s.substring(0, 1).toUpperCase();
		if (s.length() > 1)
			s1 += s.substring(1);
		return s1;
	}
}
