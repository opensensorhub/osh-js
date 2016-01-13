package com.sensia.swetools.editors.sensorml.client.panels.charts.table;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import com.google.gwt.cell.client.ButtonCell;
import com.google.gwt.cell.client.FieldUpdater;
import com.google.gwt.cell.client.TextCell;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.safehtml.shared.SafeHtml;
import com.google.gwt.user.cellview.client.CellTable;
import com.google.gwt.user.cellview.client.Column;
import com.google.gwt.user.cellview.client.SafeHtmlHeader;
import com.google.gwt.user.cellview.client.SimplePager;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasHorizontalAlignment;
import com.google.gwt.user.client.ui.HasVerticalAlignment;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.ScrollPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.google.gwt.view.client.ListDataProvider;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.panels.Utils;
import com.sensia.swetools.editors.sensorml.client.panels.widgets.ISensorWidget.MODE;

public class SensorVersusDataArrayTable extends Composite{

	private CellTable<XYCoordinatesModel> table;
	private ListDataProvider<XYCoordinatesModel> dataProvider;
	
	private String xLabel;
	private String yLabel;
	
	private IDataChangeListener listener;
	
	private MODE mode;
	
	//for EDIT/VIEW mode
	private Button addButton;
	private Column<XYCoordinatesModel, String> deleteBtn;
	
	public SensorVersusDataArrayTable(String xLabel,String yLabel,Number[][] values) {
		super();
		this.xLabel = xLabel;
		this.yLabel = yLabel;
		this.mode = mode.VIEW;
		create(values);
	}
	
	private void create(Number[][] values) {
	    List<XYCoordinatesModel> coords = new ArrayList<XYCoordinatesModel>();
	    
	    for(Number[] number : values) {
	    	 coords.add(new XYCoordinatesModel(number[0],number[1]));
	    }

	    dataProvider = new ListDataProvider<XYCoordinatesModel>();
	    table = new CellTable<XYCoordinatesModel>();
		
		final Column<XYCoordinatesModel, String> xColumn = new Column<XYCoordinatesModel, String>(new TextCell()) {

			@Override
			public String getValue(XYCoordinatesModel object) {
				return object.getX()+"";
			}
		};
		final Column<XYCoordinatesModel, String> yColumn = new Column<XYCoordinatesModel, String>(new TextCell()) {

			@Override
			public String getValue(XYCoordinatesModel object) {
				return object.getY()+"";
			}
		};
			
		// Add a ButtonCell as column to the CellTable
		deleteBtn = new Column<XYCoordinatesModel, String>(
						new ButtonCell()) {
		  @Override
		  public String getValue(XYCoordinatesModel c) {
		    return "x";
		  }
		};
				
		// Set the field updater, whenever user clicks on button
		// row will be removed.
		deleteBtn.setFieldUpdater(new FieldUpdater<XYCoordinatesModel, String>() {

		  @Override
		  public void update(int index, XYCoordinatesModel object, String value) {
			dataProvider.getList().remove(object);
			dataProvider.refresh();
		    table.redraw();
		    
		    if(listener != null) {
		    	Number[][] removePoint = new Number[1][2];
		    	removePoint[0][0] = object.getX();
		    	removePoint[0][1] = object.getY();
		    	listener.notifyRemoveChanges(removePoint);
		    }
		  }
		});
		
	    xColumn.setSortable(true);
	    yColumn.setSortable(false);
	    xColumn.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_CENTER);
	    yColumn.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_CENTER);
	    
	    table.setEmptyTableWidget(new Label("No data"));
	    //table.setAutoHeaderRefreshDisabled(true);
	    //table.setAutoFooterRefreshDisabled(true);
	    //table.setSkipRowHoverCheck(true);
	    //table. setSkipRowHoverFloatElementCheck(true);
	    
	    SafeHtmlHeader xLabelHeader = new SafeHtmlHeader(new SafeHtml() {

			@Override
			public String asString() {
				  return "<p style=\"text-align:center;\">"+xLabel+"</p>"; 
			} 

	    }); 
	    
	    SafeHtmlHeader yLabelHeader = new SafeHtmlHeader(new SafeHtml() {

			@Override
			public String asString() {
				  return "<p style=\"text-align:center;\">"+yLabel+"</p>"; 
			} 

	    }); 
	    
	    SafeHtmlHeader removeRowLabelHeader = getRemoveRowLabelHeader();
	    
	    yLabelHeader.setHeaderStyleNames("data-table-header");
	    xLabelHeader.setHeaderStyleNames("data-table-header");
	    
	    table.addColumn(xColumn,xLabelHeader);
	    table. addColumn(yColumn,yLabelHeader);
	   	table.addColumn(deleteBtn, removeRowLabelHeader);
	    table. setColumnWidth(xColumn, 230, com.google.gwt.dom.client.Style.Unit.PX);
	    table. setColumnWidth(yColumn, 230, com.google.gwt.dom.client.Style.Unit.PX);
	    
	    table.setRowCount(coords.size());
	    table.setRowData(coords);
	    
	    
	    dataProvider.addDataDisplay(table);
	    dataProvider.setList(coords);

	    SimplePager pager = new SimplePager();
	    pager.setDisplay(table);
	    pager.setPageSize(10); // 20 rows will be shown at a time

	    VerticalPanel vPanel = new VerticalPanel();
	    vPanel.setHorizontalAlignment(HasHorizontalAlignment.ALIGN_CENTER);
	    vPanel.setVerticalAlignment(HasVerticalAlignment.ALIGN_MIDDLE);
	    vPanel.add(table);
	    vPanel.add(pager);
	    
	    addButton = getAddButton(); 
	    vPanel.add(addButton);
	    
	    initWidget(new ScrollPanel(vPanel));
	    addStyleName("data-table");
	    
	    switchMode(mode);
	}
	
	private Button getAddButton() {
		Button addButton = new Button("Add");
		addButton.addClickHandler(new ClickHandler() {
			
			@Override
			public void onClick(ClickEvent event) {
				final NewDataTableCoordsPanel addPanel = new NewDataTableCoordsPanel();
				Utils.createAddDialogBox(addPanel.getPanel(), "Add coordinate", new IButtonCallback() {
					
					@Override
					public void onClick() {
						double x = Double.parseDouble(addPanel.x.getValue());
						double y = Double.parseDouble(addPanel.y.getValue());
						dataProvider.getList().add(new XYCoordinatesModel(x,y));
						java.util.Collections.sort(dataProvider.getList(), new Comparator<XYCoordinatesModel>() {

					        @Override
					        public int compare(XYCoordinatesModel o1, XYCoordinatesModel o2) {
					        	if (o1 == o2) {
				                      return 0;
				                }
					        	 // Compare the name columns.
			                    if (o1 != null) {
			                      if(o1.getX().doubleValue() < o2.getX().doubleValue()) {
			                    	  return 1;
			                      } 
			                    }
			                    return -1;
					        }
						});
						dataProvider.refresh();
						
						if(listener != null) {
							/*Number[][] addPoint = new Number[1][2];
					    	addPoint[0][0] = x;
					    	addPoint[0][1] = y;*/
							
							//work around of a addPoint bug
							Number[][] addPoint = new Number[dataProvider.getList().size()][2];
					    	List<XYCoordinatesModel> xyModel = dataProvider.getList();
					    	for(int i=0;i < xyModel.size();i++) {
					    		addPoint[i][0] = xyModel.get(i).getX();
					    		addPoint[i][1] = xyModel.get(i).getY();
					    	}
					    	
					    	listener.notifyAddChanges(addPoint);
					    }
					}
				});
			}
		});
		return addButton;
	}
	public void update(final String xLabel,final String yLabel) {
		this.xLabel = xLabel;
		this.yLabel = yLabel;
	    table.redrawHeaders();
	}
	
	public void addChangeListener(IDataChangeListener listener) {
		this.listener = listener;
	}
	
	public class NewDataTableCoordsPanel {
		
		private TextBox x;
		private TextBox y;
		private Panel panel;
		
		public NewDataTableCoordsPanel() {
		
			panel = new HorizontalPanel();
			x = new TextBox();
			y = new TextBox();
			
			panel.add(new HTML("&nbsp;"+xLabel+"&nbsp;:&nbsp; "));
			panel.add(x);
			panel.add(new HTML("&nbsp;"+yLabel+"&nbsp;:&nbsp;"));
			panel.add(y);
		}
		
		public Panel getPanel() {
			return panel;
		}
	}
	
	public void switchMode(MODE mode) {
		this.mode = mode;
		if(mode == MODE.VIEW) {
			addButton.setVisible(false);
			table. removeColumn(deleteBtn);
		} else if (mode == MODE.EDIT) {
			addButton.setVisible(true);
			SafeHtmlHeader removeRowLabelHeader = getRemoveRowLabelHeader();
			table.addColumn(deleteBtn, removeRowLabelHeader);
			
		}
	}
	
	public SafeHtmlHeader getRemoveRowLabelHeader() {
		SafeHtmlHeader removeRowLabelHeader = new SafeHtmlHeader(new SafeHtml() {

			@Override
			public String asString() {
				  return "<p style=\"text-align:center;\"></p>"; 
			} 

	    }); 
		removeRowLabelHeader.setHeaderStyleNames("data-table-header");
		return removeRowLabelHeader;
	}
}
