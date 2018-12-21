package com.pub.util;

import java.util.Random;

public class OrgUtil {
	
	public final static String PASSWORD_INITIAL="";//默认密码
	public final static int PASSWORD_LENGTH=6;//密码长度
	

	/**
	 * 获取随机密码
	 * @author ylp
	 * @date 2018年4月9日
	 * @return
	 */
	public static String getRandomPassword(){
		String passsword=PASSWORD_INITIAL;
		if(passsword!=""){
			return passsword;
		}
		StringBuffer str=new StringBuffer();
		Random random = new Random();
		for(int i=0;i<PASSWORD_LENGTH;i++){
			char c=(char)(int)(Math.random()*26+97);
			str.append(c+"");
	        int a=random.nextInt(10);
			str.append(a+"");
		}
		String before=str.toString();
		
		for(int i=0;i<PASSWORD_LENGTH;i++){
			int ch=random.nextInt(before.length());
			passsword=passsword+before.charAt(ch);
		}
		return passsword;
	}

	public static void main(String[] args) {
		StringBuffer s = new StringBuffer("");
		for(int i = 0 ;i<1300;i++){
			s.append(OrgUtil.getRandomPassword()).append("\n");
		}
		OutToFile.OUT(s.toString());
	}
}
