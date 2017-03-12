
/*
 * draw a line from (x1, y1) to (x2, y2)
 */
function draw_line(c, x1, y1, x2, y2) {
    c.beginPath();
    c.moveTo(x1, x2);
    c.lineTo(x2, y2);
    c.stroke();
}

/*
 * draw a string centered at (x,y) and rotated by angle
 */
function draw_label(c, str, point, angle, fill_color) {
	if (angle > Math.PI/2)
		angle -= Math.PI;
	if (fill_color === undefined) fill_color = false;
    var fontSize = parseInt(c.font);
    var x = point[0];
    var y = point[1];
    if(angle == undefined || angle == 0) {
    	if (fill_color) {
    		var old = c.fillStyle;
    		c.fillStyle = fill_color;
    		c.fillRect(x-c.measureText(str).width/2, y+fontSize/-1.34, c.measureText(str).width, fontSize*1.3);
    		c.fillStyle = old;
    	}
        c.fillText(str, x-c.measureText(str).width/2, y+fontSize/3.65);
    }
    else {
        this.c.translate(x, y);
        this.c.rotate(angle);
        if (fill_color) {
    		var old = c.fillStyle;
    		c.fillStyle = fill_color;
    		c.fillRect(-0.6*c.measureText(str).width, fontSize/-1.34, 1.2*c.measureText(str).width, fontSize*1.3);
    		c.fillStyle = old;
    	}
        this.c.fillText(str, -0.5*c.measureText(str).width, fontSize/3.65);
        this.c.rotate(-1*angle);
        this.c.translate(-1*x, -1*y);
    }
}

/*
 * Draw the points (pts) as circles with radius (size).
 * Scale and offset allow you to make the graph larger and move the points around.
 * Style is a pair of booleans indicating whether you want circles or disks
 */
function draw_points(c, pts, size, offset, scale, style) {
    if (size === undefined) size = 5;
    if (offset === undefined) offset = [0, 0];
    if (scale === undefined) scale = [1, 1];
    if (style === undefined) style = [true, false]; // fill? stroke?
    if (style[0]) {
        c.beginPath();
        for (var i = 0; i < pts.length; ++i) {
            c.moveTo(offset[0]+pts[i][0]*scale[0]+size, offset[1]-pts[i][1]*scale[1]);
            c.arc(offset[0]+pts[i][0]*scale[0], offset[1]-pts[i][1]*scale[1], size, 0, 2*Math.PI);
        }
        c.fill();
    }
    if (style[1]) {
        c.beginPath();
        for (var i = 0; i < pts.length; ++i) {
            c.moveTo(offset[0]+pts[i][0]*scale[0]+size, offset[1]-pts[i][1]*scale[1]);
            c.arc(offset[0]+pts[i][0]*scale[0], offset[1]-pts[i][1]*scale[1], size, 0, 2*Math.PI);
        }
        c.stroke();
    }
}

/*
 * draw a block of text with upper-left corner at (x,y)
 * with the given width and line height
 */
function draw_text(c, txt, x, y, w, lineHeight) {
    w -= 2;
    var fontSize = parseInt(c.font);
    if(lineHeight === undefined) {
        lineHeight = fontSize * 1.1;
    }
    var arr = txt.split(/ /g);
    var arrB = [""];
    for(var i=0; i<arr.length; i++) {
        if(c.measureText(arrB[arrB.length-1] + arr[i]).width >= w) {
            arrB.push(arr[i]);
        }
        else {
            if (arrB[arrB.length-1] == "")
                arrB[arrB.length-1] = arr[i];
            else
                arrB[arrB.length-1] += " " + arr[i];
        }
    }
    for(var i=0; i<arrB.length; i++) {
        c.fillText(arrB[i], x, y+lineHeight*i+fontSize);
    }
}

/*
 * draws an arrow from (x1, y2) to (x2, y2)
 */
function draw_arrow(c, start, end, head_size) {
    var deltaX = end[0] - start[0];
    var deltaY = end[1] - start[1];
    var oldLen = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    var angle = 0.523598776;
    if (head_size == undefined) head_size = 3*Math.sqrt(c.lineWidth);
    deltaX *= head_size/oldLen*3;
    deltaY *= head_size/oldLen*3;

    // draw line
    c.beginPath();
    c.moveTo(start[0], start[1]);
    c.lineTo(end[0] - Math.cos(angle)*deltaX,end[1] - Math.cos(angle)*deltaY);
    c.stroke();

    // draw head
    deltaX *= 1.01;
    deltaY *= 1.01;
    c.beginPath();
    c.moveTo(end[0], end[1]);
    c.lineTo(end[0]-Math.sin(angle)*deltaY-Math.cos(angle)*deltaX,end[1]+Math.sin(angle)*deltaX-Math.cos(angle)*deltaY);
    c.lineTo(end[0]+Math.sin(angle)*deltaY-Math.cos(angle)*deltaX,end[1]-Math.sin(angle)*deltaX-Math.cos(angle)*deltaY);
    c.fill();
}

function draw_graph(c, nodes, edges, r) {
	c.beginPath();
	for (var i = 0; i < nodes.length; ++i) {
		c.moveTo(nodes[i].x+r, nodes[i].y);
		c.arc(nodes[i].x, nodes[i].y, r, 0, 2*Math.PI);
		draw_label(c, nodes[i].label, [nodes[i].x, nodes[i].y]);
	}
	c.stroke();
	
	for (var i = 0; i < edges.length; ++i) {
		var A = nodes[edges[i].from];
		var B = nodes[edges[i].to];
		var angle = Math.atan2(B.y-A.y, B.x-A.x);
		if (edges[i].dir == "both") {
			if (A == B) {
				var dist = 1.5;
				var x = A.x + dist*r*Math.cos(edges[i].angle);
				var y = A.y + dist*r*Math.sin(edges[i].angle);
				var circ_x = dist/2;
				var circ_y = Math.sqrt(1 - circ_x * circ_x);
				var foo = Math.atan(circ_y/circ_x);
				var start_angle = Math.PI+foo+edges[i].angle;
				var end_angle = Math.PI-foo+edges[i].angle;
				c.beginPath();
				c.moveTo(x + r*Math.cos(start_angle), y + r*Math.sin(start_angle));
				c.arc(x, y, r, start_angle, end_angle);
				c.stroke();
				if (edges[i].label && edges[i].label != "")
					draw_label(c, edges[i].label, [A.x + (dist+1)*r*Math.cos(edges[i].angle), A.y + (dist+1)*r*Math.sin(edges[i].angle)], angle, "white");
			}
			else {
				var mid_x = (A.x+B.x)/2;
				var mid_y = (A.y+B.y)/2;
				draw_arrow(c, [mid_x, mid_y], [A.x + r*Math.cos(angle), A.y + r*Math.sin(angle)]);
				draw_arrow(c, [mid_x, mid_y], [B.x - r*Math.cos(angle), B.y - r*Math.sin(angle)]);
				if (edges[i].label && edges[i].label != "")
					draw_label(c, edges[i].label, [mid_x, mid_y], angle, "white");
				draw_arrow(c, [A.x - (r+1)*Math.cos(end_angle), A.y - (r+1)*Math.sin(end_angle)], [A.x - r*Math.cos(end_angle), A.y - r*Math.sin(end_angle)]);
				draw_arrow(c, [A.x - (r+1)*Math.cos(start_angle), A.y - (r+1)*Math.sin(start_angle)], [A.x - r*Math.cos(start_angle), A.y - r*Math.sin(start_angle)]);
			}
		}
		else if (edges[i].dir == "yes") {
			if (A == B) {
				var dist = 1.5;
				var x = A.x + dist*r*Math.cos(edges[i].angle);
				var y = A.y + dist*r*Math.sin(edges[i].angle);
				var circ_x = dist/2;
				var circ_y = Math.sqrt(1 - circ_x * circ_x);
				var foo = Math.atan(circ_y/circ_x);
				var start_angle = Math.PI+foo+edges[i].angle;
				var end_angle = Math.PI-foo+edges[i].angle;
				c.beginPath();
				c.moveTo(x + r*Math.cos(start_angle), y + r*Math.sin(start_angle));
				c.arc(x, y, r, start_angle, end_angle);
				c.stroke();
				if (edges[i].label && edges[i].label != "")
					draw_label(c, edges[i].label, [A.x + (dist+1)*r*Math.cos(edges[i].angle), A.y + (dist+1)*r*Math.sin(edges[i].angle)], angle, "white");
				draw_arrow(c, [A.x - (r+1)*Math.cos(start_angle), A.y - (r+1)*Math.sin(start_angle)], [A.x - r*Math.cos(start_angle), A.y - r*Math.sin(start_angle)]);
			}
			else {
				var mid_x = (A.x+B.x)/2;
				var mid_y = (A.y+B.y)/2;
				draw_arrow(c, [A.x + r*Math.cos(angle), A.y + r*Math.sin(angle)], [B.x - r*Math.cos(angle), B.y - r*Math.sin(angle)]);
				if (edges[i].label && edges[i].label != "")
					draw_label(c, edges[i].label, [mid_x, mid_y], angle, "white");
			}
		}
		else if (edges[i].dir == "no") {
			if (A == B) {
				var dist = 1.5;
				var x = A.x + dist*r*Math.cos(edges[i].angle);
				var y = A.y + dist*r*Math.sin(edges[i].angle);
				var circ_x = dist/2;
				var circ_y = Math.sqrt(1 - circ_x * circ_x);
				var foo = Math.atan(circ_y/circ_x);
				var start_angle = Math.PI+foo+edges[i].angle;
				var end_angle = Math.PI-foo+edges[i].angle;
				c.beginPath();
				c.moveTo(x + r*Math.cos(start_angle), y + r*Math.sin(start_angle));
				c.arc(x, y, r, start_angle, end_angle);
				c.stroke();
				if (edges[i].label && edges[i].label != "")
					draw_label(c, edges[i].label, [A.x + (dist+1)*r*Math.cos(edges[i].angle), A.y + (dist+1)*r*Math.sin(edges[i].angle)], angle, "white");
			}
			else {
				var mid_x = (A.x+B.x)/2;
				var mid_y = (A.y+B.y)/2;
				c.beginPath();
				c.moveTo(A.x + r*Math.cos(angle), A.y + r*Math.sin(angle));
				c.lineTo(B.x - r*Math.cos(angle), B.y - r*Math.sin(angle));
				c.stroke();
				if (edges[i].label && edges[i].label != "")
					draw_label(c, edges[i].label, [mid_x, mid_y], angle, "white");
			}
		}
	}
}
