
/*
 * draw a string centered at (x,y) and rotated by angle
 */
function draw_label(c, str, x, y, angle) {
    var fontSize = parseInt(c.font);
    if(angle == undefined || angle == 0) {
        c.fillText(str, x-c.measureText(str).width/2, y+fontSize/3.65);
    }
    else {
        this.c.translate(x, y);
        this.c.rotate(angle);
        this.c.fillText(str, -0.5*c.measureText(str).width, fontSize/3.65);
        this.c.rotate(-1*angle);
        this.c.translate(-1*x, -1*y);
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
function draw_arrow(c, x1, y1, x2, y2, head_size) {
    var deltaX = x2-x1;
    var deltaY = y2-y1;
    var oldLen = Math.sqrt(deltaX*deltaX+deltaY*deltaY);
    var angle = 0.523598776;
    if (head_size == undefined)
        head_size = 3*Math.sqrt(c.lineWidth);
    deltaX *= head_size/oldLen*3;
    deltaY *= head_size/oldLen*3;

    // draw line
    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2 - Math.cos(angle)*deltaX,y2 - Math.cos(angle)*deltaY);
    c.stroke();

    // draw head
    deltaX *= 1.01;
    deltaY *= 1.01;
    c.beginPath();
    c.moveTo(x2,y2);
    c.lineTo(x2-Math.sin(angle)*deltaY-Math.cos(angle)*deltaX,y2+Math.sin(angle)*deltaX-Math.cos(angle)*deltaY);
    c.lineTo(x2+Math.sin(angle)*deltaY-Math.cos(angle)*deltaX,y2-Math.sin(angle)*deltaX-Math.cos(angle)*deltaY);
    c.fill();
}