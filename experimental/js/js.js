var _canvas, _c, _scr, _balls, _bullets, _grapnels, _player, _step, _clipMargin, _time, _initTime, _keyboard, _colors, _maxLife, _urlParams, _frames, _heights;

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
    for (var p = 0 ; p <= _maxLife ; p++) {
	_colors.balls[p] = $("div.ball-" + p).css("color");
    }
};

var displayFps = function () {
    document.title = _frames + " fps";
    _frames = 0;
};

function kdown(event) {
    if(event.keyCode == 39) {
	_keyboard.right = true;
    } else if(event.keyCode == 37) {
	_keyboard.left = true;
    }
}

function kup(event) {
    if(event.keyCode == 39) {
	_keyboard.right = false;
    } else if(event.keyCode == 37) {
	_keyboard.left = false;
    }
}

$(document).ready(
    function () {
	$(window).resize(resize);
	$(window).keydown(kdown);
	$(window).keyup(kup);
	_frames = 0;
	_step = 5;
	_clipMargin = 5;
	_maxLife = 4;
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
	pungGame.addBall(pungGame.makeBall(50, 200, _maxLife));
	pungGame.addBall(pungGame.makeBall(400, -100, _maxLife - 1));
	pungGame.addPlayer(pungGame.makePlayer(50));

	var animate = function () {
	    _frames++;
	    pungGame.animate();
	    setTimeout(animate, _step);
	};
	animate();
    }
);
