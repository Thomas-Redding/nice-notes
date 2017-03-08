/*** pairwise operators ***/

function add(x, y) {
    if (x.length === undefined && y.length === undefined) {
        return x + y;
    }
    else if (x.length === undefined) {
        var rtn = new Array(y.length);
        for (var i = 0; i < y.length; ++i) rtn[i] = add(x, y[i]);
        return rtn;
    }
    else if (y.length === undefined) {
        var rtn = new Array(x.length);
        for (var i = 0; i < x.length; ++i) rtn[i] = add(x[i], y);
        return rtn;
    }
    else {
        if (x.length != y.length) return undefined;
        var rtn = new Array(x.length);
        for (var i = 0 ; i < x.length; ++i) rtn[i] = add(x[i], y[i]);
        return rtn;
    }
}

function subtract(x, y) {
    if (x.length === undefined && y.length === undefined) {
        return x - y;
    }
    else if (x.length === undefined) {
        var rtn = new Array(y.length);
        for (var i = 0; i < y.length; ++i) rtn[i] = subtract(x, y[i]);
        return rtn;
    }
    else if (y.length === undefined) {
        var rtn = new Array(x.length);
        for (var i = 0; i < x.length; ++i) rtn[i] = subtract(x[i], y);
        return rtn;
    }
    else {
        if (x.length != y.length) return undefined;
        var rtn = new Array(x.length);
        for (var i = 0 ; i < x.length; ++i) rtn[i] = subtract(x[i], y[i]);
        return rtn;
    }
}

function multiply(x, y) {
    if (x.length === undefined && y.length === undefined) {
        return x * y;
    }
    else if (x.length === undefined) {
        var rtn = new Array(y.length);
        for (var i = 0; i < y.length; ++i) rtn[i] = multiply(x, y[i]);
        return rtn;
    }
    else if (y.length === undefined) {
        var rtn = new Array(x.length);
        for (var i = 0; i < x.length; ++i) rtn[i] = multiply(x[i], y);
        return rtn;
    }
    else {
        if (x.length != y.length) return undefined;
        var rtn = new Array(x.length);
        for (var i = 0 ; i < x.length; ++i) rtn[i] = multiply(x[i], y[i]);
        return rtn;
    }
}

function divide(x, y) {
    if (x.length === undefined && y.length === undefined) {
        return x / y;
    }
    else if (x.length === undefined) {
        var rtn = new Array(y.length);
        for (var i = 0; i < y.length; ++i) rtn[i] = divide(x, y[i]);
        return rtn;
    }
    else if (y.length === undefined) {
        var rtn = new Array(x.length);
        for (var i = 0; i < x.length; ++i) rtn[i] = divide(x[i], y);
        return rtn;
    }
    else {
        if (x.length != y.length) return undefined;
        var rtn = new Array(x.length);
        for (var i = 0 ; i < x.length; ++i) rtn[i] = divide(x[i], y[i]);
        return rtn;
    }
}

function power(x, y) {
    if (x.length === undefined && y.length === undefined) {
        return Math.pow(x, y);
    }
    else if (x.length === undefined) {
        var rtn = new Array(y.length);
        for (var i = 0; i < y.length; ++i) rtn[i] = power(x, y[i]);
        return rtn;
    }
    else if (y.length === undefined) {
        var rtn = new Array(x.length);
        for (var i = 0; i < x.length; ++i) rtn[i] = power(x[i], y);
        return rtn;
    }
    else {
        if (x.length != y.length) return undefined;
        var rtn = new Array(x.length);
        for (var i = 0 ; i < x.length; ++i) rtn[i] = power(x[i], y[i]);
        return rtn;
    }
}






/*** statistics ***/

function sum(arr) {
    var rtn = 0;
    for (var i = 0; i < arr.length; ++i) rtn += arr[i];
    return rtn;
}

function mean(arr) {
    return sum(arr)/arr.length;
}

function sd(arr) {
    var rtn = 0;
    var avg = mean(arr);
    for (var i = 0; i < arr.length; ++i) rtn += (arr[i]-avg) * (arr[i]-avg);
    return Math.sqrt(rtn / (arr.length-1));
}

function center(arr, mutate) {
    if (mutate === undefined) mutate = false;
    var mu = avg(arr);
    if (mutate) for (var i = 0; i < arr.length; ++i) arr[i] -= mu;
}

function correlation(x, y) {
    if (x.length != y.length) return undefined;
    var n = x.length;
    var sum_x = sum(x);
    var sum_y = sum(y);
    var sum_xy = sum(multiply(x, y));
    var sum_xx = sum(multiply(x, x));
    var sum_yy = sum(multiply(y, y));

    // http://www.statisticshowto.com/what-is-the-correlation-coefficient-formula/
    return (n*sum_xy - sum_x*sum_y) / Math.sqrt((n*sum_xx - sum_x*sum_x) * (n*sum_yy - sum_y*sum_y));
}

function slope(x, y) {
    var r = correlation(x, y);
    return r*sd(y)/sd(x);
}




/*** linear algebra ***/

function dot(x, y) {
    if (x.length != y.length) return undefined;
    var rtn = 0;
    for (var i = 0; i < x.length; ++i) rtn[i] += x[i] * y[i];
    return rtn;
}

function matrix_multiply(A, B) {
    if (A.length != B.length) return undefined;
    var rtn = new Array(A.length);
    for (var i = 0; i < rtn.length; ++i) {
        rtn[i] = new Array(B[0].length);
        for (var j = 0; j < rtn[i].length; ++j) {
            rtn[i][j] = 0;
            for (var k = 0; k < A[0].length; ++k) {
                rtn[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return rtn;
}

function transpose(A) {
    var rtn = new Array(A[0].length);
    for (var i = 0; i < A.length; ++i) {
        rtn[i] = new Array(A.length);
        for (var j = 0; j < A.length; ++j) rtn[i][j] = A[j][i];
    }
    return rtn;
}





/*** meta ***/

function map(arr, f, mutate) {
    if (mutate === undefined) mutate = false;
    if (mutate) {
        for (var i = 0; arr.length; ++i) arr[i] = f(arr[i])
        return arr;
    }
    else {
        var rtn = new Array(arr.length);
        for (var i = 0; arr.length; ++i) rtn[i] = f(arr[i])
        return rtn;
    }
}

function reduce(arr, f) {
    var rtn = 0;
    for (var i = 0; i < arr.length; ++i) rtn = f(arr[i], f);
    return f;
}

function filter(arr, f) {
    var rtn = new Array();
    for (var i = 0; i < arr.length; ++i) if (f(arr[i])) rtn.push(arr[i]);
    return rtn;
}



/*** random ***/

function random_points(n, mins, maxs, predicate) {
    var rtn = new Array(n);
    for (var i = 0; i < n; ++i) rtn[i] = new Array(mins.length);
    for (var i = 0; i < n; ++i) {
        for (var j =0 ; j < mins.length; ++j) {
            rtn[i][j] = (maxs[j]-mins[j]) * Math.random() + mins[j];
        }
        if (!predicate(rtn[i])) --i;
    }
    return rtn;
}

function random_elipse(n, center, scale, rotation) {
    var rtn = new Array(n);
    for (var i = 0; i < n; ++i) rtn[i] = new Array(2);
    for (var i = 0; i < n; ++i) {
        var x = 2 * scale[0] * Math.random() - scale[0];
        var y = 2 * scale[1] * Math.random() - scale[1];
        if (x*x/scale[0]/scale[0] + y*y/scale[1]/scale[1] > 1) {
            --i;
            continue;
        }
        rtn[i][0] = Math.cos(rotation) * x + Math.sin(rotation) * y;
        rtn[i][1] = Math.cos(rotation) * y - Math.sin(rotation) * x;
        rtn[i][0] += center[0];
        rtn[i][1] += center[1];
    }
    return rtn;
}

function random_normal(mu, sigma) {
    if (mu === undefined) mu = 0;
    if (sigma === undefined) sigma = 1;
    return mu + sigma * (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 6);
}

function random(inverse_cdf, n) {
    if (inverse_cdf === undefined) inverse_cdf = function(x) {return x;}
    else if (n === undefined) return inverse_cdf(Math.random());
    else {
        var rtn = new Array(n);
        for (var i = 0; i < n; ++i) rnt.push(inverse_cdf(Math.random()));
        return rtn;
    }
}


