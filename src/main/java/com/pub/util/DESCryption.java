package com.pub.util;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;
import java.security.Key;
import java.security.spec.AlgorithmParameterSpec;

public class DESCryption {

    private static final byte[] DESIV = {0x12, 0x34, 0x56, 0x78, (byte) 0x90, (byte) 0xab, (byte) 0xcd, (byte) 0xef};
    private static final byte[] DESkey = {0x66, 0x67, 0x62, 0x64, 0x77, 0x6a, 0x6a, 0x6d};

    private static AlgorithmParameterSpec iv = null;// 加密算法的参数接口，IvParameterSpec是它的一个实现
    private static Key key = null;

    public DESCryption(byte[] DESkey, byte[] DESIV) throws Exception {
        DESKeySpec keySpec = new DESKeySpec(DESkey);// 设置密钥参数
        iv = new IvParameterSpec(DESIV);// 设置向量
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");// 获得密钥工厂
        key = keyFactory.generateSecret(keySpec);// 得到密钥对象
    }

    //加密方法
    public String encode(String data) throws Exception {
        Cipher enCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");// 得到加密对象Cipher
        enCipher.init(Cipher.ENCRYPT_MODE, key, iv);// 设置工作模式为加密模式，给出密钥和向量
        byte[] pasByte = enCipher.doFinal(data.getBytes("utf-8"));
        BASE64Encoder base64Encoder = new BASE64Encoder();
        return base64Encoder.encode(pasByte);
    }

    //解密方法
    public String decode(String data) throws Exception {
        System.out.println("length:" + data.length() + "    " + data.getBytes().length);
        Cipher deCipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
        deCipher.init(Cipher.DECRYPT_MODE, key, iv);
        BASE64Decoder decoder = new BASE64Decoder();
        byte[] pasByte =deCipher.doFinal(decoder.decodeBuffer(data));
        return new String(pasByte, "UTF-8");
    }

    //测试
    public static void main(String[] args) throws Exception {
        DESCryption tools = new DESCryption(DESkey, DESIV);
        System.out.println("解密：" + tools.decode("7p+zFAUlcjpaQHev71qdUw3GzM9ff6YzVcgo2ln1qXXH663ZhIPFIg=="));
    }
}