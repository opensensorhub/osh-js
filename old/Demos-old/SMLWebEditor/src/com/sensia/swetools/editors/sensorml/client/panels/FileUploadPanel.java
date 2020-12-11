/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2016 DHAINAUT.
 All Rights Reserved.
 
 Contributor(s): 
    Mathieu DHAINAUT <mathieu.dhainaut@gmail.com>
 
 ******************************* END LICENSE BLOCK ***************************/
package com.sensia.swetools.editors.sensorml.client.panels;

import com.google.gwt.dom.client.Element;
import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.user.client.ui.FileUpload;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Panel;
import com.google.gwt.user.client.ui.Widget;

/**
 * The Class FileUploadPanel. Most of the reading is from
 * http://www.html5rocks.com/en/tutorials/file/dndfiles/.
 * 
 * First, that we can get a real path from the <input type='file' /> field,
 * coupled with that we can read arbitrary files from the user file system just
 * by path, and finally that the FileReader API is synchronous. For security
 * reasons, most browsers do not give real paths when w read the filename -
 * Second issue is also a security thing - very little good can come of allowing
 * reading from the filesystem just using a string to specify the file to read.
 * 
 * For these first two reasons, we instead need to ask the input for the files
 * it is working on. Browsers that support the FileReader API allow access to
 * this by reading the files property of the input element. Two easy ways to get
 * this - working with the NativeElement.getEventTarget() in jsni, or just
 * working with FileUpload.getElement(). Files property holds multiple items by
 * default, so in a case like ours, we just read the zeroth element.
 */

public class FileUploadPanel {

	/** The container. */
	private HorizontalPanel container;

	/** The file name. */
	private String fileName;
	
	/** The file contents. */
	private String contents="";
	
	/**
	 * Instantiates a new file upload panel.
	 */
	public FileUploadPanel() {
		container = new HorizontalPanel();
		init();
	}

	/**
	 * Inits the formPanel.
	 */
	private void init() {

		container.add(createUploadBox());
	}

	/**
	 * Creates the upload box.
	 *
	 * @return the widget
	 */
	// original createUploadBox
	private Widget createUploadBox() {
		final FileUpload upload = new FileUpload();
		upload.setStyleName("file-upload");
		upload.addChangeHandler(new ChangeHandler() {
			@Override
			public void onChange(ChangeEvent event) {
				loadContents(event.getRelativeElement());
				fileName = upload.getFilename();
			}
		});
		return upload;
	}

	/**
	 * the FileReader api is asynchronous - we don't get the full contents of
	 * the file right away, but need to wait until the onloadend callback is
	 * invoked (again, from
	 * http://www.html5rocks.com/en/tutorials/file/dndfiles/). These files can
	 * be big enough that we wouldn't want the app to block while it reads, so
	 * apparently the spec assumes this as the default.
	 * 
	 * This method is invoked when the field's ChangeEvent goes off, to start
	 * reading in the file, though this could be written some other way.
	 *
	 * @param elt
	 *            the elt
	 */
	private native void loadContents(Element elt) /*-{
		var that = this;
		if ($wnd.File && $wnd.FileReader && $wnd.FileList && $wnd.Blob) {
			// Great success! All the File APIs are supported.
			var reader = new FileReader();
			reader.readAsText(elt.files[0]);
			reader.onloadend = function(event) {
				that.@com.sensia.swetools.editors.sensorml.client.panels.FileUploadPanel::setContents(Ljava/lang/String;)(event.target.result);
			};
		}
	}-*/;

	/**
	 * Sets the contents.
	 *
	 * @param contents
	 *            the new contents
	 */
	public void setContents(String contents) {
		this.contents = contents;
	}

	/**
	 * Gets the content of the selected file. If no file has been selected, the content will be empty.
	 * @return The file content
	 */
	public String getContents() {
		return this.contents;
	}

	/**
	 * Gets the file name of the current selected file.
	 * @return the selected file name
	 */
	public String getFileName() {
		return this.fileName;
	}
	
	/**
	 * Gets the Upload Form panel.
	 *
	 * @return the panel
	 */
	public Panel getPanel() {
		return container;
	}
}
