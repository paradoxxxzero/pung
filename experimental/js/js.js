var _canvas, _c, _scr, _balls, _bullets, _grapnels, _player, _step, _clipMargin, _time, _initTime, _keyboard, _colors, _maxSize, _urlParams, _frames, _heights;

var resize = function() {
    _scr = {
	h: _canvas.height = window.innerHeight,
	w: _canvas.width = window.innerWidth
    };
};

var colorsFromCss = function() {
    _colors = {
	balls: new Array(),
	bullet: $("div.bullet").css("color"),
	grapnel: $("div.grapnel").css("color"),
	player: $("div.player").css("color")
    };
    for (var p = 0 ; p <= _maxSize ; p++) {
	_colors.balls[p] = $("div.ball-" + p).css("color");
    }
};

var displayFps = function () {
    document.title = _frames + " fps";
    _frames = 0;
};

$(document).ready(function () {
    $(window).resize(resize);
    //$(window).keydown(kdown);
    //$(window).keyup(kup);
    _frames = 0;
    _step = 5;
    _clipMargin = 5;
    _maxSize = 4;
    _urlParams = $.parseQuery();
    _heights = [.75, .625, .5, .25, .125];

    _canvas = $('#canvas')[0];
    _c = _canvas.getContext('2d');
    resize();
    _keyboard = {
	left: false,
	right: false
    };
    _initTime = _time = new Date().getTime();
    colorsFromCss();
    setInterval(displayFps, 1000);
    var pungGame = new Pung(_c);
    pungGame.addBall(new Ball(
	new Location(_scr.w/2, _scr.h/8, 
		     new Speed(0,0,
			       new Acceleration(0, 980)
			      )
		    ), 50, 4));
    pungGame.animate();
});
