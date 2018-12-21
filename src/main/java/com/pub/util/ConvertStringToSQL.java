package com.pub.util;

import java.io.*;
import java.util.UUID;

public class ConvertStringToSQL {
    public static final String SPLIT_TAG = "\t";
    public static final String REPLACE_TAG = "\\?";
    public static final char REPLACE_TAG_CHAR = '?';

    public void convertToInserSql(String preSql) {
        try {
            File file = InToFile.getFile();
            StringBuffer stringBuffer = new StringBuffer();
            FileInputStream inputStream = new FileInputStream(file);
            InputStreamReader streamReader = new InputStreamReader(inputStream);
            BufferedReader bufferedReader = new BufferedReader(streamReader);
            String line = "";
            while ((line = bufferedReader.readLine()) != null) {
                String[] params = line.split(SPLIT_TAG);
                stringBuffer.append(convertToInsertSQL(preSql, params));
            }
            OutToFile.OUT(stringBuffer.toString());
            bufferedReader.close();
            streamReader.close();
            inputStream.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public String getPreSql() {
        /*
        *
        * 144a61672d3b4bbf8b0927c786f3ace8
15eb3319cb334aa2a8a410817acf62e8
2e86f00dc9534847856744af2ae4a405
8c4b52556ae541169913693b8c3fc365
8d9c5edcff2b48e7b677fc548016d33f
a76065bd8f4d4b9286bb1151572ce4d1
aa0a6bfba9764b5c9f5b993fa049d3b8
b9d8ec2daa674f048a739f608a6c4ea9
e30ec5e0d34e49cf80fbb3ca16a0ef30
f018ae4f7f8247de8264021cf5ed2b29
f2941a40863a40718d275b5ae3e6e6ac
f958b00880164e08bc484a756cf2048d */

/*        0e853b072e42478886c1ab54b84fd0dc
        144a61672d3b4bbf8b0927c786f3ace8
        159ff6d344dd4fd8837d34ccbff926e4
        1f5e93a12fc84b0cbd5f47caa85acb28
        59795a2a001245fcb61a2c2d3dd7c6ce
        60a6a2c53d0d42c5b0aa60017cc7bb40
        6a01bf24a0bb422bb8225b28443b89b0
        6da3b112b0bf408381eda9d0151a8590
        75e47ae27e8d4075b4bd7b8c8df5d4f7
                c25eece05eb245d5a03b7b93be3eda7c
        cc301094f944440a8a73e15a8e0554cb
                d73580ae8d694f14a4551c10c40165ae
        d82470036e4947fd928658ea6c63fad4
                fe6f511a68e54488803c25f92d6f3d4e*/
        String[] array = {
                "0e853b072e42478886c1ab54b84fd0dc",
                "144a61672d3b4bbf8b0927c786f3ace8",
                "159ff6d344dd4fd8837d34ccbff926e4",
                "1f5e93a12fc84b0cbd5f47caa85acb28",
                "59795a2a001245fcb61a2c2d3dd7c6ce",
                "60a6a2c53d0d42c5b0aa60017cc7bb40",
                "6a01bf24a0bb422bb8225b28443b89b0",
                "6da3b112b0bf408381eda9d0151a8590",
                "75e47ae27e8d4075b4bd7b8c8df5d4f7",
                "c25eece05eb245d5a03b7b93be3eda7c",
                "cc301094f944440a8a73e15a8e0554cb",
                "d73580ae8d694f14a4551c10c40165ae",
                "d82470036e4947fd928658ea6c63fad4",
                "fe6f511a68e54488803c25f92d6f3d4e"
        };
        StringBuffer s = new StringBuffer("");
        for (int i = 0; i < array.length; i++) {
            s.append("insert into cas_user_resource(id,user_id,resource_id) values(REPLACE(UUID(),'-',''),?,'").append(array[i]).append("');\n");
        }
        return s.toString();
    }

    public int getPreSqlParamsLeng() {
        String preSql = getPreSql();
        char[] chars = preSql.toCharArray();
        int count = 0;
        for (int i = 0; i < chars.length; i++) {
            char aChar = chars[i];
            if (aChar == REPLACE_TAG_CHAR) {
                count++;
            }
        }
        return count;
    }

    private String[] constructParams(String... params) {
        int paramsLengh = 14;
        String[] paramsArray = new String[14];
        for (int i = 0; i < paramsLengh; i++) {
            paramsArray[i] = params[i];
        }
        return paramsArray;
    }


    private String convertToInsertSQL(String preSql, String... params) throws Exception {
        StringBuffer result = new StringBuffer("");
        String[] preSqlArray = preSql.split(REPLACE_TAG);
        String[] paramsArray = constructParams(params);
        if (getPreSqlParamsLeng() != paramsArray.length) {
            throw new Exception("参数个数不匹配，需要参数个数：" + getPreSqlParamsLeng() + " 实际获取参数个数" + paramsArray.length);
        }
        for (int i = 0; i < paramsArray.length; i++) {
            preSql = preSql.replaceFirst(REPLACE_TAG, "'" + paramsArray[i] + "'");
        }
        result.append(preSql);
        String bufferr = result.substring(0, result.lastIndexOf(","));
        result = new StringBuffer(bufferr);
        result.append(preSqlArray[preSqlArray.length - 1]);
        return result.toString();
    }

    public static void main(String[] args) {
        ConvertStringToSQL csts = new ConvertStringToSQL();
        csts.convertToInserSql(csts.getPreSql());
    }
}
