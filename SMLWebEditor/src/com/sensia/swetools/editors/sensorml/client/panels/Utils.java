package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.http.client.Request;
import com.google.gwt.http.client.RequestBuilder;
import com.google.gwt.http.client.RequestCallback;
import com.google.gwt.http.client.RequestException;
import com.google.gwt.http.client.Response;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.listeners.IButtonCallback;
import com.sensia.swetools.editors.sensorml.client.listeners.ILoadFiledCallback;

public class Utils {

	private Utils(){}
	
	public static final DialogBox createAddDialogBox(final Panel panel,final String title,final IButtonCallback addCB){
		final DialogBox dialogBox = new DialogBox();
		dialogBox.setText(title);
		dialogBox.setGlassEnabled(true);
		dialogBox.setAnimationEnabled(true);
		
		//create Panel
		Panel main = new VerticalPanel();
		
		Button close = new Button("Close");
		close.addClickHandler(new ClickHandler() {
           public void onClick(ClickEvent event) {
        	   dialogBox.hide();
           }
        });
        
		Button add = new Button("Add");
		add.addClickHandler(new ClickHandler() {
           public void onClick(ClickEvent event) {
        	   addCB.onClick();
        	   dialogBox.hide();
           }
        });
		
		HorizontalPanel buttons = new HorizontalPanel();
		buttons.add(add);
		buttons.add(close);
		buttons.setSpacing(5);
		
		main.add(panel);
		main.add(buttons);
		
		dialogBox.add(main);
		dialogBox.center();
         
		return dialogBox;
	}
	
	public static final DialogBox createEditDialogBox(final Panel panel,final String title,final IButtonCallback addCB){
		final DialogBox dialogBox = new DialogBox();
		dialogBox.setText(title);
		dialogBox.setGlassEnabled(true);
		dialogBox.setAnimationEnabled(true);
		
		//create Panel
		Panel main = new VerticalPanel();
		
		Button close = new Button("Close");
		close.addClickHandler(new ClickHandler() {
           public void onClick(ClickEvent event) {
        	   dialogBox.hide();
           }
        });
        
		HorizontalPanel buttons = new HorizontalPanel();
		
		if(addCB != null) {
			Button add = new Button("Save");
			add.addClickHandler(new ClickHandler() {
	           public void onClick(ClickEvent event) {
	        	   addCB.onClick();
	        	   dialogBox.hide();
	           }
	        });
			
			buttons.add(add);
		}
		
		
		buttons.add(close);
		buttons.setSpacing(5);
		
		main.add(panel);
		main.add(buttons);
		
		dialogBox.add(main);
		dialogBox.center();
         
		return dialogBox;
	}
	
	public static final DialogBox createDialogBox(final Panel panel,final String title,final IButtonCallback addCB){
		final DialogBox dialogBox = new DialogBox();
		dialogBox.setText(title);
		dialogBox.setGlassEnabled(true);
		dialogBox.setAnimationEnabled(true);
		
		//create Panel
		VerticalPanel main = new VerticalPanel();
		
		Button close = new Button("Close");
		close.addClickHandler(new ClickHandler() {
           public void onClick(ClickEvent event) {
        	   dialogBox.hide();
           }
        });
        
		HorizontalPanel buttons = new HorizontalPanel();
		buttons.add(close);
		buttons.setSpacing(5);
		
		main.add(panel);
		main.add(buttons);
		
		main.setSpacing(10);
		dialogBox.add(main);
		dialogBox.center();
         
		return dialogBox;
	}
	
	private static final String DEGREE  = "\u00b0";
	private static final String OHM = "\u2126";
	
	public static String getUOMSymbol(String uom) {
		if(uom.equals("cel")) {
			return DEGREE+"C";
		} else if(uom.equals("kohm")) {
			return "k"+OHM;
		} else {
			return uom;
		}
	}
	
	public static void getFile(String url, final ILoadFiledCallback callback) {
		RequestBuilder requestBuilder = new RequestBuilder( RequestBuilder.GET, url );
	    try {
	        requestBuilder.sendRequest( null, new RequestCallback(){
	            public void onError(Request request, Throwable exception) {
	                GWT.log( "failed file reading", exception );
	            }
	
	            public void onResponseReceived(Request request, Response response) {
	                callback.onLoad(response.getText());
	
	            }} );
	    } catch (RequestException e) {
	        GWT.log( "failed file reading", e );
	    }
	}
}
