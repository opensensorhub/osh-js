package com.sensia.swetools.editors.sensorml.client.utils;

public class BoyerMoore {
    private final int BASE;
    private int[] occurrence;
    private byte[] pattern;

    public BoyerMoore(String pattern) {
        this.BASE = 128;
        this.pattern = pattern.getBytes();

        occurrence = new int[BASE];
        for (int c = 0; c < BASE; c++)
            occurrence[c] = -1;
        for (int j = 0; j < pattern.length(); j++)
            occurrence[pattern.charAt(j)] = j;
    }

    public int search(byte[] text,int from) {
    	int[] occurrenceTmp = new int[occurrence.length];
    	System.arraycopy(occurrence, 0, occurrenceTmp, 0, occurrence.length);
    	int n = text.length;
    	int m = pattern.length;
        int skip;
        for (int i = from; i <= n - m; i += skip) {
            skip = 0;
            for (int j = m-1; j >= 0; j--) {
                if (pattern[j] != text[i+j]) {
                    //skip = Math.max(1, j - occurrence[text.charAt(i+j)]);
                	if(j - occurrenceTmp[text[i+j]] > 1){
                		skip = j - occurrenceTmp[text[i+j]];
                	}else{
                		skip = 1;
                	}
                    break;
                }
            }
            if (skip == 0) return i;
        }
        return -1;
    }
    
    public static void main(String[] args) {
		String text = "Lorem ipsum dolor sit amet";
		String pattern = "ipsum";
		BoyerMoore bm = new BoyerMoore(pattern);
		
		int first_occur_position = bm.search(text.getBytes(),0);
		System.out.println("The text '" + pattern + "' is first found after the " 
                                    + first_occur_position + " position.");
	}
}
