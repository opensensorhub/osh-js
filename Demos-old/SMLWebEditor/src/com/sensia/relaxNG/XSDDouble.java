/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;


/**
 * <p><b>Title:</b>
 * XSDDouble
 * </p>
 *
 * <p><b>Description:</b><br/>
 * TODO XSDDouble type description
 * </p>
 *
 * <p>Copyright (c) 2011</p>
 * @author Alexandre Robin
 * @date Sep 01, 2011
 */
public class XSDDouble extends XSDDecimal
{
    private static final long serialVersionUID = 7080229544557496496L;


    @Override
    public void accept(RNGTagVisitor visitor)
    {
        visitor.visit(this);        
    }
    
    
    @Override
    protected RNGTag newInstance()
    {
        return new XSDDouble();
    }
}
