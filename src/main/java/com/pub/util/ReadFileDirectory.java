package com.pub.util;

import org.springframework.util.CollectionUtils;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Collections;

public class ReadFileDirectory {
    public static final String DIRECTORY = "E:\\Project\\MergeProject\\khnt-oa\\branches\\khnt-oa";
    public static final String OUT_URL = "C:\\Users\\latiflan\\Desktop\\out.txt";

    private static ArrayList<String> getFiles(String path, ArrayList<String> files) {
        File file = new File(path);
        File[] tempList = file.listFiles();
        for (int i = 0; i < tempList.length; i++) {
            if (tempList[i].isFile()) {
                files.add(tempList[i].getAbsolutePath());
            }
            if (tempList[i].isDirectory()) {
                getFiles(tempList[i].getAbsolutePath(), files);
            }
        }
        return files;
    }

    public static void getFiles() {
        ArrayList<String> files = new ArrayList<String>();
        files = ReadFileDirectory.getFiles(ReadFileDirectory.DIRECTORY, files);
        File outFile = new File(OUT_URL);
        try {
            if (!outFile.exists()) {
                outFile.createNewFile();
            }
            FileOutputStream outputStream = new FileOutputStream(outFile);
            StringBuffer outSB = new StringBuffer("");
            if (!CollectionUtils.isEmpty(files)) {
                for (int i = 0; i < files.size(); i++) {
                    String s = files.get(i);
                    outSB.append(s).append("\n");
                }
            }
            outputStream.write(outSB.toString().getBytes());
        } catch (Exception e) {

        }

    }


    public static void main(String[] args) {
        ReadFileDirectory.getFiles();
    }
}
