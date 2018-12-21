package com.pub.util;

import java.io.*;

public class ConvertStringToIn {
    public static final String IN_URL = "C:\\Users\\latiflan\\Desktop\\in.txt";

    public static void main(String[] args) {
        ConvertStringToIn csti = new ConvertStringToIn();
        csti.covertStrinToIn();
    }

    public void covertStrinToIn() {
        try {
            File file = InToFile.getFile();
            StringBuffer stringBuffer = new StringBuffer();
            stringBuffer.append("(");
            FileInputStream inputStream = new FileInputStream(file);
            InputStreamReader streamReader = new InputStreamReader(inputStream);
            BufferedReader bufferedReader = new BufferedReader(streamReader);
            String line = "";
            while ((line = bufferedReader.readLine()) != null) {
                stringBuffer.append("'").append(line).append("',");
            }
            if (stringBuffer.indexOf(",") > 0) {
                String string = stringBuffer.substring(0, stringBuffer.lastIndexOf(","));
                stringBuffer = new StringBuffer(string);
            }
            stringBuffer.append(")");
            OutToFile.OUT(stringBuffer.toString());
            bufferedReader.close();
            streamReader.close();
            inputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
