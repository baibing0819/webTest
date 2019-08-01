//随机数
function randomNum(min,max) {
    return parseInt(Math.random() * (max - min) + min);
}

//随机颜色
function randomColor() {
    var r = parseInt(Math.random() * 256);
    var g = parseInt(Math.random() * 256);
    var b = parseInt(Math.random() * 256);

    var colorStr = "rgb(" + r + "," + g + "," + b + ")";
    return colorStr;
}
