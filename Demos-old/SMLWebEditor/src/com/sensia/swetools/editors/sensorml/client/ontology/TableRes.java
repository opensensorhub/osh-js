package com.sensia.swetools.editors.sensorml.client.ontology;

import com.google.gwt.user.cellview.client.CellTable;

public interface TableRes extends CellTable.Resources
{
@Source({CellTable.Style.DEFAULT_CSS, "com/sensia/swetools/editors/sensorml/client/ontology/ontology-table.css"})
TableStyle cellTableStyle();
 
interface TableStyle extends CellTable.Style {}
}