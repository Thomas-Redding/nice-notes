
console.log("script.js loaded");

var header_html = "<div style='text-align: center;'>Nice-Notes</div>"
var footer_html = "<div style='text-align: center;'>Nice-Notes</div>"

var foo;
onload = function() {
	var main = document.getElementsByTagName("main")[0];
	var header = document.createElement("header");
	header.innerHTML = header_html;
	var footer = document.createElement("header");
	footer.innerHTML = footer_html;
	document.body.insertBefore(header, document.body.firstChild)
	main.parentNode.insertBefore(footer, main.nextSibling);
}
