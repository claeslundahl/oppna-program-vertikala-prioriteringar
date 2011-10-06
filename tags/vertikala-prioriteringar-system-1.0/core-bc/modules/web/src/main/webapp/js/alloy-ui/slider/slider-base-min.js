/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.1
build: nightly
*/
YUI.add("slider-base",function(C){var B=C.Attribute.INVALID_VALUE;function A(){A.superclass.constructor.apply(this,arguments);}C.SliderBase=C.extend(A,C.Widget,{initializer:function(){this.axis=this.get("axis");this._key={dim:(this.axis==="y")?"height":"width",minEdge:(this.axis==="y")?"top":"left",maxEdge:(this.axis==="y")?"bottom":"right",xyIndex:(this.axis==="y")?1:0};this.publish("thumbMove",{defaultFn:this._defThumbMoveFn,queuable:true});},renderUI:function(){var D=this.get("contentBox");this.rail=this.renderRail();this._uiSetRailLength(this.get("length"));this.thumb=this.renderThumb();this.rail.appendChild(this.thumb);D.appendChild(this.rail);D.addClass(this.getClassName(this.axis));},renderRail:function(){var E=this.getClassName("rail","cap",this._key.minEdge),D=this.getClassName("rail","cap",this._key.maxEdge);return C.Node.create(C.substitute(this.RAIL_TEMPLATE,{railClass:this.getClassName("rail"),railMinCapClass:E,railMaxCapClass:D}));},_uiSetRailLength:function(D){this.rail.setStyle(this._key.dim,D);},renderThumb:function(){this._initThumbUrl();var D=this.get("thumbUrl");return C.Node.create(C.substitute(this.THUMB_TEMPLATE,{thumbClass:this.getClassName("thumb"),thumbShadowClass:this.getClassName("thumb","shadow"),thumbImageClass:this.getClassName("thumb","image"),thumbShadowUrl:D,thumbImageUrl:D}));},bindUI:function(){this._bindThumbDD();this._bindValueLogic();this.after("disabledChange",this._afterDisabledChange);this.after("lengthChange",this._afterLengthChange);},_bindThumbDD:function(){var D={constrain:this.rail};D["stick"+this.axis.toUpperCase()]=true;this._dd=new C.DD.Drag({node:this.thumb,bubble:false,on:{"drag:start":C.bind(this._onDragStart,this)},after:{"drag:drag":C.bind(this._afterDrag,this),"drag:end":C.bind(this._afterDragEnd,this)}});this._dd.plug(C.Plugin.DDConstrained,D);},_bindValueLogic:function(){},_uiMoveThumb:function(D){if(this.thumb){this.thumb.setStyle(this._key.minEdge,D+"px");this.fire("thumbMove",{offset:D});}},_onDragStart:function(D){this.fire("slideStart",{ddEvent:D});},_afterDrag:function(E){var F=E.info.xy[this._key.xyIndex],D=E.target.con._regionCache[this._key.minEdge];this.fire("thumbMove",{offset:(F-D),ddEvent:E});},_afterDragEnd:function(D){this.fire("slideEnd",{ddEvent:D});},_afterDisabledChange:function(D){this._dd.set("lock",D.newVal);},_afterLengthChange:function(D){if(this.get("rendered")){this._uiSetRailLength(D.newVal);this.syncUI();}},syncUI:function(){this._dd.con.resetCache();this._syncThumbPosition();},_syncThumbPosition:function(){},_setAxis:function(D){D=(D+"").toLowerCase();return(D==="x"||D==="y")?D:B;},_setLength:function(E){E=(E+"").toLowerCase();var F=parseFloat(E,10),D=E.replace(/[\d\.\-]/g,"")||this.DEF_UNIT;return F>0?(F+D):B;},_initThumbUrl:function(){var E=this.get("thumbUrl"),F=this.getSkinName()||"sam",D=C.config.base+"slider/assets/skins/"+F;if(!E){E=D+"/thumb-"+this.axis+".png";this.set("thumbUrl",E);}},BOUNDING_TEMPLATE:"<span></span>",CONTENT_TEMPLATE:"<span></span>",RAIL_TEMPLATE:'<span class="{railClass}">'+'<span class="{railMinCapClass}"></span>'+'<span class="{railMaxCapClass}"></span>'+"</span>",THUMB_TEMPLATE:'<span class="{thumbClass}" tabindex="-1">'+'<img src="{thumbShadowUrl}" '+'alt="Slider thumb shadow" '+'class="{thumbShadowClass}">'+'<img src="{thumbImageUrl}" '+'alt="Slider thumb" '+'class="{thumbImageClass}">'+"</span>"},{NAME:"sliderBase",ATTRS:{axis:{value:"x",writeOnce:true,setter:"_setAxis",lazyAdd:false},length:{value:"150px",setter:"_setLength"},thumbUrl:{value:null,validator:C.Lang.isString}}});},"3.1.1",{requires:["widget","substitute","dd-constrain"]});