/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.gwt.relaxNG;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import com.google.gwt.xml.client.Comment;
import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.Element;
import com.google.gwt.xml.client.Node;
import com.google.gwt.xml.client.Text;
import com.google.gwt.xml.client.XMLParser;
import com.sensia.relaxNG.*;


/**
 * <p><b>Title:</b>
 * RNGInstanceWriter
 * </p>
 *
 * <p><b>Description:</b><br/>
 * Writer class to serialize a configured RNG schema to an XML instance
 * This will send warnings 
 * </p>
 *
 * <p>Copyright (c) 2010</p>
 * @author Alexandre Robin
 * @date Sep 4, 2011
 */
public class RNGInstanceWriter
{
    protected final static String NO_VALUE = "{Missing value}";
    protected final static String NO_CHOICE = "{Missing choice selection}";
    protected final static String NO_REF = "{Missing referenced pattern}";
    protected Map<String, String> nsUriToPrefixMap;
    protected Document dom;
    
    
    public Document writeInstance(RNGGrammar grammar)
    {
        this.nsUriToPrefixMap = new LinkedHashMap<String, String>();
        this.collectNamespaces(grammar);        
        return writeInstance(grammar.getStartPattern(), nsUriToPrefixMap);
    }
    
    
    public Document writeInstance(RNGTag tag, Map<String, String> nsUriToPrefixMap)
    {
        dom = XMLParser.createDocument();
        this.nsUriToPrefixMap = nsUriToPrefixMap;
        writeRNGTag(tag, dom, dom);
        return dom;
    }
    
    
    protected String writeRNGTag(RNGTag tag, Document dom, Node parentNode)
    {
        String text = null;
        String error = null;
        
        if (tag instanceof RNGElement)
        {
            RNGElement elt = (RNGElement)tag;
            Element newElt = dom.createElement(getFullName(elt.getNamespace(), elt.getName()));
            parentNode.appendChild(newElt);
            ensureNamespaceDecl(elt.getNamespace());
            for (RNGTag child: elt.getChildren())
                writeRNGTag(child, dom, newElt);
        }
        
        else if (tag instanceof RNGAttribute)
        {
            RNGAttribute att = (RNGAttribute)tag;
            String name = getFullName(att.getNamespace(), att.getName());
            String value = writeRNGTag(att.getChildren().get(0), dom, null);
            ((Element)parentNode).setAttribute(name, value);
            ensureNamespaceDecl(att.getNamespace());
        }
        
        else if (tag instanceof RNGGroup)
        {
            RNGGroup grp = (RNGGroup)tag;
            for (RNGTag child: grp.getChildren())
                writeRNGTag(child, dom, parentNode);
        }
        
        else if (tag instanceof RNGOptional)
        {
            RNGOptional opt = (RNGOptional)tag;
            if (opt.isSelected())
                for (RNGTag child: opt.getChildren())
                    writeRNGTag(child, dom, parentNode);
        }
        
        else if (tag instanceof RNGChoice)
        {
            RNGChoice choice = (RNGChoice)tag;
            if (choice.isSelected())
                text = writeRNGTag(choice.getSelectedPattern(), dom, parentNode);
            else
                error = NO_CHOICE;
        }
        
        else if (tag instanceof RNGZeroOrMore)
        {
            RNGZeroOrMore multiple = (RNGZeroOrMore)tag;
            for (List<RNGTag> tagList: multiple.getPatternInstances())
            {
                for (RNGTag item: tagList)
                    text = writeRNGTag(item, dom, parentNode);
            }
        }
        
        else if (tag instanceof RNGList)
        {
            RNGList list = (RNGList)tag;
            StringBuilder buf = new StringBuilder();
            
            for (RNGTag child: list.getChildren())
            {
                String val = writeRNGTag(child, dom, null);
                if (val != null)
                {
                    buf.append(val);
                    buf.append(' ');
                }
            }
            
            if (buf.length() > 0)
                text = buf.toString();
        }
        
        else if (tag instanceof RNGRef)
        {
            RNGRef ref = (RNGRef)tag;
            if (ref.getPattern() != null)
            {
                for (RNGTag child: ref.getPattern().getChildren())
                    writeRNGTag(child, dom, parentNode);
            }
            else
                error = NO_REF;
        }
        
        else if (tag instanceof RNGValue)
        {
            text = ((RNGValue)tag).getText();
            if (text == null)
                error = NO_VALUE;
        }
        
        else if (tag instanceof RNGText)
        {
           text = ((RNGText)tag).getText();
           if (text == null)
               error = NO_VALUE;
        }
        
        else if (tag instanceof RNGData<?>)
        {
            Object val = ((RNGData<?>)tag).getValue();
            if (val != null)
                text = val.toString();
            else
                error = NO_VALUE;
        }
        
        // deal with text nodes or attribute values
        if (text != null && text.length() > 0)
        {
            if (parentNode != null)
            {
                Text node = dom.createTextNode(text);
                parentNode.appendChild(node);
            }
            else
                return text;
        }
        
        // deal with error text
        if (error != null)
        {
            if (parentNode != null)
            {
                Comment c = dom.createComment(error);
                parentNode.appendChild(c);
            }
            else
                return error;
        }
        
        return null;
    }
    
    
    protected String getFullName(String nsUri, String localName)
    {
        String prefix = null;
        
        if (nsUri != null)
            prefix = nsUriToPrefixMap.get(nsUri);
        
        if (prefix != null)
            return prefix + ":" + localName;
        else
            return localName;
    }
    

    protected void ensureNamespaceDecl(String nsUri)
    {
        if (nsUri != null)
        {
            String prefix = nsUriToPrefixMap.get(nsUri);
            String attName = "xmlns";
            if (prefix != null)
                attName += ":" + prefix;
            
            Element rootElt = dom.getDocumentElement();
            if (!rootElt.hasAttribute(attName))
                rootElt.setAttribute(attName, nsUri);
        }
    }
    
    
    protected void collectNamespaces(RNGGrammar grammar)
    {
        for (Entry<String, String> ns: grammar.getNsUriToPrefix().entrySet())
        {
            if (!nsUriToPrefixMap.containsKey(ns.getKey()))
                nsUriToPrefixMap.put(ns.getKey(), ns.getValue());
        }
        
        // also scan included grammars
        for (RNGGrammar g: grammar.getIncludedGrammars().values())
            collectNamespaces(g);
    }
    
    
    public List<RNGTag> findUnconfiguredComponents(RNGTag tag)
    {
        List<RNGTag> tagList = new ArrayList<RNGTag>();
        findUnConfiguredComponents(tag, tagList);
        return tagList;
    }
    
    
    protected void findUnConfiguredComponents(RNGTag tag, List<RNGTag> tagList)
    {
        if (tag instanceof RNGChoice)
        {
            if (((RNGChoice)tag).getSelectedIndex() < 0)
                tagList.add(tag);
        }
        
        else if (tag instanceof RNGData)
        {
            if (((RNGData<?>)tag).getValue() == null)
                tagList.add(tag);
        }
        
        else if (tag instanceof RNGText)
        {
            if (((RNGText)tag).getText() == null)
                tagList.add(tag);
        }
    }
}
