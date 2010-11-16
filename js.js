/*
  Pung - A HTML5 pang rewrite http://pung.tk/
  
  Copyright (C) 2010 Mounier Florian aka paradoxxxzero
  
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as
  published by the Free Software Foundation, either version 3 of the
  License, or any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see http://www.gnu.org/licenses/.
*/

var _canvas, _c, _scr, _balls, _bullets, _player, _step, _clipMargin, _time, _initTime, _keyboard;


function d(p, q) {
    return Math.sqrt(Math.pow(q.x - p.x, 2) + Math.pow(q.y - p.y, 2));
}

function size() {
    _scr = {
	h: _canvas.height = window.innerHeight,
	w: _canvas.width = window.innerWidth
    };
}

function resize() {
    size();
}

function clip() {
    $.each(_balls, function(i, _ball) {
	_c.clearRect(_ball.x - _ball.r - _clipMargin, _ball.y - _ball.r - _clipMargin,		2 * (_ball.r + _clipMargin), 2 * (_ball.r + _clipMargin));
    });
    $.each(_bullets, function(i, _bullet) {
	_c.clearRect(_bullet.x - 1, _bullet.y, 2, 10);
    });
     _c.clearRect(0, _scr.h - _player.h, _scr.w, _player.h);
}

function moveBalls(dTime) {
    $.each(_balls, function(i, _ball) {
	_ball.v.x += (_ball.a.x * dTime) / 1000;
	_ball.v.y += (_ball.a.y * dTime) / 1000;
	next = {
	    x: _ball.x + (_ball.v.x * dTime) / 1000,
	    y: _ball.y + (_ball.v.y * dTime) / 1000
	};
	if(next.x + _ball.r > _scr.w) {
	    _ball.x = 2 * _scr.w - 2 * _ball.r - next.x;
	    _ball.v.x *= -1;
	} else if(next.x - _ball.r < 0) {
	    _ball.x = 2 * _ball.r - next.x;
	    _ball.v.x *= -1;
	} else {
	    _ball.x = next.x;
	}
	if(next.y + _ball.r > _scr.h) {
	    _ball.y = 2 * _scr.h - 2 * _ball.r - next.y;
	    _ball.v.y *= -1;
	} else {
	    _ball.y = next.y;
	}
    });
}

function moveBullets() {
    $.each(_bullets, function(i, _bullet) {
	_bullet.y -= 5;
    });
}

function movePlayer() {
    if(_keyboard.right) {
	if(_player.x + 2 < _scr.w)
	    _player.x += 2;
    } else if(_keyboard.left) {
	if(_player.x - 2 > 0)
	    _player.x -= 2;
    }
}

function renderBullets() {
    $.each(_bullets, function(i, _bullet) {
	_c.fillStyle = _bullet.color;
	_c.fillRect(_bullet.x - 1, _bullet.y, 2, 10);
    });
}

function renderBalls() {
    $.each(_balls, function(i, _ball) {
	_c.beginPath();
	_c.fillStyle = _ball.color;
	_c.arc(_ball.x, _ball.y, _ball.r, 0, 2 * Math.PI, false);
	_c.fill();
    });
}

function renderPlayer() {
    _c.fillStyle = _player.color;
    _c.fillRect(_player.x - _player.w / 2, _scr.h - _player.h, _player.w, _player.h);
}

function draw() {
    clip();
    var dTime = new Date().getTime() - _time;
    moveBalls(dTime);
    movePlayer();
    moveBullets();
    renderBalls();
    renderBullets();
    renderPlayer();
    _time = new Date().getTime();
    setTimeout(draw, _step);
}

function kdown(event) {
    if(event.keyCode == 39) {
	_keyboard.right = true;
    } else if(event.keyCode == 37) {
	_keyboard.left = true;
    } else if(event.keyCode == 32) {
	_bullets.push({
	    x: _player.x,
	    y: _scr.h - _player.h,
	    color: "#b6e354",
	});
    }
}
function kup(event) {
    if(event.keyCode == 39) {
	_keyboard.right = false;
    } else if(event.keyCode == 37) {
	_keyboard.left = false;
    }
}


$(window).load(function() {
    $(window).resize(resize);
    $(window).keydown(kdown);
    $(window).keyup(kup);
    init();
});

function init() {
    _step = 1;
    _clipMargin = 5;
    _canvas = $('#canvas')[0];
    _c = _canvas.getContext('2d');
    size();
    _bullets = new Array();
    _balls = new Array();
    _balls.push({
	x: _scr.w / 2,
	y: _scr.h / 8,
	r: 100,
	v: {
	    x: 100,   // pix.s^-1
	    y: 0},
	a: {
	    x: 0,
	    y: 980}, // pix.s^-
	color: "#8cedff",
    });
    _player = {
	x: _scr.w / 2,
	w: 20,
	h: 40,
	color: "#9e6ffe",
    };
    _keyboard = {
	left: false,
	right: false,
    }
    _initTime = _time = new Date().getTime();
    setTimeout(draw, _step);
}
