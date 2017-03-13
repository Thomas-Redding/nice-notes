
console.log("script.js loaded");
var foo;

function construct_header() {
    var header_html = "";
    var url = window.location.href;
    path = url.substr(url.indexOf("nice-notes") + 11).replace("-", " ").split("/");
    var file;
    if (path.length == 1) {
        // index.html
        file = path[0];
        console.log("index.html");
        header_html += "<a href=\"index.html\">Nice Notes</a>";
    }
    else {
        var folder = path[0];
        file = path[1];
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

    var header = document.createElement("header");
    header.innerHTML = header_html;
    document.body.insertBefore(header, document.body.firstChild);
}

function scroll_to_top() {
    document.getElementsByTagName("main")[0].scrollIntoView();
}

function construct_footer() {
    var footer_html = "<hr><a href='https://github.com/Thomas-Redding/nice-notes'>Contribute</a>";
    var main = document.getElementsByTagName("main")[0];
    var footer = document.createElement("footer");
    footer.innerHTML = footer_html;
    main.parentNode.insertBefore(footer, main.nextSibling);
}

function construct_table_of_contents() {
    var main = document.getElementsByTagName("main")[0];

    var nav = document.createElement("nav");
    var h2s = document.getElementsByTagName("h2");
    var h3s = document.getElementsByTagName("h3");
    var headers = [];
    for (var i = 0; i < h2s.length; ++i) headers.push({
        element: h2s[i],
        y: get_y_pos(h2s[i]),
        level: 2
    });
    for (var i = 0; i < h3s.length; ++i) headers.push({
        element: h3s[i],
        y: get_y_pos(h3s[i]),
        level: 3
    });

    headers.sort(function (a, b) {
        return a.y > b.y ? 1 : -1;
    });

    var level = 2;
    var str = "<ol>";
    for (var i = 0; i < headers.length; ++i) {
        if (headers[i].level > level) str += "<ol>";
        else if (headers[i].level < level) str += "</ol>";
        level = headers[i].level;
        str += "<li><a href='#' onclick='go_to_header(" + i + "); return false;'>" + headers[i].element.innerHTML + "</a></li>";
    }
    str += "</ol>";
    nav.innerHTML = str;

    var title = document.getElementsByTagName("h1")[0];

    main.insertBefore(nav, title.nextElementSibling);
}

onload = function() {
	construct_header();
    construct_footer();

    var url = window.location.href;
    var path = url.substr(url.indexOf("nice-notes") + 11).replace("-", " ").split("/");
    if (path[path.length-1] != "index.html") construct_table_of_contents();
}

function get_y_pos(el) {
    // http://stackoverflow.com/questions/288699/get-the-position-of-a-div-span-tag

    var y;
    for (y = 0; el != null; el = el.offsetParent)
        y += el.offsetTop;
    return y;
}

function go_to_header(num) {
    var h2s = document.getElementsByTagName("h2");
    var h3s = document.getElementsByTagName("h3");
    var headers = [];
    for (var i = 0; i < h2s.length; ++i) headers.push({
        element: h2s[i],
        y: get_y_pos(h2s[i]),
        level: 2
    });
    for (var i = 0; i < h3s.length; ++i) headers.push({
        element: h3s[i],
        y: get_y_pos(h3s[i]),
        level: 3
    });
    headers.sort(function (a, b) {
        return a.y > b.y
    });

	headers[num].element.scrollIntoView();
	window.scrollBy(0, -50);
}
