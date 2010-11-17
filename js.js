/*
  Pung - A HTML5 pang rewrite http://pung.tk/
  
  Copyright (C) 2010 Mounier Florian aka paradoxxxzero
  Copyright (C) 2010 Dunklau Ronan
  
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

var _canvas, _c, _scr, _balls, _bullets, _grapnels, _player, _step, _clipMargin, _time, _initTime, _keyboard, _colors, _maxSize;


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
    $.each(_balls, function(i, ball) {
	_c.clearRect(ball.x - ball.r - _clipMargin, ball.y - ball.r - _clipMargin,	
		     2 * (ball.r + _clipMargin), 2 * (ball.r + _clipMargin));
    });
    $.each(_bullets, function(i, bullet) {
	_c.clearRect(bullet.x - 1, bullet.y, 2, 10);
    });
    _c.clearRect(_player.x - _player.w / 2, _scr.h - _player.h, _player.w, _player.h);
}

function moveBalls(dTime) {
    $.each(_balls, function(i, ball) {
	ball.v.x += (ball.a.x * dTime) / 1000;
	ball.v.y += (ball.a.y * dTime) / 1000;
	next = {
	    x: ball.x + (ball.v.x * dTime) / 1000,
	    y: ball.y + (ball.v.y * dTime) / 1000
	};
	if(next.x + ball.r > _scr.w) {
	    ball.x = 2 * _scr.w - 2 * ball.r - next.x;
	    ball.v.x *= -1;
	} else if(next.x - ball.r < 0) {
	    ball.x = 2 * ball.r - next.x;
	    ball.v.x *= -1;
	} else {
	    ball.x = next.x;
	}
	if(next.y + ball.r > _scr.h) {
	    ball.y = 2 * _scr.h - 2 * ball.r - next.y;
	    ball.v.y *= -1;
	} else {
	    ball.y = next.y;
	}
    });
}

function moveBullets() {
    var bulletsToRemove = new Array();
    $.each(_bullets, function(i, bullet) {
	bullet.y -= 1;
	if(bullet.y < 0)
	    bulletsToRemove.push({
		i: i,
		bullet: bullet
	    });
    });
    $.each(bulletsToRemove, function(i, bulletToRemove) {
	_bullets.splice(bulletToRemove.i, 1);
    });
}

function movePlayer() {
    if(_keyboard.right) {
	if(_player.x + _player.w / 2 + _player.step < _scr.w)
	    _player.x += _player.step;
    } else if(_keyboard.left) {
	if(_player.x - _player.w / 2 - _player.step > 0)
	    _player.x -= _player.step;
    }
}

function renderBullets() {
    $.each(_bullets, function(i, bullet) {
	_c.fillStyle = _colors.bullet;
	_c.fillRect(bullet.x - 1, bullet.y, 2, 10);
    });
}

function renderBalls() {
    $.each(_balls, function(i, ball) {
	_c.beginPath();
	_c.fillStyle = _colors.balls[ball.p];
	_c.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
	_c.fill();
    });
}

function renderPlayer() {
    _c.fillStyle = _colors.player;
    _c.fillRect(_player.x - _player.w / 2, _scr.h - _player.h, _player.w, _player.h);
}

function ballBulletIntersect(ball, bullet){
    var r = ball.r
    return (bullet.x > ball.x -r && bullet.x < ball.x + r
            && bullet.y > ball.y - r && bullet .y < ball.y+r);
}

function handleCollisions() {
    var ballsToRemove = new Array();
    var bulletsToRemove = new Array();
    var ballsToAdd = new Array();
    $.each(_balls, function(i, ball) {
        $.each(_bullets, function(j, bullet) {
            if (ballBulletIntersect(ball, bullet)){
		if(ball.p > 0) {
		    ballsToAdd.push({
			x: ball.x,
			y: ball.y,
			r: ball.r / 2,
			p: ball.p - 1,
			v: {
			    x: ball.v.x,
			    y: 0},
			a: {
			    x: 0,
			    y: 980},
		    });
		    ballsToAdd.push({
			x: ball.x,
			y: ball.y,
			r: ball.r / 2,
			p: ball.p - 1,
			v: {
			    x: -ball.v.x,
			    y: 0},
			a: {
			    x: 0,
			    y: 980},
		    });
		}
		ballsToRemove.push({
		    i: i,
		    ball: ball,
		});
		bulletsToRemove.push({
		    i: j,
		    bullet: bullet,
		});
	    }
	});
    });
    $.each(ballsToRemove, function(i, ballToRemove) {
	_balls.splice(ballToRemove.i, 1);
    });
    $.each(bulletsToRemove, function(i, bulletToRemove) {
	_bullets.splice(bulletToRemove.i, 1);
    });
    $.each(ballsToAdd, function(i, ballToAdd) {
	_balls.push(ballToAdd);
    });
}

function draw() {
    clip();
    var dTime = new Date().getTime() - _time;
    moveBalls(dTime);
    moveBullets();
    movePlayer();
    handleCollisions();
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
    _step = 20;
    _clipMargin = 5;
    _maxSize = 4;
    _canvas = $('#canvas')[0];
    _c = _canvas.getContext('2d');
    size();
    _bullets = new Array();
    _balls = new Array();
    _balls.push({
	x: _scr.w / 2,
	y: _scr.h / 8,
	r: 100,
	p: _maxSize,
	v: {
	    x: 100,   // pix.s^-1
	    y: 0},
	a: {
	    x: 0,
	    y: 980}, // pix.s^-
    });
    _player = {
	x: _scr.w / 2,
	w: 20,
	h: 40,
	shots: 1,
	step: 1
    };
    _keyboard = {
	left: false,
	right: false,
    }
    _initTime = _time = new Date().getTime();
    colorsFromCss();
    setTimeout(draw, _step);
}

function colorsFromCss() {
    _colors = {
	balls: new Array(),
	bullet: $(".bullet").css("color"),
	player: $(".player").css("color"),
    };
    for (var p = 0 ; p <= _maxSize ; p++) {
	_colors.balls[p] = $(".ball-" + p).css("color");
    }
}
