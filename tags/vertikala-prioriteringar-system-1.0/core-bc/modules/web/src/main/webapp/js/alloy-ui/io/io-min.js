/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.1
build: nightly
*/
YUI.add("io-base",function(D){var d="io:start",P="io:complete",B="io:success",F="io:failure",e="io:end",X=0,O={"X-Requested-With":"XMLHttpRequest"},Z={},K=D.config.win;function b(h,v,p){var q,g,t,k,Y,z,n,x,l,y=h;v=D.Object(v);g=W(v.xdr||v.form,p);k=v.method?v.method=v.method.toUpperCase():v.method="GET";z=v.sync;n=v.data;if(D.Lang.isObject(v.data)&&D.QueryString){v.data=D.QueryString.stringify(v.data);}if(v.form){if(v.form.upload){return D.io._upload(g,h,v);}else{q=D.io._serialize(v.form,v.data);if(k==="POST"||k==="PUT"){v.data=q;}else{if(k==="GET"){h=R(h,q);}}}}else{if(v.data&&k==="GET"){h=R(h,v.data);}}if(g.t){return D.io.xdr(h,g,v);}if(!z){g.c.onreadystatechange=function(){c(g,v);};}try{g.c.open(k,h,z?false:true);if(v.xdr&&v.xdr.credentials){g.c.withCredentials=true;}}catch(x){if(v.xdr){return A(g,y,v,n);}}if(v.data&&k==="POST"){v.headers=D.merge({"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},v.headers);}C(g.c,v.headers);T(g.id,v);try{g.c.send(v.data||"");if(z){t=g.c;x=["status","statusText","responseText","responseXML"];Y=v.arguments?{id:g.id,arguments:v.arguments}:{id:g.id};for(l=0;l<4;l++){Y[x[l]]=g.c[x[l]];}Y.getAllResponseHeaders=function(){return t.getAllResponseHeaders();};Y.getResponseHeader=function(f){return t.getResponseHeader(f);};G(g,v);a(g,v);return Y;}}catch(w){if(v.xdr){return A(g,y,v,n);}}if(v.timeout){S(g,v.timeout);}return{id:g.id,abort:function(){return g.c?N(g,"abort"):false;},isInProgress:function(){return g.c?g.c.readyState!==4&&g.c.readyState!==0:false;}};}function Q(h,i){var g=new D.EventTarget().publish("transaction:"+h),Y=i.arguments,f=i.context||D;Y?g.on(i.on[h],f,Y):g.on(i.on[h],f);return g;}function T(g,f){var Y=f.arguments;f.on=f.on||{};Y?D.fire(d,g,Y):D.fire(d,g);if(f.on.start){Q("start",f).fire(g);}}function G(g,h){var f=g.e?{status:0,statusText:g.e}:g.c,Y=h.arguments;h.on=h.on||{};Y?D.fire(P,g.id,f,Y):D.fire(P,g.id,f);if(h.on.complete){Q("complete",h).fire(g.id,f);}}function U(f,g){var Y=g.arguments;g.on=g.on||{};Y?D.fire(B,f.id,f.c,Y):D.fire(B,f.id,f.c);if(g.on.success){Q("success",g).fire(f.id,f.c);}J(f,g);}function I(g,h){var f=g.e?{status:0,statusText:g.e}:g.c,Y=h.arguments;h.on=h.on||{};Y?D.fire(F,g.id,f,Y):D.fire(F,g.id,f);if(h.on.failure){Q("failure",h).fire(g.id,f);}J(g,h);}function J(f,g){var Y=g.arguments;g.on=g.on||{};Y?D.fire(e,f.id,Y):D.fire(e,f.id);if(g.on.end){Q("end",g).fire(f.id);}H(f);}function N(f,Y){if(f&&f.c){f.e=Y;f.c.abort();}}function A(g,Y,i,f){var h=parseInt(g.id);H(g);i.xdr.use="flash";i.form&&f?i.data=f:i.data=null;return D.io(Y,i,h);}function E(){var Y=X;X++;return Y;}function W(g,Y){var f={};f.id=D.Lang.isNumber(Y)?Y:E();g=g||{};if(!g.use&&!g.upload){f.c=L();}else{if(g.use){if(g.use==="native"){if(K.XDomainRequest){f.c=new XDomainRequest();f.t=g.use;}else{f.c=L();}}else{f.c=D.io._transport[g.use];f.t=g.use;}delete O["X-Requested-With"];}else{f.c={};}}return f;}function L(){return K.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");}function R(Y,f){Y+=((Y.indexOf("?")==-1)?"?":"&")+f;return Y;}function V(Y,f){if(f){O[Y]=f;}else{delete O[Y];}}function C(g,Y){var f;Y=Y||{};for(f in O){if(O.hasOwnProperty(f)){if(Y[f]){break;}else{Y[f]=O[f];}}}for(f in Y){if(Y.hasOwnProperty(f)){g.setRequestHeader(f,Y[f]);}}}function S(f,Y){Z[f.id]=K.setTimeout(function(){N(f,"timeout");},Y);}function M(Y){K.clearTimeout(Z[Y]);delete Z[Y];}function c(Y,f){if(Y.c.readyState===4){if(f.timeout){M(Y.id);}K.setTimeout(function(){G(Y,f);a(Y,f);},0);}}function a(g,h){var Y;try{if(g.c.status&&g.c.status!==0){Y=g.c.status;}else{Y=0;}}catch(f){Y=0;}if(Y>=200&&Y<300||Y===1223){U(g,h);}else{I(g,h);}}function H(Y){if(K&&K.XMLHttpRequest){if(Y.c){Y.c.onreadystatechange=null;}}Y.c=null;Y=null;}b.start=T;b.complete=G;b.success=U;b.failure=I;b.end=J;b._id=E;b._timeout=Z;b.header=V;D.io=b;D.io.http=b;},"3.1.1",{requires:["event-custom-base"],optional:["querystring-stringify-simple"]});YUI.add("io-form",function(A){A.mix(A.io,{_serialize:function(M,R){var I=encodeURIComponent,H=[],N=M.useDisabled||false,Q=0,B=(typeof M.id==="string")?M.id:M.id.getAttribute("id"),K,J,D,P,L,G,O,E,F,C;if(!B){B=A.guid("io:");M.id.setAttribute("id",B);}J=A.config.doc.getElementById(B);for(G=0,O=J.elements.length;G<O;++G){K=J.elements[G];L=K.disabled;D=K.name;if((N)?D:(D&&!L)){D=encodeURIComponent(D)+"=";P=encodeURIComponent(K.value);switch(K.type){case"select-one":if(K.selectedIndex>-1){C=K.options[K.selectedIndex];H[Q++]=D+I((C.attributes.value&&C.attributes.value.specified)?C.value:C.text);}break;case"select-multiple":if(K.selectedIndex>-1){for(E=K.selectedIndex,F=K.options.length;E<F;++E){C=K.options[E];if(C.selected){H[Q++]=D+I((C.attributes.value&&C.attributes.value.specified)?C.value:C.text);}}}break;case"radio":case"checkbox":if(K.checked){H[Q++]=D+P;}break;case"file":case undefined:case"reset":case"button":break;case"submit":default:H[Q++]=D+P;}}}return R?H.join("&")+"&"+R:H.join("&");}},true);},"3.1.1",{requires:["io-base","node-base"]});YUI.add("io-xdr",function(B){var J=B.publish("io:xdrReady",{fireOnce:true}),E={},F={},I=B.config.doc,K=B.config.win;function G(L,O){var M='<object id="yuiIoSwf" type="application/x-shockwave-flash" data="'+L+'" width="0" height="0">'+'<param name="movie" value="'+L+'">'+'<param name="FlashVars" value="yid='+O+'">'+'<param name="allowScriptAccess" value="always">'+"</object>",N=I.createElement("div");I.body.appendChild(N);N.innerHTML=M;}function A(L,M){L.c.onprogress=function(){F[L.id]=3;};L.c.onload=function(){F[L.id]=4;B.io.xdrResponse(L,M,"success");};L.c.onerror=function(){F[L.id]=4;B.io.xdrResponse(L,M,"failure");};if(M.timeout){L.c.ontimeout=function(){F[L.id]=4;B.io.xdrResponse(L,M,"timeout");};L.c.timeout=M.timeout;}}function C(P,O,M){var N,L;if(!P.e){N=O?decodeURI(P.c.responseText):P.c.responseText;L=M==="xml"?B.DataType.XML.parse(N):null;return{id:P.id,c:{responseText:N,responseXML:L}};}else{return{id:P.id,status:P.e};}}function H(L,M){return L.c.abort(L.id,M);}function D(L){return K&&K.XDomainRequest?F[L.id]!==4:L.c.isInProgress(L.id);
}B.mix(B.io,{_transport:{},xdr:function(L,M,N){if(N.on&&N.xdr.use==="flash"){E[M.id]={on:N.on,context:N.context,arguments:N.arguments};N.context=null;N.form=null;M.c.send(L,N,M.id);}else{if(K&&K.XDomainRequest){A(M,N);M.c.open(N.method||"GET",L);M.c.send(N.data);}else{M.c.send(L,M,N);}}return{id:M.id,abort:function(){return M.c?H(M,N):false;},isInProgress:function(){return M.c?D(M.id):false;}};},xdrResponse:function(Q,R,P){var L,N,O=R.xdr.use==="flash"?true:false,M=R.xdr.dataType;R.on=R.on||{};if(O){L=E||{};N=L[Q.id]?L[Q.id]:null;if(N){R.on=N.on;R.context=N.context;R.arguments=N.arguments;}}switch(P.toLowerCase()){case"start":B.io.start(Q.id,R);break;case"complete":B.io.complete(Q,R);break;case"success":B.io.success(M||O?C(Q,O,M):Q,R);O?delete L[Q.id]:delete F[Q.id];break;case"timeout":case"abort":case"failure":if(P===("abort"||"timeout")){Q.e=P;}B.io.failure(M||O?C(Q,O,M):Q,R);O?delete L[Q.id]:delete F[Q.id];break;}},xdrReady:function(L){B.fire(J,L);},transport:function(L){var M=L.yid?L.yid:B.id;L.id=L.id||"flash";if(L.id==="native"||L.id==="flash"){G(L.src,M);this._transport.flash=I.getElementById("yuiIoSwf");}else{this._transport[L.id]=L.src;}}});},"3.1.1",{requires:["io-base","datatype-xml"]});YUI.add("io-upload-iframe",function(B){var J=B.config.win,F=B.config.doc;function D(Q,P){var R=[],M=P.split("="),O,N;for(O=0,N=M.length-1;O<N;O++){R[O]=F.createElement("input");R[O].type="hidden";R[O].name=M[O].substring(M[O].lastIndexOf("&")+1);R[O].value=(O+1===N)?M[O+1]:M[O+1].substring(0,(M[O+1].lastIndexOf("&")));Q.appendChild(R[O]);}return R;}function G(O,P){var N,M;for(N=0,M=P.length;N<M;N++){O.removeChild(P[N]);}}function E(O,P,N){var M=(F.documentMode&&F.documentMode===8)?true:false;O.setAttribute("action",N);O.setAttribute("method","POST");O.setAttribute("target","ioupload"+P);O.setAttribute(B.UA.ie&&!M?"encoding":"enctype","multipart/form-data");}function L(N,M){var O;for(O in M){if(M.hasOwnProperty(M,O)){if(M[O]){N.setAttribute(O,N[O]);}else{N.removeAttribute(O);}}}}function K(N,O){var M=B.Node.create('<iframe id="ioupload'+N.id+'" name="ioupload'+N.id+'" />');M._node.style.position="absolute";M._node.style.top="-1000px";M._node.style.left="-1000px";B.one("body").appendChild(M);B.on("load",function(){A(N,O);},"#ioupload"+N.id);}function A(P,Q){var O=B.one("#ioupload"+P.id).get("contentWindow.document"),M=O.one("body"),N;if(Q.timeout){I(P.id);}if(M){N=M.query("pre:first-child");P.c.responseText=N?N.get("innerHTML"):M.get("innerHTML");}else{P.c.responseXML=O._node;}B.io.complete(P,Q);B.io.end(P,Q);J.setTimeout(function(){H(P.id);},0);}function C(M,N){B.io._timeout[M.id]=J.setTimeout(function(){var O={id:M.id,status:"timeout"};B.io.complete(O,N);B.io.end(O,N);},N.timeout);}function I(M){J.clearTimeout(B.io._timeout[M]);delete B.io._timeout[M];}function H(M){B.Event.purgeElement("#ioupload"+M,false);B.one("body").removeChild(B.one("#ioupload"+M));}B.mix(B.io,{_upload:function(Q,O,R){var P=(typeof R.form.id==="string")?F.getElementById(R.form.id):R.form.id,N,M={action:P.getAttribute("action"),target:P.getAttribute("target")};K(Q,R);E(P,Q.id,O);if(R.data){N=D(P,R.data);}if(R.timeout){C(Q,R);}P.submit();B.io.start(Q.id,R);if(R.data){G(P,N);}L(P,M);return{id:Q.id,abort:function(){var S={id:Q.id,status:"abort"};if(B.one("#ioupload"+Q.id)){H(Q.id);B.io.complete(S,R);B.io.end(S,R);}else{return false;}},isInProgress:function(){return B.one("#ioupload"+Q.id)?true:false;}};}});},"3.1.1",{requires:["io-base","node-base"]});YUI.add("io-queue",function(B){var A=new B.Queue(),I,G,M=1;function J(N,P){var O={uri:N,id:B.io._id(),cfg:P};A.add(O);if(M===1){F();}return O;}function F(){var N=A.next();G=N.id;M=0;B.io(N.uri,N.cfg,N.id);}function D(N){A.promote(N);}function C(N){M=1;if(G===N&&A.size()>0){F();}}function L(N){A.remove(N);}function E(){M=1;if(A.size()>0){F();}}function H(){M=0;}function K(){return A.size();}I=B.on("io:complete",function(N){C(N);},B.io);J.size=K;J.start=E;J.stop=H;J.promote=D;J.remove=L;B.mix(B.io,{queue:J},true);},"3.1.1",{requires:["io-base","queue-promote"]});YUI.add("io",function(A){},"3.1.1",{use:["io-base","io-form","io-xdr","io-upload-iframe","io-queue"]});