/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

/**
 * <p><b>Title:</b>
 * RNGRef
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGRef type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGRef extends RNGTagList
{
    private static final long serialVersionUID = -6490378949268947185L;
    protected RNGGrammar parentGrammar;
    protected String patternName;
    protected RNGDefine pattern;
    
    
    public RNGGrammar getParentGrammar()
    {
        return parentGrammar;
    }


    public void setParentGrammar(RNGGrammar parentGrammar)
    {
        this.parentGrammar = parentGrammar;
    }


    public String getPatternName()
    {
        return patternName;
    }


    public void setPatternName(String patternName)
    {
        this.patternName = patternName;
    }


    public RNGDefine getPattern()
    {
        if (pattern == null)
            lookupPattern(true);
            
        return pattern;
    }


    public void setPattern(RNGDefine pattern)
    {
        this.pattern = pattern;
    }


    public void lookupPattern(boolean reload)
    {
        if (this.pattern == null || reload)
        {
            RNGDefine def = parentGrammar.findPattern(patternName, true);
            if (def != null)
                this.pattern = def.clone();
        }
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);
    }
    
    
    @Override
    public RNGRef clone()
    {
        RNGRef newTag = (RNGRef)super.clone();
        newTag.parentGrammar = this.parentGrammar;
        newTag.patternName = this.patternName;
        if (this.pattern != null)
            newTag.pattern = this.pattern.clone();
        return newTag;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGRef();
    }
}
