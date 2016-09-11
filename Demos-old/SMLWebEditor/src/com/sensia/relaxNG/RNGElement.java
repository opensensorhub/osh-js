/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * RNGElement
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO RNGElement type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 26, 2011
 */
public class RNGElement extends RNGTagList
{
    private static final long serialVersionUID = 5001330919202005393L;
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
    public RNGElement clone()
    {
        RNGElement newTag = (RNGElement)super.clone();
        newTag.name = this.name;
        newTag.namespace = this.namespace;
        return newTag;
    }


    @Override
    protected RNGTag newInstance()
    {
        return new RNGElement();
    }    
}
