package com.sensia.swetools.editors.sensorml.client.ontology;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.cell.client.TextCell;
import com.google.gwt.event.shared.GwtEvent;
import com.google.gwt.event.shared.HandlerRegistration;
import com.google.gwt.safehtml.shared.SafeHtml;
import com.google.gwt.user.cellview.client.CellTable;
import com.google.gwt.user.cellview.client.Column;
import com.google.gwt.user.cellview.client.SafeHtmlHeader;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.ScrollPanel;
import com.google.gwt.view.client.HasData;
import com.google.gwt.view.client.ListDataProvider;
import com.google.gwt.view.client.SelectionChangeEvent.Handler;
import com.google.gwt.view.client.SelectionModel;
import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.Element;
import com.google.gwt.xml.client.NamedNodeMap;
import com.google.gwt.xml.client.Node;
import com.google.gwt.xml.client.NodeList;
import com.google.gwt.xml.client.XMLParser;
import com.sensia.swetools.editors.sensorml.client.listeners.ILoadFiledCallback;
import com.sensia.swetools.editors.sensorml.client.utils.BoyerMoore;
import com.sensia.swetools.editors.sensorml.client.utils.Utils;

public class SensorMLOntology {

	private static final String ONTOLOGY_URL = "ontologies/ont.swe";
	private ListDataProvider<Property> dataProvider;
	private List<Property> originalData;
	private List<Property> filteredData;
	private int lentghPattern = 0;
	private CellTable<Property> table;
	
	private Property selectedProperty;
	
	public SensorMLOntology() {
		originalData = new ArrayList<Property>();
		dataProvider = new ListDataProvider<Property>();
		filteredData = new ArrayList<Property>();
	}
	
	public void loadOntology() {
		ILoadFiledCallback cb = new ILoadFiledCallback() {
			@Override
			public void onLoad(String content) {
				Document ontologyRoot = XMLParser.parse(content);
				parseOntology(ontologyRoot.getDocumentElement());
				dataProvider.setList(originalData);
			}
		};
		
		Utils.getFile(ONTOLOGY_URL, cb);
	}
	
	public void setFilter(final String pattern) {
		if(pattern.isEmpty()) {
			if(lentghPattern > 0) {
				//restore original
				dataProvider.setList(originalData);
			} 
			lentghPattern = 0;
			//otherwise no filter is needed
		} else {
			//use boyer Moore String matching algorithm to match corresponding pattern
			BoyerMoore bm = new BoyerMoore(pattern);
			List<Property> newFilteredList = null;
			if(filteredData.isEmpty()) {
				newFilteredList = filterPattern(bm, originalData);
			} else {
				//get filter direction
				if(pattern.length() > lentghPattern) {
					lentghPattern = pattern.length();
					//up
					newFilteredList = filterPattern(bm, filteredData);
				} else {
					//down
					lentghPattern = pattern.length();
					newFilteredList = filterPattern(bm, originalData);
				}
			}
			filteredData = newFilteredList;
			dataProvider.setList(filteredData);
		}
	}
	
	private List<Property>  filterPattern(final BoyerMoore bm, final List<Property> inputList) {
		List<Property> newFilteredList = new ArrayList<SensorMLOntology.Property>();
		for(final Property property : inputList) {
			//check defUrl
			
			if((bm.search(property.getDefUrl().getBytes(), 0) > 1) || 
			   (bm.search(property.getDef().getBytes(), 0) > 1) ||
			   (bm.search(property.getCreator().getBytes(), 0) > 1) ||
			   	(bm.search(property.getPreLabel().getBytes(), 0) > 1) ||
			   (bm.search(property.getTitle().getBytes(), 0) > 1)) {
					
				newFilteredList.add(property);
			} 
		}
		return newFilteredList;
	}
	
	public String getSelectedValue() {
		String value = null;
		if(selectedProperty != null) {
			value = selectedProperty.getDefUrl();
		}
		return value;
	}
	
	public Panel createTable() {
		if(table == null) {
			table  = new CellTable<Property>();
			table.setStyleName("ontology-table-result");
			
			//define URL column
			final Column<Property, String> urlColumn = new Column<Property, String>(new TextCell()) {
	
				@Override
				public String getValue(Property object) {
					return object.getDefUrl();
				}
			};
			urlColumn.setSortable(false);
			
			SafeHtmlHeader urlLabelHeader = new SafeHtmlHeader(new SafeHtml() {
	
				@Override
				public String asString() {
					  return "<p style=\"text-align:center;\">URL</p>"; 
				} 
	
		    });
			
			//define definition column
			final Column<Property, String> defColumn = new Column<Property, String>(new TextCell()) {
	
				@Override
				public String getValue(Property object) {
					return object.getDef();
				}
			};
			defColumn.setSortable(false);
			
			SafeHtmlHeader defLabelHeader = new SafeHtmlHeader(new SafeHtml() {
	
				@Override
				public String asString() {
					  return "<p style=\"text-align:center;\">Definition</p>"; 
				} 
	
		    });
			
			//define preLabel column
			final Column<Property, String> preLabelColumn = new Column<Property, String>(new TextCell()) {
	
				@Override
				public String getValue(Property object) {
					return object.getPreLabel();
				}
			};
			preLabelColumn.setSortable(false);
			
			SafeHtmlHeader preLabelLabelHeader = new SafeHtmlHeader(new SafeHtml() {
	
				@Override
				public String asString() {
					  return "<p style=\"text-align:center;\">Pre Label</p>"; 
				} 
	
		    });
				
			//define creator column
			final Column<Property, String> creatorColumn = new Column<Property, String>(new TextCell()) {
	
				@Override
				public String getValue(Property object) {
					return object.getCreator();
				}
			};
			creatorColumn.setSortable(false);
			
			SafeHtmlHeader creatorLabelHeader = new SafeHtmlHeader(new SafeHtml() {
	
				@Override
				public String asString() {
					  return "<p style=\"text-align:center;\">Creator</p>"; 
				} 
	
		    });
			
			//define creator column
			final Column<Property, String> titleColumn = new Column<Property, String>(new TextCell()) {
	
				@Override
				public String getValue(Property object) {
					return object.getTitle();
				}
			};
			titleColumn.setSortable(false);
			
			SafeHtmlHeader titleLabelHeader = new SafeHtmlHeader(new SafeHtml() {
	
				@Override
				public String asString() {
					  return "<p style=\"text-align:center;\">Title</p>"; 
				} 
	
		    });
			
			//add columns to table
			table.addColumn(urlColumn,urlLabelHeader);
			table.addColumn(defColumn,defLabelHeader);
			table.addColumn(preLabelColumn,preLabelLabelHeader);
			table.addColumn(creatorColumn,creatorLabelHeader);
			table.addColumn(titleColumn,titleLabelHeader);
			
			dataProvider.addDataDisplay(table);
			
			table.setSkipRowHoverCheck(true);
		    table.setSkipRowHoverFloatElementCheck(true);
			table.setSkipRowHoverStyleUpdate(true);
			table.setVisibleRange(0, 100000);
			
			table.setSelectionModel(new SelectionModel<Property>() {

				@Override
				public void fireEvent(GwtEvent<?> event) {
					
				}

				@Override
				public Object getKey(Property item) {
					return null;
				}

				@Override
				public HandlerRegistration addSelectionChangeHandler(Handler handler) {
					return null;
				}

				@Override
				public boolean isSelected(Property object) {
					return selectedProperty == object;
				}

				@Override
				public void setSelected(Property object, boolean selected) {
					if(selected){
						selectedProperty = object;
					}
				}
			});
		    //dataProvider.setList(test);
	
		   /* SimplePager pager = new SimplePager();
		    pager.setDisplay(table);
		    pager.setPageSize(10); // 15 rows will be shown at a time
	
		    VerticalPanel vPanel = new VerticalPanel();
		    vPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_CENTER);
		    vPanel.setVerticalAlignment(HasVerticalAlignment.ALIGN_MIDDLE);
		    vPanel.add(table);
		    vPanel.add(pager);*/
		}
		ScrollPanel sPanel = new ScrollPanel();
		sPanel.setStyleName("ontology-table-panel");
		sPanel.add(table);
		return sPanel;
	}
	
	private void parseOntology(Element element){
		NodeList children = element.getChildNodes();
		for (int i = 0; i < children.getLength(); i++) {
			Node node = children.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				Element elt = (Element) node;
				if(elt.getNodeName().equals("Property")){
					Property property = new Property();
					parseProperty(property,elt);
					originalData.add(property);
					
				} else {
					parseOntology((Element) node);
				}
			}
		}
	}
	
	private void parseProperty(final Property property,Element propertyNode) {
		//add attributes if any
        if (propertyNode.hasAttributes()) {
        	NamedNodeMap attributes = propertyNode.getAttributes();
		
			for (int j = 0; j < attributes.getLength(); j++) {
				Node attr = attributes.item(j);
				if(attr.getNodeName().equals("rdf:about")) {
					property.setDefUrl(attr.getNodeValue());
				}
			}
		}
        
		NodeList children = propertyNode.getChildNodes();
		for (int i = 0; i < children.getLength(); i++) {
			Node node = children.item(i);
			if(node.getNodeType() == Node.ELEMENT_NODE) {
				if(node.getNodeName().equals("skos_definition")) {
					property.setDef(node.getChildNodes().item(0).getNodeValue());
				} else if(node.getNodeName().equals("skos_prefLabel")) {
					property.setPreLabel(node.getChildNodes().item(0).getNodeValue());
				} else if(node.getNodeName().equals("dc_creator")) {
					property.setCreator(node.getChildNodes().item(0).getNodeValue());
				} else if(node.getNodeName().equals("dc_title")) {
					property.setTitle(node.getChildNodes().item(0).getNodeValue());
				}
			} 
		}
	}
	
	private class Property {
		
		private String defUrl;
		private String def;
		private String preLabel;
		private String creator;
		private String title;
		
		public Property() {
			defUrl = "";
			def = "";
			preLabel = "";
			creator = "";
			title = "";
		}
		
		public String getDefUrl() {
			return defUrl;
		}
		public void setDefUrl(String defUrl) {
			this.defUrl = defUrl;
		}
		public String getDef() {
			return def;
		}
		public void setDef(String def) {
			this.def = def;
		}
		public String getPreLabel() {
			return preLabel;
		}
		public void setPreLabel(String preLabel) {
			this.preLabel = preLabel;
		}
		public String getCreator() {
			return creator;
		}
		public void setCreator(String creator) {
			this.creator = creator;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		
		@Override
		public String toString() {
			return "Property [defUrl=" + defUrl + ", def=" + def + ", preLabel=" + preLabel + ", creator=" + creator + ", title=" + title + "]";
		}
	}
}
