/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.LinkedHashMap;
import java.util.Map;


/**
 * <p><b>Title:</b>
 * RNGGrammar
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGGrammar type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGGrammar extends RNGTag
{
    private static final long serialVersionUID = -5964644764981084093L;
    protected Map<String, RNGGrammar> includedGrammars;
    protected RNGGrammar parentGrammar;    
    protected Map<String, String> nsPrefixToUri;
    protected Map<String, String> nsUriToPrefix;
    protected Map<String, RNGDefine> patterns;
    protected RNGGroup startPattern;
    
    
    public RNGGrammar()
    {
        includedGrammars = new LinkedHashMap<String, RNGGrammar>();
        nsPrefixToUri = new LinkedHashMap<String, String>();
        nsUriToPrefix = new LinkedHashMap<String, String>();
        patterns = new LinkedHashMap<String, RNGDefine>();
    }
    
    
    public RNGGrammar getParentGrammar()
    {
        return parentGrammar;
    }


    public void setParentGrammar(RNGGrammar parentGrammar)
    {
        this.parentGrammar = parentGrammar;
    }


    public RNGGroup getStartPattern()
    {
        return startPattern;
    }


    public void setStartPattern(RNGGroup startPattern)
    {
        this.startPattern = startPattern;
    }


    public Map<String, RNGGrammar> getIncludedGrammars()
    {
        return includedGrammars;
    }


    public Map<String, String> getNsPrefixToUri()
    {
        return nsPrefixToUri;
    }
    
    
    public Map<String, String> getNsUriToPrefix()
    {
        return nsUriToPrefix;
    }
    
    
    public void addNamespace(String prefix, String uri)
    {
        nsPrefixToUri.put(prefix, uri);
        nsUriToPrefix.put(uri, prefix);
    }


    public Map<String, RNGDefine> getPatterns()
    {
        return patterns;
    }
    
    
    public RNGDefine findPattern(String name, boolean recursive)
    {
        RNGDefine def = patterns.get(name);
        
        if (def == null && recursive)
        {
            for (RNGGrammar grammar: includedGrammars.values())
            {
                def = grammar.findPattern(name, true);
                if (def != null)
                    return def;
            }
            
            // TODO do we need to look in parent grammar too ?
        }
        
        return def;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGGrammar clone()
    {
        // TODO RNGGrammar clone method
        return null;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGGrammar();
    }
}
