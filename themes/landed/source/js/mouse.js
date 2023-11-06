var a_idx = 0;

$("body").click(function (e) {
    var a = new Array(
        "(*´∀`)~♥", "( ´ﾟДﾟ`)", "⁽⁽ଘ( ˙꒳˙ )ଓ⁾⁾", "♥(´∀` )人",
        "(ﾟ皿ﾟﾒ)", "(=´ᴥ`)", "(|||ﾟдﾟ)", "╮(′～‵〞)╭",
        "(ó㉨ò)", "(,,ﾟДﾟ)", "✧*｡٩(ˊᗜˋ*)و✧*｡", "(◔౪◔)"
    );
    var $i = $("<div class=\"mouse\"/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.pageX,
        y = e.pageY;
    $i.css({
        "z-index": 144469,
        "top": y - 20,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "color": "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")"
    });
    $("body").append($i);
    $i.animate({
        "top": y - 180,
        "opacity": 0
    },
        1500,
        function () {
            $i.remove();
        });
});

let isMessageVisible = false;
let timeoutId;
// 获取<a>标签和消息元素
const link = document.getElementById("link");
const message = document.getElementById("message");

// 添加鼠标悬停事件监听器
link.addEventListener("mouseover", function() {
    if (!isMessageVisible) {
        message.style.display = "block";
        isMessageVisible = true;
    }
});

// 添加鼠标离开事件监听器（可选，如果希望鼠标离开时隐藏消息）
link.addEventListener("mouseout", function() {
    // 使用延迟来隐藏消息
    message.style.display = "none";
    isMessageVisible = false;
});