function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != "function"){
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
	for(var i=0; i<links.length; i++){
		if(window.location.href.indexOf(links[i].getAttribute("href")) != -1){
			// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
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
	// parseInt() 函数可解析一个字符串，并返回一个整数。
	var ypos = parseInt(elem.style.top);
	if(xpos === finalX && ypos === finalY){
		return true;
	}
	if(xpos < finalX){
		xpos += Math.ceil((finalX - xpos)/10); 
		// ceil() 方法可对一个数进行上舍入。
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
		// destination = links[i].getAttribute("href");
		// 上面这条语句会产生闭包，应该改为下面的语句
		links[i].onmouseover = function () {
			destination = this.getAttribute("href");
			// 上面这条语句不会产生闭包
			if(destination.indexOf("index") != -1) moveElement("preview",0,0,5);
			if(destination.indexOf("about") != -1) moveElement("preview",-150,0,5);
			if(destination.indexOf("photos") != -1) moveElement("preview",-300,0,5);	
			if(destination.indexOf("live") != -1) moveElement("preview",-450,0,5);	
			if(destination.indexOf("contact") != -1) moveElement("preview",-600,0,5);	
		};
	}
}
addLoadEvent(prepareSlideShow);