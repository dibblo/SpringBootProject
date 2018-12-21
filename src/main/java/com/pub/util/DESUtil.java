package com.pub.util;


import com.sun.org.apache.xerces.internal.impl.dv.util.Base64;
import org.springframework.util.Base64Utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.security.Key;
import java.security.SecureRandom;

public class DESUtil {
    private static Key key;
    //private static String KEY_STR = "KHPLARTFORM";
    private static String KEY_STR = "fgbdwjjm";

    static {
        try {
            KeyGenerator generator = KeyGenerator.getInstance("DES");
            SecureRandom secureRandom = new SecureRandom(KEY_STR.getBytes());
            generator.init(secureRandom);
            key = generator.generateKey();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getEncryptString(String str) {
        try {
            byte[] strBytes = str.getBytes("UTF-8");
            Cipher cipher = Cipher.getInstance("DES");
            cipher.init(1, key);
            byte[] encryptStrBytes = cipher.doFinal(strBytes);
            return Base64Utils.encode(encryptStrBytes).toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String getDecryptString(String str) {
        try {
            byte[] strBytes = Base64Utils.decode(str.getBytes());
            Cipher cipher = Cipher.getInstance("DES");
            cipher.init(2, key);
            byte[] encryptStrBytes = cipher.doFinal(strBytes);
            return new String(encryptStrBytes, "UTF-8");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private static byte[] _kes = new byte[]{
            -110, -76, -42, -8, -16, 43, 77, 111
    };

    public static byte[] convertHexString(String ss) {
        byte digest[] = new byte[ss.length() / 2];
        for (int i = 0; i < digest.length; i++) {
            String byteString = ss.substring(2 * i, 2 * i + 2);
            int byteValue = Integer.parseInt(byteString, 16);
            digest[i] = (byte) byteValue;
        }
        return digest;
    }

    public static String DecodeDES(String message, String key) throws Exception {

        //byte[] bytesrc =Base64Utils.decodeFromString(message);
        byte[] bytesrc = Base64.decode(message);

        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        DESKeySpec desKeySpec = new DESKeySpec(key.getBytes("UTF-8"));
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
        SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
        IvParameterSpec iv = new IvParameterSpec(key.getBytes("UTF-8"));
        cipher.init(Cipher.DECRYPT_MODE, secretKey, iv);
        byte[] retByte = cipher.doFinal(bytesrc);
        return new String(retByte, "UTF-8");
    }

    public static String DecryptDES(String decryptString, String decryptKey) throws Exception {
        decryptKey = KEY_STR;
        byte[] bytes = decryptKey.getBytes("UTF-8");
        byte[] kes = _kes;
        IvParameterSpec iv = new IvParameterSpec(kes);
        byte[] array = Base64Utils.decodeFromString(decryptString);


        KeyGenerator generator = KeyGenerator.getInstance("DES");
        SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
        secureRandom.setSeed(bytes);
        generator.init(secureRandom);
        key = generator.generateKey();
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key, iv);

        return new String(cipher.doFinal(array));
    }
    

/*    private static byte[] Keys = new byte[]
            {
                    18,  //-110
                    52,//-76
                    86,//-42
                    120,//-8
                    144, //16
                    171, //43
                    205, //77
                    239 //111
            };*/


    public static String getDecryptString(String str, String pskey) {
        try {
            Cipher cipher;
            byte[] byteFina = null;
            try {
                cipher = Cipher.getInstance("DES");
                cipher.init(Cipher.DECRYPT_MODE, key);
                byteFina = cipher.doFinal(Base64.decode(str));
            } catch (Exception e) {
                throw new RuntimeException(
                        "Error initializing SqlMap class. Cause: " + e);
            } finally {
                cipher = null;
            }
            return new String(byteFina);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static String decrypt(String decryptString, String decryptKey) throws Exception {
        IvParameterSpec iv = new IvParameterSpec(_kes);
        //SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes("UTF-8"), "DES");
        Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, key, iv);
        byte[] a1 = Base64.decode(decryptString);
        byte[] aa = decryptString.getBytes("UTF-8");
        return new String(cipher.doFinal(aa));
    }

    public static void main(String[] args) {
        try {
            System.out.println(new String("蓝家正"));
            System.out.println(DESUtil.getDecryptString("aE7VZHU1keMiSb/o+IAevA==", "fgbdwjjm"));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }

}