/**
 * 系统注销按钮执行的操作
 */
Ext.QuickTips.init();
path = getRootPath();
function logout(msg) {
    showQuestions(msg||'您是否要退出系统？', function(c) {
        if (c == "ok") {
            try{
                setTimeout(function(){
                    var ifr = window.top.document.createElement("IFRAME");
                    ifr.style.display= "none";
                    window.top.document.body.appendChild(ifr);
                    ifr.src = window.top.biPath + "js/login.sa?action=logout";
                    if(path.substring(path.length-1)=="/"){
                        window.top.location.href = path + 'j_acegi_logout';
                    }
                    else{
                        window.top.location.href = path + '/j_acegi_logout';
                    }
                },5);

            }catch(e){}

        }
    });
}
function towaiwang(){
    window.open("http://202.108.98.80/cms/");
}
/**
 * 系统退出按钮执行的操作
 */
function createOut() {
    showQuestions('您是否要退出系统？', function(c) {
        if (c == "ok") {
            window.opener = null;
            window.open('', '_self');
            window.close();
        }
    });
}

/**
 * 修改密码
 */
function createPassWord() {
    showQuestions('修改密码后必须重新登录，请保存相关数据后再修改密码，以防数据丢失。是否继续？', function(c) {
        if (c == "ok") {
            /**
             * 旧密码
             */
            var oldPassWordText = new Ext.form.TextField({
                xtype : 'password',
                inputType : 'password',
                name : 'password',
                fieldLabel : '<font style=color:red>*</font>旧密码',
                allowBlank : false,
                anchor : '85%'
            })
            /**
             * 新密码
             */
            var newPassWordText = new Ext.form.TextField({
                vtype : 'password',
                name : 'newPassword',
                inputType : 'password',
                fieldLabel : '<font style=color:red>*</font>新密码',
                allowBlank : false,
                minLength : 8,
                minLengthText : "新密码长度为8-18位，且至少必须为数字和字符组合",
                anchor : '85%',
                validator : function() {// 验证与上一个密码是否相同
                    var p1 = newPassWordText.getValue();
                    var p2 = oldPassWordText.getValue();
                    if (p1 == p2) {
                        return false;
                    }
                    return true;
                },
                invalidText : '新旧密码不允许相同',
                enableKeyEvents : true,
                listeners :{
                    "keyup":function(o){
                        var sPW = o.getValue();
                        var res = checkStrong(sPW);
                        strong.className ="strong"+res;
                    }
                }
            })
            /**
             * 验证密码
             */
            var invalidPassWordText = new Ext.form.TextField({
                type : 'password',
                inputType : 'password',
                name : 'p',
                fieldLabel : '<font style=color:red>*</font>确认新密码',
                anchor : '85%',
                allowBlank : false,
                vtype : 'password',
                minLength : 6,
                validator : function() {// 验证与上一个密码是否相同
                    var p1 = newPassWordText.getValue();
                    var p2 = invalidPassWordText.getValue();
                    if (p1 != p2) {
                        return false;
                    }
                    return true;
                },
                invalidText : '两次输入密码不一致'
            })

            var checkpassword = function(v){
                var numasc = 0;
                var charasc = 0;
                var otherasc = 0;
                if(0==v.length){
                    return "密码不能为空";
                }else if(v.length<8){
                    return "新密码长度为8-18位，且至少必须为数字和字符组合";
                }else if(v.length>18){
                    return "新密码长度为8-18位，且至少必须为数字和字符组合";
                }else{
                    for (var i = 0; i < v.length; i++) {
                        var asciiNumber = v.substr(i, 1).charCodeAt();
                        if (asciiNumber >= 48 && asciiNumber <= 57) {
                            numasc += 1;
                        }
                        if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {
                            charasc += 1;
                        }
                        if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {
                            otherasc += 1;
                        }
                    }
                    if(0==numasc)  {
                        return "新密码长度为8-18位，且至少必须为数字和字符组合";
                    }else if(0==charasc && 0==otherasc){
                        return "新密码长度为8-18位，且至少必须为数字和字符组合";
                    }
//			            else if(0==otherasc){
//			                return "密码必须含有特殊字符";
//			            }
                    else{
                        return true;
                    }
                }
            };
            /**
             * 定义提交form表单
             */
            var passwordForm = new Ext.form.FormPanel({
                labelAlign : 'right',
                labelSeparator : '：',
                labelWidth : 121,
                id : 'sys_passform',
                anchor : '100%',
                lines : false,
                autoScroll : true,
                items : [{
                    layout : 'form',
                    items : [oldPassWordText, newPassWordText,invalidPassWordText]
                }, {
                    layout : 'form',
                    html : '<p style="font-size:12px;margin:0 0 8px 5px;color:red">备注:新密码区分大小写，且长度为8-18位</p>'
                }],
                buttons : [{
                    text : '保存',
                    handler : function() {
                        //判断密码组合是否为字母加数字
                        if (passwordForm.getForm().isValid()
                            && passwordForm.getForm().isDirty()) {
                            var checkFlag=checkpassword(newPassWordText.getValue());
                            if(checkFlag==true){
                                //判断密码是否与用户名相同
                                if(newPassWordText.getValue()==username)
                                {
                                    showInfo("新密码不允许与用户名相同");
                                    return;
                                }
                                //判断是包含用户名
                                if(newPassWordText.getValue().indexOf(username)!=-1)
                                {
                                    showInfo("新密码不允许包含用户名");
                                    return;
                                }
                                // md5加密
                                oldPassWordText.setValue(hex_md5(oldPassWordText
                                    .getValue()));
                                newPassWordText.setValue(hex_md5(newPassWordText
                                    .getValue()));
                                invalidPassWordText
                                    .setValue(hex_md5(invalidPassWordText
                                        .getValue()));
                                // 提交修改
                                passwordForm.getForm().doAction('submit', {
                                    waitTitle : '密码修改',
                                    waitMsg : '正在修改...',
                                    url : path + '/security/user.do?act=changePassword',
                                    method : 'post',
                                    success : function(f, a) {
                                        passwordWindow.close();
                                        showInfo('密码修改成功，现在重新登录系统', function(c) {
                                            window.location.href = path + '/j_acegi_logout';
                                        });
                                    },
                                    failure : function(f, a) {
                                        var e = new Exception().setResponseText(a.response.responseText);//显示异常
                                        //showError('旧密码填写不正确！');
                                        oldPassWordText.setValue("");
                                        newPassWordText.setValue("");
                                        invalidPassWordText.setValue("");
                                    }
                                });
                            }
                            else
                            {
                                showInfo('密码至少为8位，且至少必须为数字和字符组合');
                                return ;
                            }
                        }
                    }
                }, {
                    text : '关闭',
                    handler : function() {
                        passwordWindow.close();
                    }
                }]
            });
            // 定义修改密码弹出框
            var passwordWindow = new Ext.Window({
                width : 400,
                closable : false,
                id : 'sys_passwind',
                layoyt : 'fit',
                title : '设置密码',
                items : [passwordForm]
            });
            passwordWindow.show();
            var po = newPassWordText.getEl().dom;
            var strong = document.createElement("DIV");
            strong.id = "strongIcon";
            strong.style.top  = "2px";
            strong.className ="strong1";
            try{
                po.parentElement.appendChild(strong);
                strong.style.left = "202px";
            }catch(e){
                po.parentNode.appendChild(strong);
                strong.style.left = "332px";
            }
        }
    });
}

function checkStrong(sPW){
    var box=0;
    if(sPW=="")
        box = -1;
    Modes=0;
    for (i=0;i<sPW.length;i++){
        Modes|=CharMode(sPW.charCodeAt(i));
    }
    box = bitTotal(Modes);
    if(box==1||box==0||box==-1){//弱
        return "2";
    }else if(box==2){//中
        return "3";
    }else if(box==3||box==4){//强
        return "4";
    }
}
function CharMode(iN){
    if (iN>=48 && iN <=57)
        return 1;
    else if (iN>=65 && iN <=90)
        return 2;
    else if (iN>=97 && iN <=122)
        return 4;
    else
        return 8;
}
function bitTotal(num){
    modes=0;
    for (i=0;i<4;i++){
        if (num & 1) modes++;
        num>>>=1;
    }
    return modes;
}