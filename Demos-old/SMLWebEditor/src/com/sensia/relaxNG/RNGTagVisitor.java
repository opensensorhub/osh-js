/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are Copyright (C) 2011 Sensia Software LLC.
 All Rights Reserved.
 
 Contributor(s): 
    Alexandre Robin <alex.robin@sensiasoftware.com>
 
******************************* END LICENSE BLOCK ***************************/

package com.sensia.relaxNG;

public interface RNGTagVisitor
{
    public void visit(RNGGrammar grammar);
    
    public void visit(RNGElement elt);

    public void visit(RNGChoice choice);

    public void visit(RNGOptional optional);

    public void visit(RNGAttribute attribute);

    public void visit(RNGRef ref);

    public void visit(RNGDefine pattern);

    public void visit(RNGOneOrMore oneOrMore);

    public void visit(RNGZeroOrMore zeroOrMore);

    public void visit(RNGGroup group);
    
    public void visit(RNGInterleave interleave);

    public void visit(RNGText text);
    
    public void visit(RNGValue val);
    
    public void visit(RNGList list);

    public void visit(RNGData<?> data);
    
    public void visit(XSDString data);
    
    public void visit(XSDBoolean data);

    public void visit(XSDDecimal data);
    
    public void visit(XSDDouble data);
    
    public void visit(XSDInteger data);
    
    public void visit(XSDAnyURI data);
                        
    public void visit(XSDDateTime data);                    
}
