package com.pub.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class OutToFile {
    private static String OUT_URL = "C:\\Users\\latiflan\\Desktop\\out.txt";
    public static void OUT(String string) {
        File outfile = new File(OUT_URL);
        try {
            if (!outfile.exists()) {
                outfile.createNewFile();
            }
            OutputStream outputStream = new FileOutputStream(outfile);
            outputStream.write(string.getBytes());
            outputStream.close();
        } catch (Exception e) {

        }
    }
}
