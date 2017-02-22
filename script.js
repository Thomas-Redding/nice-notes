
console.log("script.js loaded");

var header_html = "";
var footer_html = "<hr><a href='https://github.com/Thomas-Redding/Nice Notes'>Contribute</a>";

var foo;
onload = function() {
	var url = window.location.href;
	path = url.substr(url.indexOf("nice-notes") + 11).replace("-", " ").split("/");
	if (path.length == 1) {
		// index.html
		console.log("index.html");
		header_html += "<a href=\"index.html\">Nice Notes</a>";
	}
	else {
		var folder = path[0];
		var file = path[1];
		header_html += "<a href=\"../index.html\">Nice Notes</a>";
		if (path[1] == "index.html") {
			// linear-algebra/index.html
			header_html += " / <a href='index.html'>" + folder + "</a>";
		}
		else {
			// linear-algebra/eigenvectors.html
			var title = document.getElementsByTagName("h1")[0].innerHTML;
			header_html += " / <a href='index.html'>" + folder + "</a>";
			header_html += " / <a href='" + file + "'>" + title + "</a>";
		}
	}

	var main = document.getElementsByTagName("main")[0];
	var header = document.createElement("header");
	header.innerHTML = header_html;
	var footer = document.createElement("footer");
	footer.innerHTML = footer_html;
	document.body.insertBefore(header, document.body.firstChild)
	main.parentNode.insertBefore(footer, main.nextSibling);
}
