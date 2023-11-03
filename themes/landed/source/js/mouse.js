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