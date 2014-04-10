/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.1
build: nightly
*/
(function(){var stateChangeListener,GLOBAL_ENV=YUI.Env,config=YUI.config,doc=config.doc,docElement=doc.documentElement,doScrollCap=docElement.doScroll,add=YUI.Env.add,remove=YUI.Env.remove,targetEvent=(doScrollCap)?"onreadystatechange":"DOMContentLoaded",pollInterval=config.pollInterval||40,_ready=function(e){GLOBAL_ENV._ready();};if(!GLOBAL_ENV._ready){GLOBAL_ENV._ready=function(){if(!GLOBAL_ENV.DOMReady){GLOBAL_ENV.DOMReady=true;remove(doc,targetEvent,_ready);}};
/* DOMReady: based on work by: Dean Edwards/John Resig/Matthias Miller/Diego Perini */
if(doScrollCap){if(self!==self.top){stateChangeListener=function(){if(doc.readyState=="complete"){remove(doc,targetEvent,stateChangeListener);_ready();}};add(doc,targetEvent,stateChangeListener);}else{GLOBAL_ENV._dri=setInterval(function(){try{docElement.doScroll("left");clearInterval(GLOBAL_ENV._dri);GLOBAL_ENV._dri=null;_ready();}catch(domNotReady){}},pollInterval);}}else{add(doc,targetEvent,_ready);}}})();YUI.add("event-base",function(A){(function(){var C=YUI.Env,B=function(){A.fire("domready");};A.publish("domready",{fireOnce:true,async:true});if(C.DOMReady){B();}else{A.before(B,C,"_ready");}})();(function(){var C=A.UA,B={63232:38,63233:40,63234:37,63235:39,63276:33,63277:34,25:9,63272:46,63273:36,63275:35},D=function(F){try{if(F&&3==F.nodeType){F=F.parentNode;}}catch(E){return null;}return A.one(F);};A.DOMEventFacade=function(L,F,E){E=E||{};var H=L,G=F,I=A.config.doc,M=I.body,N=H.pageX,K=H.pageY,J,P,O=E.overrides||{};this.altKey=H.altKey;this.ctrlKey=H.ctrlKey;this.metaKey=H.metaKey;this.shiftKey=H.shiftKey;this.type=O.type||H.type;this.clientX=H.clientX;this.clientY=H.clientY;if(!N&&0!==N){N=H.clientX||0;K=H.clientY||0;if(C.ie){N+=Math.max(I.documentElement.scrollLeft,M.scrollLeft);K+=Math.max(I.documentElement.scrollTop,M.scrollTop);}}this._yuifacade=true;this._event=H;this.pageX=N;this.pageY=K;J=H.keyCode||H.charCode||0;if(C.webkit&&(J in B)){J=B[J];}this.keyCode=J;this.charCode=J;this.button=H.which||H.button;this.which=this.button;this.target=D(H.target||H.srcElement);this.currentTarget=D(G);P=H.relatedTarget;if(!P){if(H.type=="mouseout"){P=H.toElement;}else{if(H.type=="mouseover"){P=H.fromElement;}}}this.relatedTarget=D(P);if(H.type=="mousewheel"||H.type=="DOMMouseScroll"){this.wheelDelta=(H.detail)?(H.detail*-1):Math.round(H.wheelDelta/80)||((H.wheelDelta<0)?-1:1);}this.stopPropagation=function(){if(H.stopPropagation){H.stopPropagation();}else{H.cancelBubble=true;}E.stopped=1;};this.stopImmediatePropagation=function(){if(H.stopImmediatePropagation){H.stopImmediatePropagation();}else{this.stopPropagation();}E.stopped=2;};this.preventDefault=function(Q){if(H.preventDefault){H.preventDefault();}H.returnValue=Q||false;E.prevented=1;};this.halt=function(Q){if(Q){this.stopImmediatePropagation();}else{this.stopPropagation();}this.preventDefault();};};})();(function(){A.Env.evt.dom_wrappers={};A.Env.evt.dom_map={};var H=A.Env.evt,J=YUI.Env.add,D=YUI.Env.remove,G=function(){YUI.Env.windowLoaded=true;A.Event._load();D(window,"load",G);},B=function(){A.Event._unload();D(window,"unload",B);},C="domready",E="~yui|2|compat~",F=function(L){try{return(L&&typeof L!=="string"&&A.Lang.isNumber(L.length)&&!L.tagName&&!L.alert);}catch(K){return false;}},I=function(){var M=false,N=0,L=[],O=H.dom_wrappers,K=null,P=H.dom_map;return{POLL_RETRYS:1000,POLL_INTERVAL:40,lastError:null,_interval:null,_dri:null,DOMReady:false,startInterval:function(){if(!I._interval){I._interval=setInterval(A.bind(I._poll,I),I.POLL_INTERVAL);}},onAvailable:function(Q,U,Y,R,V,X){var W=A.Array(Q),S,T;for(S=0;S<W.length;S=S+1){L.push({id:W[S],fn:U,obj:Y,override:R,checkReady:V,compat:X});}N=this.POLL_RETRYS;setTimeout(A.bind(I._poll,I),0);T=new A.EventHandle({_delete:function(){if(T.handle){T.handle.detach();return;}var a,Z;for(a=0;a<W.length;a++){for(Z=0;Z<L.length;Z++){if(W[a]===L[Z].id){L.splice(Z,1);}}}}});return T;},onContentReady:function(U,R,T,S,Q){return this.onAvailable(U,R,T,S,true,Q);},attach:function(T,S,R,Q){return I._attach(A.Array(arguments,0,true));},_createWrapper:function(W,V,Q,R,U){var T,X=A.stamp(W),S="event:"+X+V;if(false===U){S+="native";}if(Q){S+="capture";}T=O[S];if(!T){T=A.publish(S,{silent:true,bubbles:false,contextFn:function(){if(R){return T.el;}else{T.nodeRef=T.nodeRef||A.one(T.el);return T.nodeRef;}}});T.overrides={};T.el=W;T.key=S;T.domkey=X;T.type=V;T.fn=function(Y){T.fire(I.getEvent(Y,W,(R||(false===U))));};T.capture=Q;if(W==A.config.win&&V=="load"){T.fireOnce=true;K=S;}O[S]=T;P[X]=P[X]||{};P[X][S]=T;J(W,V,T.fn,Q);}return T;},_attach:function(W,S){var b,d,U,a,Q,T=false,V,X=W[0],Y=W[1],R=W[2]||A.config.win,e=S&&S.facade,c=S&&S.capture,Z=S&&S.overrides;if(W[W.length-1]===E){b=true;}if(!Y||!Y.call){return false;}if(F(R)){d=[];A.each(R,function(g,f){W[2]=g;d.push(I._attach(W,S));});return new A.EventHandle(d);}else{if(A.Lang.isString(R)){if(b){U=A.DOM.byId(R);}else{U=A.Selector.query(R);switch(U.length){case 0:U=null;break;case 1:U=U[0];break;default:W[2]=U;return I._attach(W,S);}}if(U){R=U;}else{V=this.onAvailable(R,function(){V.handle=I._attach(W,S);},I,true,false,b);return V;}}}if(!R){return false;}if(A.Node&&R instanceof A.Node){R=A.Node.getDOMNode(R);}a=this._createWrapper(R,X,c,b,e);if(Z){A.mix(a.overrides,Z);}if(R==A.config.win&&X=="load"){if(YUI.Env.windowLoaded){T=true;}}if(b){W.pop();}Q=W[3];V=a._on(Y,Q,(W.length>4)?W.slice(4):null);if(T){a.fire();}return V;},detach:function(X,Y,S,V){var W=A.Array(arguments,0,true),a,T,Z,U,Q,R;if(W[W.length-1]===E){a=true;}if(X&&X.detach){return X.detach();}if(typeof S=="string"){if(a){S=A.DOM.byId(S);}else{S=A.Selector.query(S);T=S.length;if(T<1){S=null;}else{if(T==1){S=S[0];}}}}if(!S){return false;}if(S.detach){W.splice(2,1);return S.detach.apply(S,W);}else{if(F(S)){Z=true;for(U=0,T=S.length;U<T;++U){W[2]=S[U];Z=(A.Event.detach.apply(A.Event,W)&&Z);}return Z;}}if(!X||!Y||!Y.call){return this.purgeElement(S,false,X);}Q="event:"+A.stamp(S)+X;R=O[Q];if(R){return R.detach(Y);}else{return false;}},getEvent:function(T,R,Q){var S=T||window.event;
return(Q)?S:new A.DOMEventFacade(S,R,O["event:"+A.stamp(R)+T.type]);},generateId:function(Q){var R=Q.id;if(!R){R=A.stamp(Q);Q.id=R;}return R;},_isValidCollection:F,_load:function(Q){if(!M){M=true;if(A.fire){A.fire(C);}I._poll();}},_poll:function(){if(this.locked){return;}if(A.UA.ie&&!YUI.Env.DOMReady){this.startInterval();return;}this.locked=true;var R,Q,V,S,U,W,T=!M;if(!T){T=(N>0);}U=[];W=function(Z,a){var Y,X=a.override;if(a.compat){if(a.override){if(X===true){Y=a.obj;}else{Y=X;}}else{Y=Z;}a.fn.call(Y,a.obj);}else{Y=a.obj||A.one(Z);a.fn.apply(Y,(A.Lang.isArray(X))?X:[]);}};for(R=0,Q=L.length;R<Q;++R){V=L[R];if(V&&!V.checkReady){S=(V.compat)?A.DOM.byId(V.id):A.Selector.query(V.id,null,true);if(S){W(S,V);L[R]=null;}else{U.push(V);}}}for(R=0,Q=L.length;R<Q;++R){V=L[R];if(V&&V.checkReady){S=(V.compat)?A.DOM.byId(V.id):A.Selector.query(V.id,null,true);if(S){if(M||(S.get&&S.get("nextSibling"))||S.nextSibling){W(S,V);L[R]=null;}}else{U.push(V);}}}N=(U.length===0)?0:N-1;if(T){this.startInterval();}else{clearInterval(this._interval);this._interval=null;}this.locked=false;return;},purgeElement:function(T,Q,X){var V=(A.Lang.isString(T))?A.Selector.query(T,null,true):T,Z=this.getListeners(V,X),U,W,Y,S,R;if(Q&&V){Z=Z||[];S=A.Selector.query("*",V);U=0;W=S.length;for(;U<W;++U){R=this.getListeners(S[U],X);if(R){Z=Z.concat(R);}}}if(Z){U=0;W=Z.length;for(;U<W;++U){Y=Z[U];Y.detachAll();D(Y.el,Y.type,Y.fn,Y.capture);delete O[Y.key];delete P[Y.domkey][Y.key];}}},getListeners:function(U,T){var V=A.stamp(U,true),Q=P[V],S=[],R=(T)?"event:"+V+T:null;if(!Q){return null;}if(R){if(Q[R]){S.push(Q[R]);}R+="native";if(Q[R]){S.push(Q[R]);}}else{A.each(Q,function(X,W){S.push(X);});}return(S.length)?S:null;},_unload:function(Q){A.each(O,function(S,R){S.detachAll();D(S.el,S.type,S.fn,S.capture);delete O[R];delete P[S.domkey][R];});},nativeAdd:J,nativeRemove:D};}();A.Event=I;if(A.config.injected||YUI.Env.windowLoaded){G();}else{J(window,"load",G);}if(A.UA.ie){A.on(C,I._poll,I,true);}A.on("unload",B);I.Custom=A.CustomEvent;I.Subscriber=A.Subscriber;I.Target=A.EventTarget;I.Handle=A.EventHandle;I.Facade=A.EventFacade;I._poll();})();A.Env.evt.plugins.available={on:function(D,C,F,E){var B=arguments.length>4?A.Array(arguments,4,true):[];return A.Event.onAvailable.call(A.Event,F,C,E,B);}};A.Env.evt.plugins.contentready={on:function(D,C,F,E){var B=arguments.length>4?A.Array(arguments,4,true):[];return A.Event.onContentReady.call(A.Event,F,C,E,B);}};},"3.1.1",{requires:["event-custom-base"]});