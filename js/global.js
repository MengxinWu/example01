function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload !== "function"){
		window.onload = func;
	} else {
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastNode == targetElement){
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function addClass(element,value) {
	if(!element.className){
		element.className = value;
	} else {
		var newClassName = element.className + " " + value;
		element.className = newClassName;
	}
}

function highlightPage() {
	if(!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName("header");
	if(headers.length === 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length === 0) return false;
	var links = navs[0].getElementsByTagName("a");
	if(links.length === 0) return false;
	for(var i=0; i<links.length; i++){
		if(window.location.href.indexOf(links[i].getAttribute("href")) !== -1){
			addClass(links[i],"here");
			document.body.setAttribute("id",links[i].lastChild.nodeValue.toLowerCase());
		}
	}
}
addLoadEvent(highlightPage);

function moveElement(elementId,finalX,finalY,interval) {
	if(!document.getElementById) return false;
	if(!document.getElementById(elementId)) return false;
	var elem = document.getElementById(elementId);
	if(elem.movement) clearTimeout(elem.movement);
	if(!elem.style.left) elem.style.left = "0px";
	if(!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if(xpos === finalX && ypos === finalY){
		return true;
	}
	if(xpos < finalX){
		xpos += Math.ceil((finalX - xpos)/10); 
	}
	if(xpos > finalX){
		xpos -= Math.ceil((xpos - finalX)/10);
	}
	if(ypos < finalY){
		ypos += Math.ceil((finalY - ypos)/10);
	}
	if(ypos > finalY){
		ypos -= Math.ceil((ypos - finalY)/10);
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('" + elementId + "'," + finalX + "," + finalY + "," + interval + ")";
	elem.movement = setTimeout(repeat,interval);
}

function prepareSlideShow() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro =  document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame = document.createElement("img");
	frame.setAttribute("src","imgs/frame.gif");
	frame.setAttribute("alt"," ");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview = document.createElement("img");
	preview.setAttribute("src","imgs/slideshow.gif");
	preview.setAttribute("alt","slideshow");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links = document.getElementsByTagName("a");
	var destination;
	for(var i=0; i<links.length; i++){
		links[i].onmouseover = function () {
			destination = this.getAttribute("href");
			if(destination.indexOf("index") != -1) moveElement("preview",0,0,5);
			if(destination.indexOf("about") != -1) moveElement("preview",-150,0,5);
			if(destination.indexOf("photos") != -1) moveElement("preview",-300,0,5);	
			if(destination.indexOf("live") != -1) moveElement("preview",-450,0,5);	
			if(destination.indexOf("contact") != -1) moveElement("preview",-600,0,5);	
		};
	}
}
addLoadEvent(prepareSlideShow);

function showSection(id){
	var sections = document.getElementsByTagName("section");
	for(var i=0; i<sections.length; i++){
		if(sections[i].getAttribute("id") === id){
			sections[i].style.display = "block";
		} else{
			sections[i].style.display = "none";
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length === 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length === 0) return false;
	var links = navs[0].getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(document.getElementById(sectionId)){
			document.getElementById(sectionId).style.display = "none";
			links[i].destination = sectionId;
			links[i].onclick = function(){
				showSection(this.destination);
				return false;
			};
		} 
	} 
}
addLoadEvent(prepareInternalnav);

function preparePlaceholder(){
	if(!document.getElementById) return false;
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","imgs/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id","description");
	var desctext = document.createTextNode("choose an image.");
	description.appendChild(desctext);
	var imagegallery = document.getElementById("imagegallery");
	insertAfter(description,imagegallery);
	insertAfter(placeholder,description);
}
addLoadEvent(preparePlaceholder);

function showPic(whichpic){
	if(!document.getElementById) return false;
	if(!document.getElementById("placeholder")) return false;
	var placeholder = document.getElementById("placeholder");
	var source = whichpic.getAttribute("href");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("description")) return false;
	var text;
	if(whichpic.getAttribute("title")){
		text = whichpic.getAttribute("title");
	} else{
		text = "";
	}
	var description = document.getElementById("description");
	if(description.firstChild.nodeType === 3){
		description.firstChild.nodeValue = text;
	}
	return false;
}

function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i=0; i<links.length; i++){
		links[i].onclick = function(){
			return showPic(this);
		}
	}
}
addLoadEvent(prepareGallery);

function stripleTables(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	if(tables.length === 0) return false;
	var rows = tables[0].getElementsByTagName("tr");
	var odd = false;
	for(var i=0; i<rows.length; i++){
		if(odd === true){
			addClass(rows[i], "odd");
			odd = false;
		} else{
			odd = true;
		}
	}
}
addLoadEvent(stripleTables);

function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var tables = document.getElementsByTagName("table");
	if(tables.length === 0) return false;
	var rows = tables[0].getElementsByTagName("tr");
	for(var i=0; i<rows.length; i++){
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this, "highlight");
		};
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
		}
	}
}
addLoadEvent(highlightRows);

function displayAbbreviations(){
	if(!document.getElementsByTagName) return false;
	if(!document.createTextNode) return false;
	if(!document.createElement) return false;
	var abbrs = document.getElementsByTagName("abbr");
	if(abbrs.length === 0) return false;
	var dlist = document.createElement("dl");
	for(var i=0; i<abbrs.length; i++){
		var dtitle = document.createElement("dt");
		var dtitle_text = document.createTextNode(abbrs[i].lastChild.nodeValue);
		dtitle.appendChild(dtitle_text);
		var ddesc = document.createElement("dd");
		var ddesc_text = document.createTextNode(abbrs[i].getAttribute("title"));
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	var header = document.createElement("h3");
	var header_text = document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles = document.getElementsByTagName("article");
	articles[0].appendChild(header);
	articles[0].appendChild(dlist);
}
addLoadEvent(displayAbbreviations);

function focusLabels(){
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	if(labels.length === 0) return false;
	for(var i=0; i<labels.length; i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function(){
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLabels);

function resetFields(whichform){
	var elements = whichform.elements;
	if(elements.length === 0) return false;
	for(var i=0; i<elements.length; i++){
		var element = elements[i];
		if(element.type === "submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function(){
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value === text){
				this.className = "";
				this.value = "";
			}
		};
		element.onblur = function(){
			if(this.value === ""){
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		};
		element.onblur();
	}
}

function submitFormWithAjax(whichform, element){
	var requset = new XMLHttpRequest();
	if(!requset) return false;
	displayAjaxLoading(element);
	var dataParts = [];
	for(var i=0; i<whichform.elements.length; i++){
		dataParts[i] = whichform.elements[i].name + "=" + encodeURIComponent(whichform.elements[i].value);		
	}
	var data = dataParts.join("&");
	requset.open("post", whichform.getAttribute("action"), true);
	requset.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	requset.onreadystatechange = function(){
		if(requset.readyState === 4){
			if(requset.status === 200 || requset.status === 0){
				var matches = requset.responseText.match(/<article>([\s\S]+)<\/article>/);
				if(matches.length>0){
					element.innerHTML = matches[1];
				} else{
					element.innerHTML = "<p>Oops, there was an error. Sorry.";
				}
			} else{
				element.innerHTML = "<p>" + requset.statusText + "</p>";
			}
		}
	};
	requset.send(data);
	return true;
}

function prepareForms(){
	if(!document.forms) return false;
	var forms = document.forms;
	if(forms.length === 0) return false;
	for(var i=0; i<forms.length; i++){
		resetFields(forms[i]);
		forms[i].onsubmit = function(){
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this, article)) return false;
			return true;
		};
	}

}
addLoadEvent(prepareForms);

function displayAjaxLoading(element){
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src","imgs/loading.gif");
	content.setAttribute("alt","Loading...");
	element.appendChild(content);
}