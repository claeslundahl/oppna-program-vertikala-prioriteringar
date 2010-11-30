<%@ tag language="java" pageEncoding="ISO-8859-1"%>
<%@ attribute name="items" required="true" rtexprvalue="true" type="java.util.List"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>

<c:forEach items="${items}" var="sector">
  <div class="sector-node">
  <input style="display: none" id="Sektor${sector.id}" type="submit" name="id"
    value="${sector.id}" /> <label for="Sektor${sector.id}"> 
    
    <c:choose>
    <c:when test="${sector.selected}">
      <input type="checkbox" checked="checked" />
    </c:when>
    <c:otherwise>
      <input type="checkbox" />
    </c:otherwise>
    </c:choose>
        ${sector.kod}  
    </label>
  
  <c:if test="${sector.selected}">
    <tags:sectors items="${sector.children}"/>
  </c:if>
  
  </div>
</c:forEach>