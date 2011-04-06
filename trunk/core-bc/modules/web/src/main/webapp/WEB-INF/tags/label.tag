<%@ tag language="java" pageEncoding="ISO-8859-1"%>
<%@ attribute name="key" required="true" rtexprvalue="true" type="java.lang.String"%>
<%@ attribute name="label" required="false" rtexprvalue="true" type="java.lang.String"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/tld/vgr-util.tld" prefix="su"%>

<span class="kod-label ${key}-label" title="${prio.child != null ? su:mkChangedToolTip(prio.child[key], prio[key]) : ''}">
  ${label == null ? prio.columns[key].label : label} 
  <img src="img/flag_white.gif" id="${key}ChangeFlag" style="display:${(prio.child != null and prio[key] != prio.child[key])? 'inline':'none'}"/>
</span> 
