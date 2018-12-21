/**
 * 业务平台初始化js
 * 通过后台传来的json串来初始化业务平台。后台传来的json串分两类，一种是业务平台子系统的json串，一种是各个子系统对应功能json串
 * 子系统的json串格式是：每个对象代表的依次为“救助业务子系统”，“资金管理”，“业务监管”，“统计决策”，“预警监测”，“信息服务”，“信息交换”顺序不能变动 [{
 * fun : function() { init(config1);//初始化模块对应的功能
 * document.getElementById(selectBusinesId).className =
 * "iconBusiness01",//selectBusinesId是默认选择的模块id selectBusinesId = "a_1";
 * document.getElementById("a_1").className = "selcetedBusiness01";
 * document.getElementById('businessTitle_span').src =
 * '/saas/images/business/saas/default/worktable/title01.jpg';} }, {}.....{}]
 * 各个功能的json串格式是： [{ text : '资金登记',//功能名称 href : function() {//点击功能按钮请求的aiction
 * window.location.href =
 * "login.do?act=forward&nodeId=4028a1cb2651518e01265199708f0042" } }, {}...{}]
 */
var select = 'tagzjjs1';
function switchTagzjjs(tagzjjs) {
    var contentzjjs = select.substring(7);
    document.getElementById(select).getElementsByTagName("a")[0].className = "";
    select = tagzjjs;
    document.getElementById(tagzjjs).getElementsByTagName("a")[0].className = "selectzjjsli";
    document.getElementById('contentzjjs' + contentzjjs).className = "hidecontentzjjs";
    document.getElementById('contentzjjs' + tagzjjs.substring(7)).className = "";
    document.getElementById('img' + contentzjjs).style.display = "none";
    document.getElementById('img' + tagzjjs.substring(7)).style.display = "";
    document.getElementById('span' + contentzjjs).style.display = "";
    document.getElementById('span' + tagzjjs.substring(7)).style.display = "none";
}
function forwardToSubMenu(url){
    if(url.indexOf("http://") >= 0){
        window.open(url,"lowincome");
    }
    else{
        window.location.href = "login.do?act=forward&" + encodeURI(url);
    }
}
var submenuMax = 6;
Ext.onReady(function() {
    var dW = document.body.clientWidth; //窗口实际宽度
    var dH = document.body.clientHeight; //窗口实际高度
    var reference = [
        {width:1280,height:740,name:"bgNormal"},
        {width:1440,height:840,name:"bgBig"}
    ];//背景图参考长宽值
    var bgCss = ""; //背景图使用的css样式名
    for(var i=0;i<reference.length ;i++){
        if(dW <= reference[i].width && dH <= reference[i].height){
            bgCss = reference[i].name;
            break;
        }
    }
    if(bgCss == ""){
        bgCss = reference[i-1].name;
    }
    var logoCss = "logo";
    //如果是业务单机版则显示业务单机的图片
    if (singleBusiness) {
        logoCss = "logoSingle";
    }
    var blankWidth = (dW - 880)/2;
    var mainPanel = {
        html :
        '<div id="'+bgCss+'">'
        +'<div class="btnArea">'
        +'<span class="btnExit" onclick="javascript:logout();" title="退出"></span>'
        +'<span class="btnHelp" title="帮助中心" onclick="javascript:showHelp()"></span>'
        +'<span class="btnMes" id="btnMesId" title="提示信息" ></span>'
        +enterHTML
        +'<span class="btnSetPsw" onclick="javascript:createPassWord();" title="设置密码"></span>'
        +'</div>'
        +'<div class="'+logoCss+'"></div>'
        +'<div id="div" class="tabArea" style="padding-left:'+blankWidth+'"></div>'
        +'</div>'
    }
    var viewport = new Ext.Viewport({
        id : 'viewport',
        layout : 'fit',
        items : [ mainPanel]
    });


    var subdivInner = '';
    var divInner = '<div id="containerzjjs">';
    divInner += '<div id="titlezjjs">';
    divInner += '<ul>';
    var clickTab=null;
    for(var i=0;i<selectBusinessConfig.length;i++){
        var menuObj = selectBusinessConfig[i];
        var menuname = menuObj.name;
        var menunum = menuObj.ico;
        if(backTabName!=undefined && backTabName!=null &&backTabName!="")
        {
            if(menuname==backTabName)
            {
                clickTab = "tagzjjs"+menunum;
            }
        }

        if(i==0){
            select = "tagzjjs"+menunum;
        }


        divInner += '<li id="tagzjjs'+menunum+'">';
        divInner += '<a href="javascript:" '+(i==0?'class="selectzjjsli" ':'')+'onClick="switchTagzjjs(\'tagzjjs'+menunum+'\');">';
        divInner += '<span><img '+(i!=0?'style="margin:10px 0 0 10px;display:none" ':'')+'id="img'+menunum+'" src="saas/images/business/saas/default/worktable/tabMenu0'+menunum+'.gif" style="margin:10px 0 0 10px;">';
        divInner += '<span '+(i==0?'style="display:none" ':'')+'id="span'+menunum+'">'+menuname+'</span>';
        divInner += '</span></a></li>';

        var configObj = eval('config'+menunum);
        subdivInner += '<div id="contentzjjs'+menunum+'" '+(i!=0?'class="hidecontentzjjs"':'')+'>';
        subdivInner += '<div id="subMenu">';
        subdivInner += '<div style="height:20px;"></div>';
        subdivInner += '<table cellspacing="0" cellpadding="0" border="0">';
        subdivInner += '<tbody>';
        subdivInner += '<tr>';
        for(var j=0;j<configObj.length;j++){
            var newTr = j%submenuMax;
            if(newTr == 0){
                if(j != 0){
                    subdivInner += '</tr><tr>';
                }
            }



            var submenuObj = configObj[j];
            subdivInner += '<td>';
            subdivInner += '<div id="icon'+(j<9?('0'+(j+1)):(j+1))+'" title="'+submenuObj.text+'" style="float:left;">',
                subdivInner += '<a href="#" onclick=\"forwardToSubMenu(\''+submenuObj.href+'\')\">'+submenuObj.text+'</a>',
                subdivInner += '</div>',
                subdivInner += '</td>';
        }
        subdivInner += '</tr>';
        subdivInner += '</tbody>';
        subdivInner += '</table>';
        subdivInner += '</div>';
        subdivInner += '</div>';
        subdivInner += '</div>';
    }
    divInner += '</ul>';
    divInner += '</div>';
    divInner += '<div id="" class="">';
    divInner += subdivInner;
    divInner += '</div></div>';

    document.getElementById("div").innerHTML = divInner;
    if(clickTab!=null)
    {
        switchTagzjjs(clickTab);
    }


//	var ts = []
//	for (var i = 1; i < 8; i++) {
//		var configx = eval('config' + i);
//		var text = "";
//		if (1 == i)
//			text = "救助业务";
//		if (2 == i)
//			text = "资金管理";
//		if (3 == i)
//			text = "业务监管";
//		if (4 == i)
//			text = "统计决策";
//		if (5 == i)
//			text = "预警监测";
//		if (6 == i)
//			text = "信息交换";
//		if (configx != null) {
//			var obj = {
//				name : i,
//				text : text,
//				children : configx
//			};
//			ts.push(obj);
//		}
//	}
//
//	var tt = {
//		kids : ts
//	};
//	var t = new Ext.XTemplate(
//		'<div id="containerzjjs">',
//			'<div id="titlezjjs">',
//				'<ul>',
//					'<tpl for="kids">',
//						'<tpl if="this.equal(name)">',
//							'<li id="tagzjjs{name}"><a href="#" onClick="switchTagzjjs(\'tagzjjs{name}\',\'contentzjjs{name}\');" class="selectzjjsli"><span> <img id="img{name}" src="images/business/saas/default/worktable/tabMenu0{name}.gif" style="margin:10px 0 0 10px;"><span style="display:none" id="span{name}">{text}</span></span></a></li>',
//						'</tpl>',
//						'<tpl if="this.nequal(name)">',
//							'<li id="tagzjjs{name}"><a href="#" onClick="switchTagzjjs(\'tagzjjs{name}\',\'contentzjjs{name}\');"><span> <img id="img{name}" src="images/business/saas/default/worktable/tabMenu0{name}.gif" style="display:none;margin:10px 0 0 15px;"><span id="span{name}">{text}</span></span></a></li>',
//						'</tpl>',
//					'</tpl>',
//				'</ul>',
//			'</div>',
//			'<div id="" class="">',
//				'<tpl for="kids">',
//					'<tpl if="this.equal(name)">',
//					'<div id="contentzjjs1">',
//					'</tpl>',
//						'<tpl if="this.nequal(name)">',
//						'<div id="contentzjjs{name}" class="hidecontentzjjs">',
//						'</tpl>',
//							'<div id="subMenu">',
//								'<div style="height:20px;"></div>',
//								'<table cellspacing="0" cellpadding="0" border="0">',
//									'<tbody>',
//										'<tpl for="children">',
//											'<tpl if="this.br(xindex)">',
//												'<tr>',
//											'</tpl>',
//											'<td >',
//												'<div id="icon{[xindex<10?0+""+xindex:xindex]}" title="{text}" style="float: left;">',
//													'<a href="#"  onclick=\"forwardToSubMenu(\'{href}\')\">{text}</a>',
//												'</div>',
//											'</td>',
//											'<tpl if="this.bbr(xindex)">',
//												'</tr>',
//											'</tpl>',
//										'</tpl>',
//									'</tbody>',
//								'</table>',
//							'</div>',
//						'</div>',
//					'</div>',
//				'</tpl>',
//			'</div>',
//		'</div>',
//			{
//				equal : function(a) {
//					return a == 1;
//				},
//				bbr : function(num) {
//					if (num < 6) {
//						return false;
//					} else if (num % 6 == 0)
//						return true;
//				},
//				nequal : function(a) {
//					return !(a == 1);
//				},
//				br : function(num) {
//					if (num == 1) {
//						return true;
//					} else if ((num - 1) % 6 == 0)
//						return true;
//				}
//			})
//	t.append('div', tt);
})