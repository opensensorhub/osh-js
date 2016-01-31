/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.gwt.relaxNG;

import com.google.gwt.xml.client.Attr;
import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.Element;
import com.google.gwt.xml.client.NamedNodeMap;
import com.google.gwt.xml.client.Node;
import com.google.gwt.xml.client.NodeList;


public class XMLSerializer
{
    protected final static String DOC_TYPE = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    protected final static String INDENT = "  ";
    
    
    public static String serialize(Node node)
    {
        StringBuilder doc = new StringBuilder();
        doc.append(DOC_TYPE);
        StringBuilder indent = new StringBuilder();
        serialize(node, doc, indent);
        return doc.toString();
    }
    
    
    protected static void serialize(Node node, StringBuilder doc, StringBuilder indent)
    {
        switch (node.getNodeType())
        {
            case Node.DOCUMENT_NODE:
                serialize(((Document)node).getDocumentElement(), doc, indent);
                break;
                
            case Node.ELEMENT_NODE:
                // start element
                if (indent.length() > 0)
                {
                    doc.append('\n');
                    doc.append(indent.toString());
                }
                doc.append('<');
                doc.append(node.getNodeName());                
                
                // attributes
                NamedNodeMap atts = ((Element)node).getAttributes();
                for (int i = 0; i < atts.getLength(); i++)
                {
                    Attr att = (Attr)atts.item(i);
                    doc.append(' ');
                    doc.append(att.getNodeName());
                    doc.append("=\"");
                    doc.append(att.getNodeValue());
                    doc.append('"');
                }
                
                NodeList children = node.getChildNodes();
                if (children.getLength() == 0)
                    doc.append("/>");
                else
                    doc.append('>');
                
                // children
                indent.append(INDENT);
                for (int i = 0; i < children.getLength(); i++)
                    serialize(children.item(i), doc, indent);
                indent.setLength(indent.length() - INDENT.length());
                
                // close element
                if (children.getLength() > 0)
                {
                    if (doc.charAt(doc.length()-1) == '>')
                    {
                        doc.append('\n');
                        doc.append(indent.toString());
                    }
                    doc.append("</");
                    doc.append(node.getNodeName());
                    doc.append('>');
                }
                break;
                
            case Node.TEXT_NODE:
                // TODO properly escape
                doc.append(node.getNodeValue());
                break;
                
            case Node.COMMENT_NODE:
                doc.append('\n');
                doc.append(indent.toString());
                doc.append("<!--");
                doc.append(node.getNodeValue());
                doc.append("-->");
                break;
        }
    }
}
