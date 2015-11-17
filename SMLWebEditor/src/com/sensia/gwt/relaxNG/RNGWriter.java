/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.gwt.relaxNG;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import com.google.gwt.xml.client.Document;
import com.google.gwt.xml.client.Element;
import com.google.gwt.xml.client.Node;
import com.google.gwt.xml.client.XMLParser;
import com.sensia.relaxNG.*;


/**
 * <p><b>Title:</b>
 * RNGWriter
 * </p>
 *
 * <p><b>Description:</b><br/>
 * Writes an RNG grammar with or without annotations to save
 * user input (selections, values set, etc.)
 * </p>
 *
 * <p>Copyright (c) 2010</p>
 * @author Alexandre Robin
 * @date Sep 4, 2011
 */
public class RNGWriter
{
    protected Document dom;
    protected boolean keepUserInput;
    protected Map<String, String> nsUriToPrefixMap;
    
    
    /**
     * Writes out the grammar as a DOM document in RelaxNG 1.0 format
     * @param grammar
     * @param keepUserInput if set to true, user inputs will be included in the
     * grammar via additional tags and attributes. If not, selections made in the
     * grammar will be used to further restrict it, thus leading to a more
     * constraining schema.
     * @return
     */
    public Document writeSchema(RNGGrammar grammar, boolean keepUserInput)
    {
        dom = XMLParser.createDocument();
        this.keepUserInput = keepUserInput;
        this.nsUriToPrefixMap = grammar.getNsUriToPrefix();
        writeRNGTag(grammar, dom, dom);
        return dom;
    }
    
    
    protected void writeRNGTag(RNGTag tag, Document dom, Node parentNode)
    {
        if (tag instanceof RNGGrammar)
        {
            RNGGrammar grammar = (RNGGrammar)tag;
            Element grammarElt = dom.createElement("grammar");
            parentNode.appendChild(grammarElt);
            
            // insert namespace attributes
            grammarElt.setAttribute("xmlns", RNGParser.RNG_NS_URI);
            grammarElt.setAttribute("xmlns:a", RNGParser.ANNOT_NS_URI);
            for (Entry<String, String> ns: grammar.getNsPrefixToUri().entrySet())
                grammarElt.setAttribute("xmlns:" + ns.getKey(), ns.getValue());
            
            // includes
            for (Entry<String, RNGGrammar> include: grammar.getIncludedGrammars().entrySet())
            {
                Element incElt = dom.createElement("include");
                grammarElt.appendChild(incElt);
                String href = include.getKey();
                href = href.substring(grammar.getId().length() + 1);
                // TODO generate correct relative url
            }
            
            // start pattern
            Element startElt = dom.createElement("start");
            grammarElt.appendChild(startElt);
            for (RNGTag child: grammar.getStartPattern().getChildren())
                writeRNGTag(child, dom, startElt);
            
            // defines
            for (RNGDefine def: grammar.getPatterns().values())
                writeRNGTag(def, dom, grammarElt);
        }
        
        else if (tag instanceof RNGDefine)
        {
            RNGDefine def = (RNGDefine)tag;
            Element newElt = dom.createElement("define");
            newElt.setAttribute("name", def.getId());
            parentNode.appendChild(newElt);
            
            for (RNGTag child: def.getChildren())
                writeRNGTag(child, dom, newElt);
        }
        
        else if (tag instanceof RNGElement)
        {
            RNGElement elt = (RNGElement)tag;
            Element newElt = dom.createElement("element");
            newElt.setAttribute("name", getFullName(elt.getNamespace(), elt.getName()));
            parentNode.appendChild(newElt);
            
            for (RNGTag child: elt.getChildren())
                writeRNGTag(child, dom, newElt);
        }
        
        else if (tag instanceof RNGAttribute)
        {
            RNGAttribute att = (RNGAttribute)tag;
            Element newElt = dom.createElement("attribute");
            newElt.setAttribute("name", getFullName(att.getNamespace(), att.getName()));
            parentNode.appendChild(newElt);
            
            for (RNGTag child: att.getChildren())
                writeRNGTag(child, dom, newElt);
        }
        
        else if (tag instanceof RNGGroup)
        {
            RNGGroup grp = (RNGGroup)tag;
            Element newElt = dom.createElement("group");
            parentNode.appendChild(newElt);
            
            for (RNGTag child: grp.getChildren())
                writeRNGTag(child, dom, newElt);
        }
        
        else if (tag instanceof RNGOptional)
        {
            RNGOptional opt = (RNGOptional)tag;
                        
            if (!opt.isDisabled())
            {
                Element newElt = dom.createElement("optional");
                parentNode.appendChild(newElt);
                
                if (keepUserInput)
                    newElt.setAttribute("selected", Boolean.toString(opt.isSelected()));
                
                for (RNGTag child: opt.getChildren())
                    writeRNGTag(child, dom, newElt);
            }
        }
        
        else if (tag instanceof RNGChoice)
        {
            RNGChoice choice = (RNGChoice)tag;
            Element newElt = dom.createElement("choice");
            parentNode.appendChild(newElt);
            
            // TODO handle degenerated choice (all items disabled except one)
            // in this case, don't even write choice envelope
            
            int selectedIndex = choice.getSelectedIndex();
            for (int i = 0; i < choice.getItems().size(); i++)
            {
                RNGTag item = choice.getItems().get(i);
                if (!item.isDisabled())
                {
                    writeRNGTag(item, dom, newElt);
                    if (keepUserInput && i == selectedIndex)
                        ((Element)newElt.getLastChild()).setAttribute("selected", "true");
                }
            }
        }
        
        else if (tag instanceof RNGZeroOrMore)
        {
            RNGZeroOrMore zeroOrMore = (RNGZeroOrMore)tag;
            
            // TODO handle case where a different multiplicity is set
            // examples are 1..*, 1..3, 2..2, etc...)
            // need info in RNG object
            // repalce by oneOrMore or the exact number of patterns using ref and optional
            
            if (!zeroOrMore.isDisabled())
            {
                Element newElt = (zeroOrMore instanceof RNGOneOrMore) ?
                        dom.createElement("oneOrMore") :
                        dom.createElement("zeroOrMore");
                parentNode.appendChild(newElt);
       
                if (keepUserInput)
                {
                    for (List<RNGTag> tagList: zeroOrMore.getPatternInstances())
                    {
                        Element occElt = dom.createElement("occurence");
                        for (RNGTag item: tagList)
                            writeRNGTag(item, dom, occElt);
                        newElt.appendChild(newElt);
                    }
                }
                
                for (RNGTag child: zeroOrMore.getChildren())
                    writeRNGTag(child, dom, newElt);
            }            
        }
        
        else if (tag instanceof RNGList)
        {
            RNGList list = (RNGList)tag;
            Element newElt = dom.createElement("list");
            parentNode.appendChild(newElt);
            
            for (RNGTag child: list.getChildren())
                writeRNGTag(child, dom, newElt);
        }
        
        else if (tag instanceof RNGRef)
        {
            RNGRef ref = (RNGRef)tag;
            Element newElt = dom.createElement("ref");
            newElt.setAttribute("name", ref.getId());
            parentNode.appendChild(newElt);
        }
        
        else if (tag instanceof RNGValue)
        {
            RNGValue val = ((RNGValue)tag);
            Element newElt = dom.createElement("value");
            newElt.appendChild(dom.createTextNode(val.getText()));
            parentNode.appendChild(newElt);
        }
        
        else if (tag instanceof RNGText)
        {
            RNGText text = ((RNGText)tag);
                        
            if (keepUserInput || text.getText() == null)
            {
                Element newElt = dom.createElement("text");
                parentNode.appendChild(newElt);
                
                if (text.getText() != null)
                {
                    Element valElt = dom.createElement("value");
                    valElt.appendChild(dom.createTextNode(text.getText()));
                    newElt.appendChild(valElt);
                }
            }
            else
            {
                Element newElt = dom.createElement("value");
                newElt.appendChild(dom.createTextNode(text.getText()));
                parentNode.appendChild(newElt);
            }
        }
        
        else if (tag instanceof RNGData<?>)
        {
            RNGData<?> data = ((RNGData<?>)tag);
            
            // TODO write data type parameters
            
            if (keepUserInput || data.getStringValue() == null)
            {
                Element newElt = dom.createElement("data");
                newElt.setAttribute("type", data.getType());
                parentNode.appendChild(newElt);
                
                if (data.getStringValue() != null)
                {
                    Element valElt = dom.createElement("value");
                    valElt.appendChild(dom.createTextNode(data.getStringValue()));
                    newElt.appendChild(valElt);
                }
            }
            else
            {
                Element newElt = dom.createElement("value");
                newElt.appendChild(dom.createTextNode(data.getStringValue()));
                parentNode.appendChild(newElt);
            }
        }
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
}
