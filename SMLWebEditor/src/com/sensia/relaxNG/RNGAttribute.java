/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


public class RNGAttribute extends RNGTagList
{
    private static final long serialVersionUID = 3739485010622658795L;    
    protected String namespace;
    protected String name;
    
    
    public String getNamespace()
    {
        return namespace;
    }


    public void setNamespace(String namespace)
    {
        this.namespace = namespace;
    }


    public String getName()
    {
        return name;
    }


    public void setName(String name)
    {
        this.name = name;
    }
    
    
    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);
    }
    
    
    @Override
    public RNGAttribute clone()
    {
        RNGAttribute newTag = (RNGAttribute)super.clone();
        newTag.name = this.name;
        newTag.namespace = this.namespace;
        return newTag;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGAttribute();
    }    
}
