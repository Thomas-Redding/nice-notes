function num2str(num) {

	if (isNaN(num)) return "NaN";

	var digits_left_of_decimal = Math.floor(Math.log(Math.abs(num)) / Math.log(10)) + 1;
	var digits_to_show = 2;

	if (digits_left_of_decimal < -10) {
		return "0";
	}
	if (digits_left_of_decimal > -3 && digits_left_of_decimal < 6) {
		var rtn = Math.round(num * Math.pow(10, digits_to_show - digits_left_of_decimal)) / Math.pow(10, digits_to_show - digits_left_of_decimal) + "";
	}
	else {
		var p = Math.pow(10, digits_to_show - 1);
		var n = num * Math.pow(10, 1 - digits_left_of_decimal);
		var rtn = Math.round(p * n) / p + "";
		if (rtn.length < 4) {
			if (rtn.search(/\./) == -1) rtn += ".";
			while (rtn.length < 5) rtn += "0";
		}
		rtn += "e" + (digits_left_of_decimal - 1);
	}
	return rtn;
}

class Matrix {
	constructor(h, w) {

		if(h instanceof Array) {
			if (h[0] instanceof Array) {
				// user passed a 2D array
				this.height = h.length;
				this.width = h[0].length;
				this.length = this.width * this.height;
				this.data = new Float64Array(this.length);
				for (var y = 0; y < this.height; ++y) {
					for (var x = 0; x < this.width; ++x) {
						this.data[y * this.width + x] = h[y][x];
					}
				}
			}
			else {
				// user passed an array
				// make a column vector
				this.height = h.length;
				this.width = 1;
				this.length = h.length;
				this.data = new Float64Array(this.length);
				for (var i = 0; i < this.length; ++i) this.data[i] = h[i];
			}
		}
		else {
			this.height = h;
			this.width = w;
			this.length = h * w;
			this.data = new Float64Array(this.length);
		}
	}
	times(b) {
		if (b instanceof Matrix) {
			if (this.width != b.height) {
				alert("Error in Matrix.times(Matrix): cannot multiply (" + this.height + ", " + this.width + ") by (" + b.height + ", " + b.width + ")");
				return null;
			}
			var rtn = new Matrix(this.height, b.width);
			for (var y = 0; y < rtn.height; y++) {
			for (var x = 0; x < rtn.width; x++) {
				var v = 0;
				for (var i = 0; i < this.width; i++) {
					v += this.data[y * this.width + i] * b.data[i * b.width + x];
				}
				rtn.data[y * b.width + x] = v;
			}
			}
			return rtn;
		}
		else if (typeof(b) == "number") {
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] * b;
			}
			return rtn;
		}
		else {
			alert("Error in Matrix.times(?)");
		}
	}
	component_times(b) {
		if (b instanceof Matrix) {
			if (this.width != b.width || this.height != b.height) {
				alert("Matrix.component_times(Matrix) dimension error; cannot multiply (" + this.height + ", " + this.width + ") by (" + b.height + ", " + b.width + ")");
				return null;
			}
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] * b.data[i];
			}
			return rtn;
		}
		else if (typeof(b) == "number") {
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] * b;
			}
			return rtn;
		}
		else {
			alert("Error in Matrix.component_times: cannot multiply matrix by " + typeof(b));
		}
	}
	plus(b) {
		if (b instanceof Matrix) {
			if (this.width != b.width || this.height != b.height) {
				alert("Matrix.plus(Matrix) dimension error; cannot multiply (" + this.height + ", " + this.width + ") by (" + b.height + ", " + b.width + ")");
				return null;
			}
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] + b.data[i];
			}
			return rtn;
		}
		else if (typeof(b) == "number") {
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] + b;
			}
			return rtn;
		}
		else {
			alert("Error in Matrix.plus: cannot add matrix by " + typeof(b));
		}
	}
	minus(b) {
		if (b instanceof Matrix) {
			if (this.width != b.width || this.height != b.height) {
				alert("Matrix.plus(Matrix) dimension error; cannot multiply (" + this.height + ", " + this.width + ") by (" + b.height + ", " + b.width + ")");
				return null;
			}
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] - b.data[i];
			}
			return rtn;
		}
		else if (typeof(b) == "number") {
			var rtn = new Matrix(this.height, this.width);
			for (var i = 0; i < this.length; i++) {
				rtn.data[i] = this.data[i] - b;
			}
			return rtn;
		}
		else {
			alert("Error in Matrix.minus: cannot subtract matrix by " + typeof(b));
		}
	}
	tr() {
		var rtn = new Matrix(this.width, this.height);
			for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				rtn.data[x * this.height + y] = this.data[y * this.width + x];
			}
			}
		return rtn;
	}
	set(y, x, val) {
		this.data[y * this.width + x] = val;
	}
	get(y, x) {
		return this.data[y * this.width + x];
	}
	toString() {
		var rtn = "";
		var i = 0;
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width - 1; x++) {
				rtn += num2str(this.data[i++]) + ", ";
			}
			rtn += num2str(this.data[i++]) + "\n";
		}
		return rtn;
	}
	toHTML() {
		var rtn = "<table>";
		var i = 0;
		for (var y = 0; y < this.height; y++) {
			rtn += "<tr>"
			for (var x = 0; x < this.width; x++) {
				rtn += "<td style='padding:4px'>" + num2str(this.data[i++]) + "</td>";
			}
			rtn += "</tr>"
		}
		rtn += "</table>"
		return rtn;
	}
	toTR(firstElement) {
		if (this.height != 1) {
			alert("Error: Matrix.toTR() can only be called on a row matrix");
		}
		var tr = document.createElement("tr");
		if (firstElement != undefined) {
			var td = document.createElement("td");
			td.style.textAlign = "right";
			td.innerHTML = firstElement;
			tr.appendChild(td);
		}
		for (var x = 0; x < this.width; x++) {
			var td = document.createElement("td");
			td.innerHTML = num2str(this.data[x]);
			tr.appendChild(td);
		}
		return tr;
	}
	column_min() {
		var rtn = new Array(this.width);
		for (var x = 0; x < this.width; x++) {
			var v = Infinity;
			for (var y = 0; y < this.height; y++) {
				v = this.data[y * this.width + x] < v ? this.data[y * this.width + x] : v;
			}
			rtn[x] = v;
		}
		return rtn;
	}
	column_max() {
		var rtn = new Array(this.width);
		for (var x = 0; x < this.width; x++) {
			var v = -Infinity;
			for (var y = 0; y < this.height; y++) {
				v = this.data[y * this.width + x] > v ? this.data[y * this.width + x] : v;
			}
			rtn[x] = v;
		}
		return rtn;
	}
	column_sum() {
		var rtn = new Matrix(1, this.width);
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				rtn.data[x] += this.data[y * this.width + x];
			}
		}
		return rtn;
	}
	column_sum_sq() {
		var rtn = new Matrix(1, this.width);
		for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				rtn.data[x] += this.data[y * this.width + x] * this.data[y * this.width + x];
			}
		}
		return rtn;
	}
	column_percentile(p) {
		var rtn = new Matrix(1, this.width);
		var idx = p * (this.height - 1); // [0, c.length - 1]
		for (var x = 0; x < this.width; x++) {
			var c = this.columnAsArray(x);
			c = c.sort(function(a, b){return a-b});
			var d = Math.ceil(idx) - idx;
			var val = c[Math.floor(idx)] * d + c[Math.ceil(idx)] * (1 - d);
			rtn.setCell(0, x, val);
		}
		return rtn;
	}
	sum_of_squares() {
		var r = 0;
		for (var i = 0; i < this.length; i++) {
			r += this.data[i] * this.data[i];
		}
		return r;
	}
	copy() {
		var rtn = new Matrix(this.height, this.width);
		for (var i = 0; i < this.length; i++) {
			rtn.data[i] = this.data[i];
		}
		return rtn;
	}
	apply_map(func) {
		for (var i = 0; i < this.data.length; i++) {
			this.data[i] = func(this.data[i]);
		}
	}
	map(func) {
		var rtn = new Matrix(this.height, this.width);
		for (var i = 0; i < this.data.length; i++) {
			rtn.data[i] = func(this.data[i]);
		}
		return rtn;
	}
	copyAs2DArray() {
		var rtn = new Array(this.height);
		for (var y = 0; y < this.height; y++) {
			rtn[y] = new Array(this.width);
			for (var x = 0; x < this.width; x++) {
				rtn[y][x] = this.data[y * this.width + x];
			}
		}
		return rtn;
	}
	columnAsArray(x) {
		var rtn = new Array(this.height);
		for (var y = 0; y < this.height; y++) {
			rtn[y] = this.data[y * this.width + x];
		}
		return rtn;
	}
	slice(sy, sx, h, w) {
		var rtn = new Matrix(h, w);
		for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			rtn.data[y * rtn.width + x] = this.getCell(sy + y, sx + x);
		}
		}
		return rtn;
	}
	insert(mat, sy, sx) {
		for (var dy = 0; dy < mat.height; dy++) {
			for (var dx = 0; dx < mat.width; dx++) {
				this.setCell(sy + dy, sx + dx, mat.getCell(dy, dx));
			}
		}
	}
	repeat(h, w) {
		var rtn = new Matrix(this.height * h, this.width * w);
		for (var y = 0; y < rtn.height; y++) {
		for (var x = 0; x < rtn.width; x++) {
			rtn.data[y * rtn.width + x] = this.data[(y % this.height) * this.width + (x % this.width)];
		}
		}
		return rtn;
	}
	inverse() {

		if (this.height != this.width) {
			alert("Cannot take inverse of non-square matrix");
		}
		if (this.width == 1) {
			var rtn = new Matrix(1, 1);
			rtn.data[0] = 1 / this.data[0];
			return rtn;
		}
		if (this.width == 2) {
			var rtn = new Matrix(2, 2);
			var det = this.data[0] * this.data[3] - this.data[1] * this.data[2];
			rtn.data[0] = this.data[3] / det;
			rtn.data[1] = -this.data[1] / det;
			rtn.data[2] = -this.data[2] / det;
			rtn.data[3] = this.data[0] / det;
			return rtn;
		}

		function isZero(v) { return Math.abs(v) < 1e-10; }

		var rtn = eye(this.height);
		var copy = this.copy();
		for (var i = 0; i < copy.height; i++) {
			if (isZero(copy.getCell(i, i))) {
				var y = i + 1;
				while (y < copy.height && isZero(copy.getCell(y, i))) {
					y++;
				}
				if (y == copy.height) {
					alert("Error: matrix is not invertible");
					alert(this.toString())
					return null;
				}
				copy.swap_rows(i, y);
				rtn.swap_rows(i, y);
			}
			rtn.scale_row(i, 1 / copy.getCell(i, i));
			copy.scale_row(i, 1 / copy.getCell(i, i));
			for (var y = 0; y < copy.height; y++) {
				if (y == i || isZero(copy.getCell(y, i))) { continue; }
				var s = -copy.getCell(y, i);
				copy.scale_and_add(i, s, y);
				rtn.scale_and_add(i, s, y);
			}
		}
		return rtn;
	}
	swap_rows(y1, y2) {
		for (var x = 0; x < this.width; x++) {
			var v = this.getCell(y1, x);
			this.setCell(y1, x, this.getCell(y2, x));
			this.setCell(y2, x, v);
		}
	}
	scale_row(y, scale) {
		for (var x = 0; x < this.width; x++) {
			this.setCell(y, x, this.getCell(y, x) * scale);
		}
	}
	scale_and_add(y_read, scale, y_write) {
		for (var x = 0; x < this.width; x++) {
			this.setCell(y_write, x, this.getCell(y_write, x) + this.getCell(y_read, x) * scale);
		}
	}
	setColumn(x, mat) {
		if (mat.width != 1) {
			alert("Error: setColumn(x, mat)'s mat must have a width of 1");
			return null;
		}
		if (mat.height != this.height) {
			alert("Error: setColumn(x, mat)'s mat must have a height equal to this.height");
			return null;
		}
		for (var y = 0; y < this.height; y++) {
			this.data[y * this.width + x] = mat.data[y];
		}
	}
	column(x) {
		var rtn = new Matrix(this.height, 1);
		for (var y = 0; y < this.height; y++) {
			rtn.data[y] = this.data[y * this.width + x];
		}
		return rtn;
	}
	fillColumn(x, val) {
		for (var y = 0; y < this.height; y++) {
			this.data[y * this.width + x] = val;
		}
	}
	append_rows(matrix) {
		if (this.width != matrix.width) {
			alert("Error: append_rows(matrix)'s matrix doesn't have the same width as this");
		}
		var data = this.data;
		var height = this.height;
		var length = this.length;
		this.height += matrix.height;
		this.length += matrix.length;
		this.data = new Float64Array(this.length);
		for (var i = 0; i < length; ++i) {
			this.data[i] = data[i];
		}
		for (var i = 0; i < matrix.length; ++i) {
			this.data[i + length] = matrix.data[i];
		}
	}
}
function expand_to_poly(X, degree) {
	if (degree == 0) {
		var rtn = new Matrix(X.height, 1);
		rtn.fillColumn(0, 1);
		return rtn;
	}
	else if (degree == 1) {
		var rtn = new Matrix(X.height, X.width + 1);
		rtn.fillColumn(0, 1.0);
		for (var i = 0; i < X.width; i++) {
			rtn.setColumn(i + 1, X.column(i));
		}
		return rtn;
	}
	else if (degree == 2) {
		var rtn = new Matrix(X.height, 3);
		var col = 0;
		rtn.fillColumn(col++, 1.0);
		for (var i = 0; i < X.width; i++) {
			rtn.setColumn(col++, X.column(i));
		}
		for (var i = 0; i < X.width; i++) {
			for (var j = 0; j < X.width; j++) {
				rtn.setColumn(col++, X.column(i).component_times(X.column(j)));
			}
		}
		return rtn;
	}
	return null;
}
function linear_least_squares(X, y) {
	var variance = X.tr().times(X);
	var covariance_with_y = X.tr().times(y);
	return variance.inverse().times(covariance_with_y);
}

function eye(n) {
	var rtn = new Matrix(n, n);
	for (var i = 0; i < n; i++) {
		rtn.data[i * n + i] = 1;
	}
	return rtn;
}
