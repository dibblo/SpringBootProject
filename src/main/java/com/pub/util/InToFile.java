package com.pub.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class InToFile {
    public static final String IN_URL = "C:\\Users\\latiflan\\Desktop\\in.txt";

    public static File getFile() throws Exception{
        File file = new File(IN_URL);
        if (!file.exists()) {
            file.createNewFile();
        }
        return file;
    }

    public static BufferedReader getBufferedReader() throws Exception{
        FileInputStream inputStream = new FileInputStream(getFile());
        InputStreamReader streamReader = new InputStreamReader(inputStream);
        BufferedReader bufferedReader = new BufferedReader(streamReader);
        return bufferedReader;
    }
}
