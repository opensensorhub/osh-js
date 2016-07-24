/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.List;


/**
 * <p><b>Title:</b>
 * RNGOneOrMore
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGOneOrMore type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGOneOrMore extends RNGZeroOrMore
{
    private static final long serialVersionUID = 3793062579738982300L;
    
    
    public RNGOneOrMore()
    {
    }
    
    
    @Override
    public List<List<RNGTag>> getPatternInstances()
    {
        if (this.patternInstances.isEmpty())
            this.newOccurence();
        
        return patternInstances;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGOneOrMore clone()
    {
        return (RNGOneOrMore)super.clone();
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGOneOrMore();
    }    
}
