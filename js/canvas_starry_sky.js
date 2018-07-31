//星空，流星，背景
var screenWidth = document.body.clientWidth;
var screenHeight = document.body.clientHeight;
var c, cns;
// 星星数量
var num = 500;
// 星星数组
var stars = [];
// 流星索引
var rnd;
var skyFill;
window.onload = function () {
    var c = document.getElementById('cns_sky');
    c.width = screenWidth;
    c.height = screenHeight;
    cns = c.getContext('2d');
    // 生成星星
    addStar();
    // 渲染至画布上
    setInterval(render, 17);
    // 增加流星
    meteor();
};

// 生成流星的索引号
function meteor() {
    var time = Math.round(Math.random() * 3000 + 17);
    setTimeout(function () {
        rnd = Math.ceil(Math.random() * stars.length);
        meteor();
    }, time);
}

// 画布渲染
function render() {
    skyFill = cns.createLinearGradient(0, 0, 0, screenHeight);
    skyFill.addColorStop(0, 'rgb(17,48,115)');
    skyFill.addColorStop(1, 'rgb(56,96,165)');
    // 画布背景色(黑色)
    //cns.fillStyle = 'rgba(0,0,0,0.1)';
    cns.fillStyle = skyFill;
    // 画布位置
    cns.fillRect(0, 0, screenWidth, screenHeight);
    for (var i = 0; i < num; i++) {
        var star = stars[i];
        // 画流星
        if (i == rnd) {
            star.vx = -2;
            star.vy = 10;
            cns.beginPath();
            var rndFill=cns.createLinearGradient(star.x, star.y,star.x + star.vx*10, star.y + star.vy*10);
            rndFill.addColorStop(0,'rgba(255,255,255,0)');
            rndFill.addColorStop(1,'rgba(255,255,255,' + star.alpha + ')');
            cns.strokeStyle = rndFill;
            cns.lineWidth = star.r;
            cns.moveTo(star.x, star.y);
            cns.lineTo(star.x + star.vx*10, star.y + star.vy*10);
            cns.stroke();
            cns.closePath();
        }
        star.alpha += star.ra;
        // 透明度判断，从0到1
        if (star.alpha <= 0) {
            star.alpha = 0;
            star.ra = -star.ra;
            star.vx = Math.random() * 0.2 - 0.1;
            star.vy = Math.random() * 0.2 - 0.1;
        } else if (star.alpha > 1) {
            star.alpha = 1;
            star.ra = -star.ra
        }
        star.x += star.vx;
        // x轴坐标判断
        if (star.x >= screenWidth) {
            star.x = 0;
        } else if (star.x < 0) {
            star.x = screenWidth;
            star.vx = Math.random() * 0.2 - 0.1;
            star.vy = Math.random() * 0.2 - 0.1;
        }
        star.y += star.vy;
        // y轴坐标判断
        if (star.y >= screenHeight) {
            star.y = 0;
            star.vy = Math.random() * 0.2 - 0.1;
            star.vx = Math.random() * 0.2 - 0.1;
        } else if (star.y < 0) {
            star.y = screenHeight;
        }
        // 开始绘制
        cns.beginPath();
        var bg = cns.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
        bg.addColorStop(0, 'rgba(255,255,255,' + star.alpha + ')');
        bg.addColorStop(1, 'rgba(255,255,255,0)');
        cns.fillStyle = bg;
        // 画圆
        cns.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
        // 实际绘制
        cns.fill();
        cns.closePath();
    }
}

// 生成星星
function addStar() {
    for (var i = 0; i < num; i++) {
        var aStar = {
            // x轴坐标
            x: Math.round(Math.random() * screenWidth),
            // y轴坐标
            y: Math.round(Math.random() * screenHeight),
            // 圆半径
            r: Math.random() * 3,
            ra: Math.random() * 0.05,
            // 透明度
            alpha: Math.random(),
            // 横向移动偏移量
            vx: Math.random() * 0.2 - 0.1,
            // 纵向移动偏移量
            vy: Math.random() * 0.2 - 0.1
        };
        stars.push(aStar);
    }
}