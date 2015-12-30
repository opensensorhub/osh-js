package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.VerticalPanel;
import com.sensia.swetools.editors.sensorml.client.listeners.IAddCallback;

public class Utils {

	private Utils(){}
	
	public static final DialogBox createAddDialogBox(final Panel panel,final String title,final IAddCallback addCB){
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
}
