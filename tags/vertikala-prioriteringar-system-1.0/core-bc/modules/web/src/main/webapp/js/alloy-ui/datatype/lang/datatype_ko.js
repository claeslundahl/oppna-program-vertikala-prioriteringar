/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.1.1
build: nightly
*/
YUI.add("lang/datatype-date-format_ko",function(A){A.Intl.add("datatype-date-format","ko",{"a":["일","월","화","수","목","금","토"],"A":["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],"b":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],"B":["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],"c":"%Y년 %b %d일 %a%p %I시 %M분 %S초 %Z","p":["오전","오후"],"P":["오전","오후"],"x":"%y. %m. %d.","X":"%p %I시 %M분 %S초"});},"3.1.1");YUI.add("lang/datatype-date_ko",function(A){},"3.1.1",{use:["lang/datatype-date-format_ko"]});YUI.add("lang/datatype_ko",function(A){},"3.1.1",{use:["lang/datatype-date_ko"]});