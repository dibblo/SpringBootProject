var showHelp;
var exception = new Exception();
Ext.onReady(function() {
    showHelp=function(){
        var downLoadBtn1 = new Ext.Button({
            text : '下载系统帮助手册',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/help-1.pdf");}
        });
        var downLoadBtn2 = new Ext.Button({
            text : '下载常见问题手册',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/help-2.pdf");}
        });
        var downLoadBtn3 = new Ext.Button({
            text : '下载政策配置手册',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/help-3.doc");}
        });
//		var downLoadBtn4Hidden=true;
//		if(scanType!="000")
//			{
//			downLoadBtn4Hidden=false;
//			}
        /*		var downLoadBtn4 = new Ext.Button({
            text : '下载深圳良田S520R高拍仪驱动',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/S520R.exe");}
        });*/
        var downLoadBtn5 = new Ext.Button({
            text : '下载深圳良田M1高拍仪驱动',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/M1R.rar");}
        });
        var downLoadBtn6 = new Ext.Button({
            text : '下载兴鼎业M1高拍仪驱动',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/dingye.rar");}
        });
//		var downLoadBtn7 = new Ext.Button({
//			text : '下载紫光高拍仪驱动',
//			minWidth : 180,
//			handler : function() {window.open(path+"/templates/CamSDK.zip");}
//		});
        var downLoadBtn8 = new Ext.Button({
            text : '常见问题在线帮助',
            minWidth : 180,
            handler : function() {
                window.location.href = path + "/help/helpAadministratorAction.do?act=forwardAdministrator&aea063=1";
            }
        });
        var downLoadBtn9 = new Ext.Button({
            text : '系统管理功能在线帮助',
            minWidth : 180,
            handler : function() {
                window.location.href = path + "/help/helpAadministratorAction.do?act=forwardAdministrator&aea063=2";
            }
        });
        var downLoadBtn10 = new Ext.Button({
            text : '业务管理功能在线帮助',
            minWidth : 180,
            handler : function() {
                window.location.href = path + "/help/helpAadministratorAction.do?act=forwardAdministrator&aea063=4";
            }
        });
        var downLoadBtn11 = new Ext.Button({
            text : '业务办理功能在线帮助',
            minWidth : 180,
            handler : function() {
                window.location.href = path + "/help/helpAadministratorAction.do?act=forwardAdministrator&aea063=3";
            }
        });
        var downLoadBtn12 = new Ext.Button({
            text : '下载紫光M1高拍仪驱动',
            minWidth : 180,
            handler : function() {window.open(path+"/templates/ziguangM1.zip");}
        });

        var helpPanel = new Ext.Panel({
            align : 'center',
            items : [{
                layout : 'column',
                items : [{
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn8]
                },{
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn11]
                },{
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn10]
                },{
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn9]
                },{
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn1]
                }, {
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn2]
                },{
                    columnWidth : .5,
                    layout : 'form',
                    buttonAlign : 'right',
                    buttons : [downLoadBtn3]
                },
                    /*				{
                                        columnWidth : .5,
                                        layout : 'form',
                                        hidden:downLoadBtn4Hidden,
                                        buttonAlign : 'left',
                                        buttons : [downLoadBtn4]
                                    },*/
                    {
                        columnWidth : .5,
                        layout : 'form',
//					hidden:downLoadBtn4Hidden,
                        buttonAlign : 'right',
                        buttons : [downLoadBtn5]
                    },{
                        columnWidth : .5,
                        layout : 'form',
//					hidden:downLoadBtn4Hidden,
                        buttonAlign : 'right',
                        buttons : [downLoadBtn6]
                    }
//				,{
//					columnWidth : .5,
//					layout : 'form',
////					hidden:downLoadBtn4Hidden,
//					buttonAlign : 'right',
//					buttons : [downLoadBtn7]
//				}
                    ,{
                        columnWidth : .5,
                        layout : 'form',
//					hidden:downLoadBtn4Hidden,
                        buttonAlign : 'right',
                        buttons : [downLoadBtn12]
                    },{
                        columnWidth : 1,
                        layout : 'form',
                        buttonAlign : 'center',
                        html : "<font color=red><br><br>客服电话：4006-456-911 <br>（工作日8：30-17：30）<br><br></font>"
                    }
                ]
            }]
        });
        var helpWindow = new Ext.Window({
            title : '帮助中心',
            width : 500,
            height : 300,
            modal : true,
            resizable : false,
            layout : 'fit',
            buttonAlign : 'center',
            items : [helpPanel],
            buttons : [new Ext.Button({
                text : '关闭',
                minWidth : 70,
                handler : function() {
                    helpWindow.close()
                }
            })]
        });
        helpWindow.show();
    }
})