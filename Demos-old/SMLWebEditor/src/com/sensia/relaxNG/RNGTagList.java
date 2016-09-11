/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

import java.util.ArrayList;
import java.util.List;


public abstract class RNGTagList extends RNGTag
{
    private static final long serialVersionUID = -5892298519247414639L;
    protected List<RNGTag> children = new ArrayList<RNGTag>();
    
    
    public List<RNGTag> getChildren()
    {
        return children;
    }
    
    
    public RNGAttribute getChildAttribute(String attName)
    {
        for (RNGTag tag: children)
            if (isAttributeWithName(tag, attName))
                return (RNGAttribute)tag;
        
        return null;
    }
    
    
    public boolean isAttributeWithName(RNGTag tag, String name)
    {
        if (tag instanceof RNGAttribute)
        {
            RNGAttribute att = (RNGAttribute)tag;
            if (att.getName().equals(name))
                return true;
        }
        
        return false;
    }
    
    
    public RNGElement getChildElement(String eltName)
    {
        for (RNGTag tag: children)
            if (isElementWithName(tag, eltName))
                return (RNGElement)tag;
        
        return null;
    }
    
    
    public boolean isElementWithName(RNGTag tag, String name)
    {
        if (tag instanceof RNGElement)
        {
            RNGElement elt = (RNGElement)tag;
            if (elt.getName().equals(name))
                return true;
        }
        
        return false;
    }
    
    
    public RNGValue getChildValue()
    {
        for (RNGTag tag: children)
            if (tag instanceof RNGValue)
                return (RNGValue)tag;
        
        return null;
    }
    
    
    public void add(RNGTag tag)
    {
        children.add(tag);
        tag.setParent(this);
    }
    
    
    @Override
    public RNGTagList clone()
    {
        RNGTagList newTagList = (RNGTagList)super.clone();
        
        // deep clone children and assign this as parent
        List<RNGTag> newChildren = new ArrayList<RNGTag>();
        for (RNGTag child: children)
        {
            RNGTag childClone = child.clone();
            childClone.setParent(newTagList);
            newChildren.add(childClone);
        }
        
        newTagList.children = newChildren;
        return newTagList;
    }
}
