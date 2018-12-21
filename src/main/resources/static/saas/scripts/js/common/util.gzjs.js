/**
 * @author jin </DD>
 *         </DT>
 *         <DT><b>日期：</b></DT>
 *         <DD>Nov 2, 2009</DD>
 *         <DT><b>描述：</b></DT>
 *         <DD>util.js文件定义了系统一些全局变量，如公用的样式、公用的图标、公用的名称等等</DD>
 * @version V0.1
 */
/** 定义TJ.iconCls命名空间 ==>> 此命名空间为button，表格等等组件图标样式变量维护 */
Ext.namespace("TJ.iconCls");
TJ.iconCls.btnIconAdd = "btnIconAdd";// button 增加图标样式
TJ.iconCls.btnIconDel = "btnIconDel";// button 删除图标样式
TJ.iconCls.btnIconEdit = "btnIconEdit";// button 修改图标样式
TJ.iconCls.btnIconSearch = "btnIconSearch";// button 查询图标样式
TJ.iconCls.btnIconSubmit = "btnIconSubmit";// button 提交图标样式
TJ.iconCls.Gird_icon = "iconFormList";// 数据表格图标样式
TJ.iconCls.Form_iconCls = "";// form表单容器图标样式
/** 定义TJ.system命名空间 ==>>该命名空间为系统提示信息维护 */
Ext.namespace("TJ.system");
TJ.system.systemTips = "系统提示";// 提示框 标题
/** 定义TJ.util命名空间 ==>>该命名空间为系统组件显示信息维护 */
Ext.namespace("TJ.util");
TJ.util.grid_displayMsg = "显示第 {0} 条到 {1} 条记录，一共 {2} 条";// 分页工具栏displayMsg信息
TJ.util.grid_emptyMsg = "没有记录";// 分页工具栏emptyMsg信息
TJ.util.Monday = "星期一";// “周”定义信息
TJ.util.Tuesday = "星期二";
TJ.util.Wednesday = "星期三";
TJ.util.Thursday = "星期四";
TJ.util.Friday = "星期五";
TJ.util.Saturday = "星期六";
TJ.util.Sunday = "星期日";
// Ext.BLANK_IMAGE_URL = "/saas/images/common/s.gif";// 空白图片地址
TJ.util.BLANK_IMAGE_URL = getRootPath() + "/images/common/s.gif";
TJ.util.CONTEXTPATH = "/egov";// 系统名称
TJ.util.IdCardClickMes = "双击身份证号码查看该家庭的救助待遇历史信息。";
TJ.util.HandleMes = "在列表中选择多条信息，点击此按钮可以进行批量办理。"
// 将二维数组转为对象，数组里仅能有两个元素
// 此方法可方便地根据值得到对应的中文。
// 例：var filterTypeData = [["001", "统一过滤器"], ["002", "条件过滤器"],["003",
// "条件过滤器"],["004", "条件过滤器"]];
// arrayToObject(filterTypeData)[value]
// 胡浩2010-4-28
function arrayToObject(array) {
    var object = {};// 建立一个空的对象
    for (var i = 0; i < array.length; i++) {// 循环数组元素
        object[array[i][0]] = array[i][1];
    }
    return object;
}

function setFitHeight(panel, grid, height) {
    /** *********设置查询条件和查询内容的自适应高度==开始*********** */
    panel.on('collapse', function() {
        grid.setHeight(document.getElementById('mainFrame').clientHeight - 30
            - height);
        return false;
    });
    panel.on('expand', function() {
        grid.setHeight(document.getElementById('mainFrame').clientHeight
            - panel.getSize().height - height);
        return false;
    })

    grid.setHeight(document.getElementById('mainFrame').clientHeight
        - panel.getSize().height - height);
    /** *********设置查询条件和查询内容的自适应高度==结束*********** */
}

function getValueByIdFromArr(arrObj, oId) {
    for (var i = 0; i < arrObj.length; i++) {
        if (arrObj[i][0] == oId) {
            return arrObj[i][1];
        }
    }
    return "";
}

/**
 * 计算年龄
 */
function calculateAge(now, birthDate) {

    var year = now.substring(0, 4);
    var month = now.substring(5, 7);
    var date = now.substring(8, 10);
    // 成员出生年份
    var birthYear = birthDate.substr(6, 4);
    var birthMonth = birthDate.substr(10, 2);
    var birthDate = birthDate.substr(12, 2);
    // alert(year + '==' + birthYear);
    var realyAge = parseInt(year) - parseInt(birthYear)-1;
//	 alert(realyAge);
    if (realyAge == 0) {
        return realyAge;
    } else {
        // alert(month);
//		 alert(parseDateToInt(birthMonth) + '===' + parseDateToInt(month))
//		 alert(parseDateToInt(birthMonth) <= parseDateToInt(month));
        if (parseDateToInt(birthMonth) <= parseDateToInt(month)) {

            realyAge = realyAge+1;
        } else if (parseDateToInt(birthMonth) == parseDateToInt(month)) {
            // alert(parseDateToInt(birthDate) + '---' + parseDateToInt(date))
//			if (parseDateToInt(birthDate) > parseDateToInt(date)) {
//				// alert('111');
//				realyAge = realyAge - 1;
//			}
        }
        return realyAge;
    }

}

function parseDateToInt(value) {
    if (value.substring(0, 1) == '0') {
        return value.substring(1, 2);
    } else {
        return parseInt(value);
    }
}

//定义自定义查询的行政区划下拉列表

//hiddenName-隐藏域中的名称（提交到后台的名称）;
//idName-id;
//selectNodeModel-有两个属性值：leaf表示必须选择到子节点，all表示所有节点都可以选择;
//defaultValueFlag-如果为true则默认取当前用户机构行政区划，false则没有默认值;
//deleteFlag-如果为true则可通过delete键清除，否则不能用delete键;
//readOnly-设置是否为只读框（带边框）getDefineQueryZoneCodeTree
function getDefineQueryZoneCodeTree(hiddenName, selectNodeModel,defaultValueFlag,fieldLabelText,vname,maxLevel) {
    var value = "";
    var urls="";
    if(maxLevel!=undefined&&maxLevel!=null)
    {
        urls="&maxLevel="+maxLevel;
    }
    if (defaultValueFlag == true) {
        value = new Ext.tree.TreeNode({
            text : TJ.user.orgZoneName,
            id : TJ.user.orgZoneCode
        });
    } else {
        value = "";
    }
    var zoneCodeTree = {
        tree : new Ext.tree.TreePanel({
            root : new Ext.tree.AsyncTreeNode({
                children : TJ.user.zoneJson
            }),
            autoScroll : false,
            autoHeight : true,
            rootVisible : false,
            loader : new Ext.tree.TreeLoader({
                dataUrl : path + '/security/org.do?act=getZonesByPid'+urls
            })
        }),
        fieldLabel : fieldLabelText,
        emptyText : '请选择',
        name :vname,
        hiddenName : hiddenName,
        selectNodeModel : selectNodeModel,
        value : value,
        defaultValue : value,
        anchor : '95%',
        valuecode : 'orgZoneCode'
    };
    return zoneCodeTree;
}
// 定义行政区划下拉列表

// hiddenName-隐藏域中的名称（提交到后台的名称）;
// idName-id;
// selectNodeModel-有两个属性值：leaf表示必须选择到子节点，all表示所有节点都可以选择;
// defaultValueFlag-如果为true则默认取当前用户机构行政区划，false则没有默认值;
// deleteFlag-如果为true则可通过delete键清除，否则不能用delete键;
// readOnly-设置是否为只读框（带边框）
function getZoneCodeTree(hiddenName, idName, selectNodeModel, defaultValueFlag,
                         deleteFlag, readOnly,maxLevel) {
    var value = "";
    var id = "";
    var urls="";
    if(maxLevel!=undefined&&maxLevel!=null)
    {
        urls="&maxLevel="+maxLevel;
    }
    if (defaultValueFlag == true) {
        value = new Ext.tree.TreeNode({
            text : TJ.user.orgZoneName,
            id : TJ.user.orgZoneCode
        });
    } else {
        value = "";
    }
    var zoneCodeTree = {
        tree : new Ext.tree.TreePanel({
            root : new Ext.tree.AsyncTreeNode({
                children : TJ.user.zoneJson
            }),
            autoScroll : false,
            autoHeight : true,
            rootVisible : false,
            loader : new Ext.tree.TreeLoader({
                dataUrl : path + '/security/org.do?act=getZonesByPid'+urls
            })
        }),
        id : idName,
        fieldLabel : '地区',
        emptyText : '请选择',
        name : 'aad012',
        hiddenName : hiddenName,
        selectNodeModel : selectNodeModel,
        enabledelete : deleteFlag,// delete删除键fasle不可用
        value : value,
        defaultValue : value,
        plugins : [new Ext.ux.FieldReadOnlyPlugin(readOnly)],
        anchor : '95%',
        valuecode : 'orgZoneCode'
    };
    return zoneCodeTree;
}
function getZoneCodeTreeForUnlogin(hiddenName, idName, selectNodeModel, defaultValueFlag,
                                   deleteFlag, readOnly,maxLevel) {
//	var sUrl=path;
//	if(saasUrl!=undefined)
//		{
//		sUrl=saasUrl;
//		}
    var value = "";
    var id = "";
    var urls="";
    if(maxLevel!=undefined&&maxLevel!=null)
    {
        urls="&maxLevel="+maxLevel;
    }
    if (defaultValueFlag == true) {
        value = new Ext.tree.TreeNode({
            text : TJ.user.orgZoneName,
            id : TJ.user.orgZoneCode
        });
    } else {
        value = "";
    }
    var zoneCodeTree = {
        tree : new Ext.tree.TreePanel({
            root : new Ext.tree.AsyncTreeNode({
                children : TJ.user.zoneJson
            }),
            autoScroll : false,
            autoHeight : true,
            rootVisible : false,
            loader : new Ext.tree.TreeLoader({
                dataUrl :  path+ '/appointment/appointmentAction.do?act=getZonesByPid'+urls
            })
        }),
        id : idName,
        fieldLabel : '地区',
        emptyText : '请选择',
        name : 'aad012',
        hiddenName : hiddenName,
        selectNodeModel : selectNodeModel,
        enabledelete : deleteFlag,// delete删除键fasle不可用
        value : value,
        defaultValue : value,
        plugins : [new Ext.ux.FieldReadOnlyPlugin(readOnly)],
        anchor : '95%',
        valuecode : 'orgZoneCode'
    };
    return zoneCodeTree;
}
//返回两位小数
function to2bits(flt) {
    if (parseFloat(flt) == flt) {
        return Math.round(flt * 100) / 100;
    } else {
        return 0;
    }
}
function getViewZoneCodeTree(hiddenName, idName, selectNodeModel,
                             defaultValueFlag, deleteFlag, readOnly) {
    var value = "";
    var id = "";
    if (defaultValueFlag == true) {
        value = new Ext.tree.TreeNode({
            text : TJ.user.orgZoneName,
            id : TJ.user.orgZoneCode
        });
    } else {
        value = "";
    }
    var zoneCodeTree = {
        tree : new Ext.tree.TreePanel({
            root : new Ext.tree.AsyncTreeNode({
                children : TJ.user.zoneJson
            }),
            autoScroll : false,
            autoHeight : true,
            rootVisible : false,
            loader : new Ext.tree.TreeLoader({
                dataUrl : path + '/security/org.do?act=getZonesByPid'
            })
        }),
        id : idName,
        fieldLabel : '地区',
        emptyText : '请选择',
        name : 'aad012',
        hiddenName : hiddenName,
        selectNodeModel : selectNodeModel,
        enabledelete : deleteFlag,// delete删除键fasle不可用
        value : value,
        defaultValue : value,
        plugins : [new Ext.ux.FieldReadOnlyPlugin(readOnly)],
        afterRender : function() {
            Ext.getCmp(idName).setReadOnly(true);
        },
        anchor : '95%',
        valuecode : 'orgZoneCode'
    };
    return zoneCodeTree;
}
function getProvinceZoneCodeTree(hiddenName, idName, selectNodeModel,
                                 defaultValueFlag, deleteFlag, nodeId, fieldLabel) {
    var value = "";
    var id = "";
    if (defaultValueFlag == true) {
        value = new Ext.tree.TreeNode({
            text : TJ.user.orgZoneName,
            id : TJ.user.orgZoneCode
        });
    } else {
        value = "";
    }

    if (fieldLabel == undefined || fieldLabel == '') {
        fieldLabel = '<font color=red>*</font>迁入地区';
    }
    var zoneCodeTree = {
        tree : new Ext.tree.TreePanel({
            root : new Ext.tree.AsyncTreeNode({
                text : '根',
                id : nodeId
            }),
            autoScroll : false,
            autoHeight : true,
            rootVisible : false,
//			loader : new Ext.tree.TreeLoader({
//				dataUrl : path + '/security/org.do?act=getProvinceZones'
//			})
            //2013-3-26 查询已启用的行政区划
            loader : new Ext.tree.TreeLoader({
                dataUrl : path + '/security/org.do?act=getProvinceEnabledZones'
            })
        }),
        id : idName,
        fieldLabel : fieldLabel,
        emptyText : '请选择',
        name : 'aac083',
        allowBlank : false,
        blankText : '迁入地区不允许为空',
        hiddenName : hiddenName,
        selectNodeModel : selectNodeModel,
        enabledelete : deleteFlag,// delete删除键fasle不可用
        value : value,
        defaultValue : value,
        plugins : [new Ext.ux.FieldReadOnlyPlugin()],
        anchor : '95%',
        valuecode : 'orgZoneCode'
    };
    return zoneCodeTree;
}

function getCloumnNumByDataIndex(grid, dataIndex) {
    var column = grid.getColumnModel();
    for (var i = 0; i < column.getColumnCount(); i++) {
        if (column.getDataIndex(i) == dataIndex) {
            return i;
        }
    }
}

// 根据当前用户的级别隐藏对应的行政区划，如当前用户是街道，则把查询列表中的街道名称隐藏
// grid-表示定义的grid列表
// streetDataIndex-grid列表中定义的街道dataIndex的名称
// communityDataIndex-grid列表中定义的社区dataIndex的名称
function hideByDataIndex(grid, streetDataIndex, communityDataIndex) {
    var hiddenStreet = false;
    var hiddenCommunity = false;
    if (TJ.user.level == 6) {
        // 如果当前用户为社区用户
        // 隐藏街道列
        hiddenStreet = true;
        // 隐藏社区列
        // hiddenCommunity=true;
    } else if (TJ.user.level == 5) {
        // 如果当前用户为街道用户
        // 隐藏街道列
        hiddenStreet = true;
    }
    var column = grid.getColumnModel();
    var j = 0;
    for (var i = 0; i < column.getColumnCount(); i++) {
        if (hiddenStreet && (column.getDataIndex(i) == streetDataIndex)) {
            column.setHidden(i, true);
        }
        if (hiddenCommunity && (column.getDataIndex(i) == communityDataIndex)) {
            column.setHidden(i, true);
        }
    }
}
// 隐藏指定的列
// grid-表示定义的grid列表
// dataIndex-grid列表中定义的dataIndex的名称

function hideColumnByDataIndex(grid, dataIndex) {
    var column = grid.getColumnModel();
    for (var i = 0; i < column.getColumnCount(); i++) {
        if (column.getDataIndex(i) == dataIndex) {
            column.setHidden(i, true);
        }
    }
}

// 是否默认显示查询列表,flag=true则默认显示查询列表
function loadStore(store, flag,cookieFlag,form,businessType,num) {
    if (flag&&store!=null&&store!='undefined') {
        if(cookieFlag!='undefined'&&cookieFlag==true){
            var obj = store.baseParams;
            var paramStr="";
            // 把当前的页面的查询条件传到后台
            for (i in obj) {
                var objValue=getCookie("beingdone_" + i + "_cookie"+businessType+num);
                if(objValue!=null&&objValue!=""&&objValue!="undefined")
                {
                    paramStr += "\""+i + "\":\"" + objValue + "\",";
                    var filedObj=form.findField(i);
                    if(filedObj!=null&&filedObj!='undefined'){
                        filedObj.setValue(objValue);
                    }
                }
            }
            //alert(paramStr)
            if(paramStr!="")
            {
                //设置行政区划
                var aad012Filed=form.findField("aad012");
                if(aad012Filed!=null&&aad012Filed!='undefined'){

                    if(getCookie("beingdone_aad012_cookie"+businessType+num)!='undefined'&&getCookie("beingdone_aad012_cookie"+businessType+num)!=null &&getCookie("beingdone_aad011_cookie"+businessType+num)!=null && getCookie("beingdone_aad011_cookie"+businessType+num)!="")
                        aad012Filed.setValue("{text:\'"+ getCookie("beingdone_aad012_cookie"+businessType+num)+ "\',id:\'"+ getCookie("beingdone_aad011_cookie"+businessType+num)+ "\'}");
                }
                paramStr="{"+paramStr.substring(0,paramStr.length-1)+"}";
                store.baseParams =eval("("+paramStr+")");
            }
        }
        store.load({
            params : {
                limit : 20,
                start : 0
            }
        });
    }else{//如果已经查看过则加载
        if(cookieFlag!='undefined'&&cookieFlag==true){
            var obj = store.baseParams;
            var paramStr="";
            // 把当前的页面的查询条件传到后台
            for (i in obj) {
                var objValue=getCookie("beingdone_" + i + "_cookie"+businessType+num);
                if(objValue!=null&&objValue!=""&&objValue!="undefined")
                {
                    paramStr += "\""+i + "\":\"" + objValue + "\",";
                    var filedObj=form.findField(i);
                    if(filedObj!=null&&filedObj!='undefined'){
                        filedObj.setValue(objValue);
                    }
                }
            }
            //alert(paramStr)
            if(paramStr!="")
            {
                //设置行政区划
                var aad012Filed=form.findField("aad012");
                if(aad012Filed!=null&&aad012Filed!='undefined'){

                    if(getCookie("beingdone_aad012_cookie"+businessType+num)!='undefined'&&getCookie("beingdone_aad012_cookie"+businessType+num)!=null &&getCookie("beingdone_aad011_cookie"+businessType+num)!=null && getCookie("beingdone_aad011_cookie"+businessType+num)!="")
                        aad012Filed.setValue("{text:\'"+ getCookie("beingdone_aad012_cookie"+businessType+num)+ "\',id:\'"+ getCookie("beingdone_aad011_cookie"+businessType+num)+ "\'}");
                }
                paramStr="{"+paramStr.substring(0,paramStr.length-1)+"}";
                store.baseParams =eval("("+paramStr+")");
            };
//			store.load({
//				params : {
//					limit : 20,
//					start : 0
//				}
//			});
        }
    }
}
// 日期转换：从String转为Date
function getDateFromString(strDate) {
    var arrYmd = strDate.split("-");;
    var numYear = parseInt(arrYmd[0], 10);
    var numMonth = parseInt(arrYmd[1], 10) - 1;
    var numDay = parseInt(arrYmd[2], 10);

    return new Date(numYear, numMonth, numDay);

}
// 日期加天数获得新的日期
Date.prototype.addDay = function(num) {
    this.setDate(this.getDate() + num);
    return this;
}
// 定义公示日期的区间函数
function publicityDateRange(beginComment, endComment) {
    var beginValue = getDateFromString(beginComment.formatDate(beginComment
        .getValue()));
    var endValue = endComment.formatDate(endComment.getValue());
    var rangeDate = 5;// 定义公示日期至少为5天
    if (endValue != "") {
        endValue = getDateFromString(endValue);
        // 如果公示日期小于5天，应默认修改公示结束日期
        if ((endValue - beginValue) / (1000 * 60 * 60 * 24) + 1 < rangeDate) {// alert(beginValue);
            var newValue = beginValue.addDay(rangeDate - 1);
            // alert()
            endComment.setValue(newValue);
        }
    }

}

// 定义按钮权限控制机制
Ext.namespace("Ext.ux")
Ext.ux.ButtonPlugin = function(btnAuthConfig,disabledFlag) {
    var button;
    this.init = function(objHasPlugin) {
        button = objHasPlugin;
        // button.on('beforerender', function(t) {
        show(btnAuthConfig);
        // });
    }
    function show(btnAuthConfig) {
        var authURL = button.authURL;
        var b = false;
        if (btnAuthConfig != undefined && btnAuthConfig.length > 0) {
            for (var i = 0; i < btnAuthConfig.length; i++) {
                var system = btnAuthConfig[i];
                // 后台定义的Json
                if (system.url == authURL) {
                    b = true;
                    break;
                }
            }

        }
        if (!b) {
            if(disabledFlag)
            {
                button.disabled=true;
            }
            else
            {
                button.isHidden = true;
                button.hide();
            }
        }

    }
}

function trimZero(zonecode) {
    if (zonecode == "000000000000") {
        zonecode = "";
    } else if (zonecode.substring(2, 12) == "0000000000") {
        zonecode = zonecode.substring(0, 2);
    } else if (zonecode.substring(4, 12) == "00000000") {
        zonecode = zonecode.substring(0, 4);
    } else if (zonecode.substring(6, 12) == "000000") {
        zonecode = zonecode.substring(0, 6);
    } else if (zonecode.substring(9, 12) == "000") {
        zonecode = zonecode.substring(0, 9);;
    }
    return zonecode;
}

//删除申请信息
var deleteApplication = function(grid, store, msg) {
    var loadMask = new Ext.LoadMask(Ext.getBody(), {
        msg : '操作进行中...'
    });
    var recordDel = grid.getSelectionModel().getSelections();
    if (recordDel.length > 0) {
        var strAbe010 = "";
        for (var i = 0; i < recordDel.length; i++) {
            var abe010 = recordDel[i].get('abe010');
            strAbe010 += abe010;
            if (i < recordDel.length - 1) {
                strAbe010 += ",";
            }
            showQuestions(msg, function(btn) {
                if (btn == 'ok') {
                    loadMask.show();
                    Ext.Ajax.request({
                        url : path
                        + '/relief/calcAction.do?act=deleteApplication',
                        params : {
                            strAbe010 : strAbe010
                        },
                        success : function(response, opts) {
                            store.reload();
                            showInfo(TJ.prompt.operationSuccess);
                            loadMask.hide();
                        },
                        failure : function(response, opts) {
                            loadMask.hide();
                        }
                    })
                }
            })
        }
    } else {
        showInfo(TJ.prompt.selectData);
    }
}

//撤回申请信息
var recordApplication = function(grid, store, msg) {
    var loadMask = new Ext.LoadMask(Ext.getBody(), {
        msg : '操作进行中...'
    });
    var recordDel = grid.getSelectionModel().getSelections();

    if(recordDel.length == 0){//没有选中
        showInfo(TJ.prompt.selectData);
        return;
    }else if(recordDel.length > 1){//选中了多条
        showInfo(TJ.prompt.oneData);
        return;
    }else {
        var strAbe010 = "";
        for (var i = 0; i < recordDel.length; i++) {
            var abe010 = recordDel[i].get('abe010');
            strAbe010 += abe010;
            if (i < recordDel.length - 1) {
                strAbe010 += ",";
            }

            loadMask.show();
            Ext.Ajax.request({//是否可以撤回信息
                url : path
                + '/relief/calcAction.do?act=isAllowRecordApplication',
                params : {
                    strAbe010 : strAbe010
                },
                success : function(response) {
                    loadMask.hide();
                    if (response.responseText == '') {//可以撤回
                        //开始执行撤回申请
                        showQuestions(msg, function(btn) {
                            if (btn == 'ok') {
                                loadMask.show();
                                Ext.Ajax.request({
                                    url : path + '/relief/calcAction.do?act=saveRecordApplication',
                                    params : {
                                        strAbe010 : strAbe010
                                    },
                                    success : function(response) {
                                        if (response.responseText == 'success') {
                                            loadMask.hide();
                                            store.reload();
                                            showInfo(TJ.prompt.operationSuccess);
                                        } else {
                                            loadMask.hide();
                                            showInfo("上级已办理这份申请,此份申请不能再被您撤回!");
                                        }
                                    },
                                    failure : function(response, opts) {
                                        loadMask.hide();
                                    }
                                })
                            }
                        })
                    }else{
                        showInfo(response.responseText);
                    }
                },
                failure : function(response, opts) {
                    load_Mask.hide();
                }
            })
        }
    }
}

//申请信息是否已经被撤回
function isRecordApplication(abe010) {
    var isRecord;
    var load_Mask = new Ext.LoadMask(Ext.getBody(), {
        msg : '操作进行中...'
    });
    load_Mask.show();
    Ext.Ajax.request({
        url : path
        + '/relief/calcAction.do?act=isRecordApplication',
        params : {
            abe010 : abe010
        },
        success : function(response) {
            load_Mask.hide();
            if (response.responseText == 'record') {
                isRecord = false;
            }else{
                isRecord = true;
            }
        },
        failure : function(response, opts) {
            load_Mask.hide();
            isRecord = true;
        }
    })
    return isRecord;
}

// 控制待办列表中的办理状态选项
var codeConfig = function(btnAuthConfig) {
    var status = BusinessStatus;
    if (TJ.user.singleBusiness) {
        status = SingleBusinessStatus;
    }
    var object = " ";
    var childrenLength = status[0].children.length;
    for (var statusNum = 0; statusNum < btnAuthConfig.length; statusNum++) {
        objectId = btnAuthConfig[statusNum].url;
        for (var i = 0; i < childrenLength; i++) {
            if (status[0].children[i].codeValueGb == objectId) {
                objectText = status[0].children[i].text;
                break;
            }
        }
        if (objectId.length == 2) {
            object += "['" + objectId + "','" + objectText + "'],";
        }
    }
    var data = eval("[" + object.substring(0, object.length - 1) + "]");
    return data;
}
/*
 * 方法:Array.remove(dx) 通过遍历,重构数组 功能:删除数组元素. 参数:dx删除元素的下标.
 */
Array.prototype.remove = function(dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i]
        }
    }
    this.length -= 1
}
/*
 * 方法:JS构建Map.
 */
function struct(key, value) {
    this.key = key;
    this.value = value;
}

function put(key, value) {
    for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
            this.arr[i].value = value;
            return;
        }
    }
    this.arr[this.arr.length] = new struct(key, value);
}

function get(key) {
    for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].key === key) {
            return this.arr[i].value;
        }
    }
    return null;
}

function remove(key) {
    var v;
    for (var i = 0; i < this.arr.length; i++) {
        v = this.arr.pop();
        if (v.key === key) {
            continue;
        }
        this.arr.unshift(v);
    }
}

function size() {
    return this.arr.length;
}

function isEmpty() {
    return this.arr.length <= 0;
}

function Map() {
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}

// ========================JS构建Map======end=========================

// JS对需存入的COOKIES值进行编码
function codeCookie(str) {
    var strRtn = "";

    for (var i = str.length - 1; i >= 0; i--) {
        strRtn += str.charCodeAt(i);
        if (i)
            strRtn += "a"; // 用a作分隔符
    }
    return strRtn;
}

// JS读取COOKIES时再解密
function decodeCookie(str) {
    var strArr;
    var strRtn = "";
    strArr = str.split("a");
    for (var i = strArr.length - 1; i >= 0; i--)
        strRtn += String.fromCharCode(eval(strArr[i]));
    return strRtn;
}



// 业务单机版中，控制按钮的显示，以及按钮名称
// saveBtId:保存按钮ID；upBtId:上报（或办结）按钮ID；sendBackBtId:退回按钮ID；stauts:业务办理环节（01-受理;02-审查；03-审核；04-审批）
function setSingleBusinessBt(saveBtId, upBtId, sendBackBtId, status) {
    var singlBusiness = TJ.user.singleBusiness;
    if (singlBusiness)// 如果是业务单机版
    {
        Ext.getCmp(saveBtId).setVisible(false);// 把所有的保存按钮都隐藏

        if (status == "02")// 如果是审查页面，则把“上报”按钮名称改为“保存并录入审核信息”
        {
            // Ext.getCmp(upBtId).setText("录入审核信息");
            Ext.getCmp(upBtId).setText("保存");
        } else if (status == "03")// 如果是审核页面，则把“上报”按钮名称改为“保存并录入审批信息”，“退回”按钮名称改为“修改审查信息”
        {
            // 对于临时救助的审核环节有办结的功能，所以此时传入进来的upBtId格式为'上报按钮ID,办结按钮ID'
            var upBtArray = upBtId.split(",");
            // Ext.getCmp(upBtArray[0]).setText("录入审批信息");
            Ext.getCmp(upBtArray[0]).setText("保存");
            if (upBtArray.length == 2) {
                Ext.getCmp(upBtArray[1]).setText("完成并关闭");
            }
            // Ext.getCmp(sendBackBtId).setText("修改审查信息");
            Ext.getCmp(sendBackBtId).setText("返回上一步");
        } else if (status == "04")// 如果是审核页面，则把“办结”按钮名称改为“完成并关闭”，“退回”按钮名称改为“修改审核信息”
        {
            Ext.getCmp(upBtId).setText("完成并关闭");
            // Ext.getCmp(sendBackBtId).setText("修改审核信息");
            Ext.getCmp(sendBackBtId).setText("返回上一步");
        }
    }
}
// 业务单机版中，控制待办列表显示的列，主要是把“办理时限”去掉，并修改办理状态中显示的内容，
// 如果是业务单机版，则调用的是SingleBusinessStatus这个码表，否则调用的是BusinessStatus这个码表
function getBusinessStatusComboboxOrTreeUtil(businessType) {
    var singlBusiness = TJ.user.singleBusiness;
    if (singlBusiness)// 如果是业务单机版
    {
        return new Ext.ux.ComboboxOrTreeUtil('SingleBusinessStatus',
            businessType);
    } else {
        return new Ext.ux.ComboboxOrTreeUtil('BusinessStatus', businessType);
    }
}
// 隐藏指定ID的form或grid，如需隐藏多个form或grid，参数通过逗号分隔
function setPanelHidden(panelIds) {
    if (TJ.user.singleBusiness) {
        var pannelIdArray = panelIds.split(",")
        for (var i = 0; i < pannelIdArray.length; i++) {
            if (Ext.getCmp(pannelIdArray[i]) != null) {
                Ext.getCmp(pannelIdArray[i]).setVisible(false);
            }
        }
    }
}
// 如果是网络版，在待办中可以看到退回图标，且鼠标移到办理状态时显示相关的提示信息，如果是单机版，则不显示退回图标，也不显示退回的相关提示信息
// statusText当前状态中文名称；applicationId申请审批ID,statusValue当前状态编码
function getSendBackMessage(statusText, applicationId, statusValue) {
    var sendBackMessage = "<div ext:qtip='点击图标查看退回意见！'>"
        + statusText
        + "<img src='"
        + path
        + "/images/business/saas/sendback.jpg' style='cursor:pointer' onclick=showRollBackMes('"
        + applicationId + "','" + statusValue + "')></img></div>";
    if (TJ.user.singleBusiness) {
        sendBackMessage = statusText;
    }
    return sendBackMessage;
}
// 如果是业务单机版，则无需显示违规信息
function getViolationsShowName() {
    if (!TJ.user.singleBusiness) {
        return "[违规信息]";
    } else {
        return "";
    }

}
// 设置各环节的经办人是否为只读状态
function setFieldReadOnly(fieldId) {
    if (TJ.user.singleBusiness) {
        Ext.getCmp(fieldId).readOnly = false;
    }
}
//设置jsp页面中的按钮权限（是否显示该按钮）
function checkBtnAuth(id) {
    if (Ext.encode(btnAuthConfig).indexOf(id) == -1){
        document.getElementById(id).style.display = "none";
    }
}
// 在单机版中返回已办列表修改按钮，gridId为已办列表grid的ID
function getUpdateBt(gridId) {
    var exception = new Exception();// 创建显示异常信息组件
    var hiddenFlag = true;
    if (TJ.user.singleBusiness) {
        hiddenFlag = false;
    }
    var singleUpdateButton = new Ext.Button({
        text : '修改',
        hidden : hiddenFlag,
        handler : function() {
            var rows = Ext.getCmp(gridId).getSelectionModel().getSelections();
            if (rows.length == 0) {
                showInfo(TJ.prompt.selectData);
            } else if (rows.length == 1) {

                Ext.Ajax.request({
                    url : path
                    + '/singleCommon/singleCommonAction.do?act=updateApplicationStatusById',
                    params : {
                        abe010 : rows[0].get("abe010"),
                        status : "20"// 流程回到审查状态
                    },
                    success : function(response, opts) {
                        Ext.getCmp(gridId).getStore().reload();
                        var exce = exception
                            .setResponseText(response.responseText);

                        if (exce.error == "") {
                            var formUrl =exce.formUrl;
                            var abe012 = exce.abe012;// 业务办理类型ID
                            var abe010 = exce.abe010;// 申请审批ID
                            var aad011 = exce.aad011;// 行政区划代码
                            var abe019 = exce.abe019;// 办理状态
                            var aac000 = exce.aac000;// 人员ID
                            var aab010 = exce.aab010;// 家庭信息ID
                            var wfTaskOId =exce.wfTaskOId;// 任务实例id
                            var started = exce.started;// 任务实例id
                            var aac020=exce.aac020;// 人员其他信息ID

                            var urlString = path + formUrl + "&aac000="
                                + aac000 + "&abe010=" + abe010
                                + "&wfTaskOId=" + wfTaskOId + '&started='
                                + started + "&aac020=" + aac020
                                + "&aab010=" + aab010 + "&abe019=" + abe019
                                + '&aad011=' + aad011 + '&businessType='
                                + businessType + "&operationType=" + abe012;
                            singleBusinessFnBeing(urlString);
                        } else {
                            showInfo(exce.error);
                        }
                    },
                    failure : function(response, opts) {
                        showInfo('修改操作失败！');

                    }
                })
            }
        }
    });
    return singleUpdateButton;
}
var getJsonFromRecord=function(grid)
{
    var rowsData = [];
    var count = grid.length;
    var record;
    for (var i = 0; i < count; i++) {
        record = grid[i];
        rowsData.push(record.data);
    }
    return Ext.encode(rowsData);
}
var submitFlag=true;
var checkSubmit=function(){
    if(submitFlag)
    {
        submitFlag=false;
        return true;
    }
    else
    {
        //showInfo("请勿重复提交！");
        return false;
    }
}


//校验身份证最后一位
function valIdCardLastDigit(field){
    var idcard_array = field.getValue().split("");
    var S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
        * 7
        + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
        * 9
        + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
        * 10
        + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
        * 5
        + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
        * 8
        + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
        * 4
        + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
        * 2
        + parseInt(idcard_array[7])
        * 1
        + parseInt(idcard_array[8])
        * 6
        + parseInt(idcard_array[9]) * 3;
    var Y = S % 11;
    var M = "F";
    var JYM = "10X98765432";
    var M = JYM.substr(Y, 1);// 判断校验位
    if(M != idcard_array[17]&&'N'!=idcard_array[17]){
        showQuestions("身份证号码末位校验出错!,确认输入无误么?",function(flag){
            if(flag=='cancel'){
                field.setValue(TJ.user.orgZoneCode.substr(0, 6));//取该用户行政区划前 6 位
            }
        })
    }
}
