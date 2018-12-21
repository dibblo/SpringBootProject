package com.pub.util;

import org.springframework.util.CollectionUtils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ConvertSelectToInsert {

    private static Connection JDBC_CONNECTION = null;

    public static String JDBC_MSSQL_URL = "jdbc:sqlserver://192.168.0.13:1631;databaseName=SCJGSW";
    public static String JDBC_MSSQL_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    public static String JDBC_MSSQL_USER = "scjgsw";
    public static String JDBC_MSSQL_PASSWORD = "scjgsw";

    public static String JDBC_ORACLE_URL = "jdbc:oracle:thin:@192.168.0.3:1521:khdb";
    public static String JDBC_ORACLE_DRIVER = "oracle.jdbc.driver.OracleDriver";
    public static String JDBC_ORACLE_USER = "bzmz";
    public static String JDBC_ORACLE_PASSWORD = "ush935B0giw66e";

    private static Connection getMSsqlConnection() throws Exception {
        Connection conn = null;
        Class.forName(JDBC_MSSQL_DRIVER);
        conn = DriverManager.getConnection(JDBC_MSSQL_URL, JDBC_MSSQL_USER, JDBC_MSSQL_PASSWORD);
        JDBC_CONNECTION = conn;
        return conn;
    }

    private static Connection getOracleConnection() throws Exception {
        Connection conn = null;
        Class.forName(JDBC_ORACLE_DRIVER);
        conn = DriverManager.getConnection(JDBC_ORACLE_URL, JDBC_ORACLE_USER, JDBC_ORACLE_PASSWORD);
        JDBC_CONNECTION = conn;
        return conn;
    }

    public static Connection getJdbcConnection() throws Exception {
        if (JDBC_CONNECTION != null) {
            return JDBC_CONNECTION;
        } else {
            System.out.println("请选择数据库：输入0选择oracle，输入1选择sqlserver，输入9退出选择");
            char read = '0';
            read = (char) System.in.read();
            if (read == '0') {
                System.out.println("选择的是oracle数据库");
                return getOracleConnection();
            } else if (read == '1') {
                System.out.println("选择的是sqlserver数据库");
                return getMSsqlConnection();
            } else if (read == '9') {
                System.out.println("选择退出");
                System.exit(0);
                return null;
            } else {
                System.out.println("未识别出选择项请重新选择：");
                return getJdbcConnection();
            }
        }
    }

    private static List<String> getMSsqlTableColumns(String MSSQL_TB_NAME) {
        String columnsSql = "select column_name from INFORMATION_SCHEMA.COLUMNS where\n" +
                " table_name='" + MSSQL_TB_NAME + "' ";
        Connection connection = null;
        List<String> arrayList = new ArrayList<String>();
        try {
            connection = ConvertSelectToInsert.getJdbcConnection();
            Statement statement = connection.createStatement();
            ResultSet rs = statement.executeQuery(columnsSql);
            while (rs.next()) {
                arrayList.add(rs.getString(1));
            }
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return arrayList;
    }

    public static StringBuffer getInsertSql(String selectSql, String table_name) {
        List<String> columns = getMSsqlTableColumns(table_name);
        StringBuffer sb = new StringBuffer("");
        if (!CollectionUtils.isEmpty(columns)) {

            Connection connection = null;
            try {
                connection = ConvertSelectToInsert.getJdbcConnection();
                Statement statement = connection.createStatement();
                ResultSet rs = statement.executeQuery(selectSql);
                while (rs.next()) {
                    sb.append("insert into ").append(table_name).append(" (");
                    for (int i = 0; i < columns.size(); i++) {
                        sb.append("").append(columns.get(i)).append(",");
                    }
                    sb.deleteCharAt(sb.lastIndexOf(","));
                    sb.append(") values (");
                    for (int i = 0; i < columns.size(); i++) {
                        Object object = rs.getObject(i + 1);
                        if (object == null) {
                            sb.append("NULL").append(",");
                        } else {
                            if (object.toString().contains("'")) {
                                String source = object.toString();
                                String[] sources = source.split("'");
                                sb.append("'");
                                for (int j = 0; j < sources.length; j++) {
                                    String s = sources[j];
                                    sb.append(s).append("''");
                                }
                                if (sources.length % 2 != 0) {
                                    sb.delete(sb.length() - 1, sb.length());
                                }
                                sb.append("',");
                            } else {
                                sb.append("'").append(object.toString()).append("',");
                            }
                        }
                    }
                    sb.deleteCharAt(sb.lastIndexOf(","));
                    sb.append(");\n");
                }
                connection.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return sb;
    }

    public static void main(String[] args) {
        StringBuffer sb = ConvertSelectToInsert.getInsertSql("select *\n" +
                "     from SYS_RESOURCE     \n" +
                "  start with id='2c902b8163fd0cb90163fd0f38e30001'\n" +
                " connect by prior id = parent_id", "SYS_RESOURCE");
        OutToFile.OUT(sb.toString());
    }

}
