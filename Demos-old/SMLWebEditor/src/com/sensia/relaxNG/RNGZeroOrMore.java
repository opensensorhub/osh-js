/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.ArrayList;
import java.util.List;


/**
 * <p><b>Title:</b>
 * RNGZeroOrMore
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGZeroOrMore type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGZeroOrMore extends RNGTagList
{
    private static final long serialVersionUID = 3877955519578165697L;
    protected List<List<RNGTag>> patternInstances;
    
    
    public RNGZeroOrMore()
    {
        patternInstances = new ArrayList<List<RNGTag>>();
    }
    

    public List<List<RNGTag>> getPatternInstances()
    {
        return patternInstances;
    }
    
    
    public List<RNGTag> newOccurence()
    {
        // deep clone children and assign this as parent
        List<RNGTag> newChildren = new ArrayList<RNGTag>();
        for (RNGTag child: children)
        {
            RNGTag childClone = child.clone();
            newChildren.add(childClone);
        }
        
        patternInstances.add(newChildren);
        return newChildren;
    }


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    public RNGZeroOrMore clone()
    {
        return (RNGZeroOrMore)super.clone();
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGZeroOrMore();
    }    
}
