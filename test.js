var jsBg1 = document.getElementById("bg1");
var jsBg2 = document.getElementById("bg2");
var mainScreen = document.getElementById("mainScreen");

//让背景动起来
var timeBg = setInterval(function () {
    jsBg1.style.top = jsBg1.offsetTop + 1 +"px";
    jsBg2.style.top = jsBg2.offsetTop + 1 +"px";

    if(jsBg1.offsetTop >= 768){
        jsBg1.style.top = "-768px"
    }
    if(jsBg2.offsetTop >= 768){
        jsBg2.style.top = "-768px"
    }

},10);

//让飞机动起来
var airplane = document.getElementById("airplane");
airplane.addEventListener("mousedown",function (e) {
    var ev = e || window.event;

    basex = ev.pageX;
    basey = ev.pageY;

    movex = 0;
    movey = 0;

    //给主屏幕增加鼠标移动事件
    mainScreen.addEventListener("mousemove",function (e) {
        var en = e || window.event;
        movex = en.pageX-basex;
        movey = en.pageY-basey;

        basex = en.pageX;
        basey = en.pageY;

        airplane.style.left = airplane.offsetLeft + movex + "px";
        airplane.style.top = airplane.offsetTop + movey + "px"
    },false)
},false);

//发射子弹
var timerBullent = setInterval(function () {
    var bullent = document.createElement("div");
    mainScreen.appendChild(bullent);

    bullent.className = "bullent";
    bullent.style.left = airplane.offsetLeft + 53 +"px";
    bullent.style.top = airplane.offsetTop -15 + "px";

    //让子弹飞
    var timerBullentFly = setInterval(function () {
        bullent.style.top = bullent.offsetTop - 5 + "px";
        if(bullent.offsetTop <= -20){
            clearInterval(timerBullentFly);
            mainScreen.removeChild(bullent)
        }
    },50);

    bullent.timer = timerBullentFly  //增加一个属性记录当前定时器
},1000);

//敌人下落
var timerTank = setInterval(function () {
    var tank = document.createElement("div");
    mainScreen.appendChild(tank);

    tank.className = "tank";
    tank.style.left = randomNum(0,472) +"px";
    tank.style.top = "0px";

    //让坦克出发
    var timerTankFly = setInterval(function () {
        tank.style.top = tank.offsetTop + 5 + "px";
        if(tank.offsetTop >= 768){
            clearInterval(timerTankFly);
            mainScreen.removeChild(tank)
        }
    },50);
    tank.timer = timerTankFly;  //增加一个属性记录当前定时器
},1000);

var timerCollide = setInterval(function () {
    var allTanks = document.getElementsByClassName("tank");
    var allBullents = document.getElementsByClassName("bullent");
    for (var i = 0 ; i < allBullents.length; i++) {
        for (var j = 0;j < allTanks.length; j++){
            var b = allBullents[i];
            var t = allTanks[j];

            if(collide(b,t)){
                clearInterval(b.timer);
                clearInterval(t.timer);
                mainScreen.removeChild(b);
                mainScreen.removeChild(t);
                break;//发生碰撞，则无需再进行比较
            }
        }
    }
},200);

//检查是否发生碰撞(矩形碰撞检测)
function collide(obj1,obj2) {
    var obj1Left = obj1.offsetLeft;
    var obj1Width = obj1Left + obj1.offsetWidth;
    var obj1Top = obj1.offsetTop;
    var obj1Height = obj1Top + obj1.offsetHeight;

    var obj2Left = obj2.offsetLeft;
    var obj2Width = obj2Left + obj2.offsetWidth;
    var obj2Top = obj2.offsetTop;
    var obj2Height = obj2Top + obj2.offsetHeight;

     if(!(obj1Left > obj2Width || obj1Width < obj2Left || obj1Top > obj2Height || obj1Height < obj2Top)){
        return true;
    }else{
        return false;
    }
}


//  死亡检测
var timerDieCollide = setInterval(function () {
    var allTanks = document.getElementsByClassName("tank");

    for (var i = 0 ; i < allTanks .length; i++) {
        if(collide(allTanks[i],airplane)){
            for(var j = 0 ; j < 100 ; j++){
                clearInterval(j)
            }
        }
    }
},200);