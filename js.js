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

var _canvas, _c, _scr, _balls, _bullets, _grapnels, _player, _step, _clipMargin, _time, _initTime, _keyboard, _colors, _maxSize, _urlParams, _frames, _heights;


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
    _c.save();

    if(_urlParams.blur) {
	_c.fillStyle = "rgba(0, 0, 0, 0.05)";
	_c.fillRect(0, 0, _scr.w, _scr.h);
    } else {
	$.each(_balls, function(i, ball) {
	    _c.clearRect(ball.x - ball.r - _clipMargin, ball.y - ball.r - _clipMargin,
			 2 * (ball.r + _clipMargin), 2 * (ball.r + _clipMargin));
	});
	$.each(_bullets, function(i, bullet) {
	    _c.clearRect(bullet.x - bullet.w / 2 - _clipMargin, bullet.y - _clipMargin, bullet.w + 2 * _clipMargin, bullet.h + 2 * _clipMargin);
	});
	$.each(_grapnels, function(i, grapnel) {
	    _c.clearRect(grapnel.x - grapnel.w / 2 - _clipMargin, grapnel.y - _clipMargin, grapnel.w + 2 * _clipMargin, _scr.h - grapnel.y + 2 * _clipMargin);
	});
	_c.clearRect(_player.x - _player.w / 2 - _clipMargin, _scr.h - _player.h - _clipMargin, _player.w +  2 * _clipMargin, _player.h + 2 * _clipMargin);
    }
    _c.restore();
}

function moveBalls(dTime) {
    $.each(_balls, function(i, ball) {
	ball.v.x += (ball.a.x * dTime) / 1000;
	ball.v.y += (ball.a.y * dTime) / 1000;
	var next = {
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

function moveBullets(dTime) {
    var bulletsToRemove = new Array();
    $.each(_bullets, function(i, bullet) {
	bullet.y += (bullet.vy * dTime) / 1000;
	if(bullet.y < 0) {
	    bulletsToRemove.push({
		i: i,
		bullet: bullet
	    });
	}
    });
    $.each(bulletsToRemove, function(i, bulletToRemove) {
	_bullets.splice(bulletToRemove.i, 1);
    });
}

function moveGrapnels(dTime) {
    var grapnelsToRemove = new Array();
    $.each(_grapnels, function(i, grapnel) {
	grapnel.y += (grapnel.vy * dTime) / 1000;
	if(grapnel.y < 0) {
	    _player.shots++;
	    grapnelsToRemove.push({
		i: i,
		grapnel: grapnel
	    });
	}
    });
    $.each(grapnelsToRemove, function(i, grapnelToRemove) {
	_grapnels.splice(grapnelToRemove.i, 1);
    });
}

function movePlayer(dTime) {
    if(_keyboard.right) {
	var next = _player.x + (_player.vx * dTime) / 1000;
	if(next + _player.w / 2 < _scr.w) {
	    _player.x = next;
	}
    } else if(_keyboard.left) {
	var next = _player.x - (_player.vx * dTime) / 1000;
	if(next - _player.w / 2 > 0) {
	    _player.x = next;
	}
    }
}

function renderBullets() {
    _c.save();
    $.each(_bullets, function(i, bullet) {
	_c.shadowBlur = 5;
	_c.shadowColor = _colors.bullet;
	_c.fillStyle = _colors.bullet;
	_c.fillRect(bullet.x - bullet.w / 2, bullet.y, bullet.w, bullet.h);
    });
    _c.restore();
}

function renderGrapnels() {
    _c.save();
    $.each(_grapnels, function(i, grapnel) {
	_c.shadowBlur = 5;
	_c.shadowColor = _colors.grapnel;
	_c.fillStyle = _colors.grapnel;
	_c.fillRect(grapnel.x - grapnel.w / 2, grapnel.y, grapnel.w, _scr.h - grapnel.y);
    });
    _c.restore();
}

function renderBalls() {
    _c.save();
    $.each(_balls, function(i, ball) {
	_c.beginPath();
 	_c.shadowBlur = 10;
	_c.shadowColor = _colors.balls[ball.p];
	_c.fillStyle = _colors.balls[ball.p];
	_c.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI, false);
	_c.fill();
    });
    _c.restore();
}

function renderPlayer() {
    _c.save();
    _c.shadowBlur = 5;
    _c.shadowColor = _colors.player;
    _c.fillStyle = _colors.player;
    _c.fillRect(_player.x - _player.w / 2, _scr.h - _player.h, _player.w, _player.h);
    _c.restore();
}

function handleBulletCollisions() {
    var ballsToRemove = new Array();
    var bulletsToRemove = new Array();
    var ballsToAdd = new Array();
    $.each(_balls, function(i, ball) {
        $.each(_bullets, function(j, bullet) {
            if (d(ball, bullet) < ball.r) {
		if(ball.p > 0) {
		    ballsToAdd.push({
			x: ball.x,
			y: _scr.h * _heights[ball.p - 1],
			r: ball.r / 2,
			p: ball.p - 1,
			v: {
			    x: ball.v.x,
			    y: 0},
			a: {
			    x: 0,
			    y: 980}
		    });
		    ballsToAdd.push({
			x: ball.x,
			y: _scr.h * _heights[ball.p - 1],
			r: ball.r / 2,
			p: ball.p - 1,
			v: {
			    x: -ball.v.x,
			    y: 0},
			a: {
			    x: 0,
			    y: 980}
		    });
		}
		ballsToRemove.push({
		    i: i,
		    ball: ball
		});
		bulletsToRemove.push({
		    i: j,
		    bullet: bullet
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

function handleGrapnelCollisions() {
    var ballsToRemove = new Array();
    var grapnelsToRemove = new Array();
    var ballsToAdd = new Array();
    $.each(_balls, function(i, ball) {
        $.each(_grapnels, function(j, grapnel) {
            if (d(ball, grapnel) < ball.r || (ball.x - ball.r < grapnel.x && ball.x + ball.r > grapnel.x && ball.y > grapnel.y)) {
		_player.shots++;
		if(ball.p > 0) {
		    ballsToAdd.push({
			x: ball.x,
			y: _scr.h * _heights[ball.p - 1],
			r: ball.r / 2,
			p: ball.p - 1,
			v: {
			    x: ball.v.x,
			    y: 0},
			a: {
			    x: 0,
			    y: 980}
		    });
		    ballsToAdd.push({
			x: ball.x,
			y: _scr.h * _heights[ball.p - 1],
			r: ball.r / 2,
			p: ball.p - 1,
			v: {
			    x: -ball.v.x,
			    y: 0},
			a: {
			    x: 0,
			    y: 980}
		    });
		}
		ballsToRemove.push({
		    i: i,
		    ball: ball
		});
		grapnelsToRemove.push({
		    i: j,
		    grapnel: grapnel
		});
	    }
	});
    });
    $.each(ballsToRemove, function(i, ballToRemove) {
	_balls.splice(ballToRemove.i, 1);
    });
    $.each(grapnelsToRemove, function(i, grapnelToRemove) {
	_grapnels.splice(grapnelToRemove.i, 1);
    });
    $.each(ballsToAdd, function(i, ballToAdd) {
	_balls.push(ballToAdd);
    });
}

function handlePlayerCollisions() {
    $.each(_balls, function(i, ball) {
	// Approx collision by only computing the two top corners of the player :
	if(d(ball, { x: _player.x - _player.w / 2, y: _scr.h - _player.h}) < ball.r ||
	   d(ball, { x: _player.x + _player.w / 2, y: _scr.h - _player.h}) < ball.r) {
	    $("body").addClass("lost");
	}
    });
}

function draw() {
    _frames++;
    clip();
    var dTime = Math.min(new Date().getTime() - _time, 50);
    moveBalls(dTime);
    moveBullets(dTime);
    moveGrapnels(dTime);
    movePlayer(dTime);
    handleBulletCollisions();
    handleGrapnelCollisions();
    handlePlayerCollisions();
    renderBalls();
    renderBullets();
    renderGrapnels();
    renderPlayer();
    _time = new Date().getTime();
    setTimeout(draw, _step);
}

function kdown(event) {
    if(event.keyCode == 39) {
	_keyboard.right = true;
    } else if(event.keyCode == 37) {
	_keyboard.left = true;
    } else if(event.keyCode == 17) {
	_bullets.push({
	    x: _player.x - _player.w / 2,
	    y: _scr.h - _player.h,
	    w: 2,
	    h: 10,
	    vy: -1500
	});
	_bullets.push({
	    x: _player.x + _player.w / 2,
	    y: _scr.h - _player.h,
	    w: 2,
	    h: 10,
	    vy: -1500
	});
    } else if (event.keyCode == 32) {
	if(_player.shots > 0) {
	    _player.shots--;
	    _grapnels.push({
		x: _player.x,
		y: _scr.h,
		w: 2,
		vy: -1000
	    });
	}
    }
}

function kup(event) {
    if(event.keyCode == 39) {
	_keyboard.right = false;
    } else if(event.keyCode == 37) {
	_keyboard.left = false;
    }
}
$(document).ready(function() {
    $(window).resize(resize);
    $(window).keydown(kdown);
    $(window).keyup(kup);
    init();
});

function init() {
    _frames = 0;
    _step = 5;
    _clipMargin = 15;
    _maxSize = 4;
    _urlParams = $.parseQuery();
    _heights = [.75, .625, .5, .25, .125];

    _canvas = $('#canvas')[0];
    _c = _canvas.getContext('2d');
    size();
    _grapnels = new Array();
    _bullets = new Array();
    _balls = new Array();
    _balls.push({
	x: _scr.w / 2,
	y: _scr.h * _heights[_maxSize],
	r: 100,
	p: _maxSize,
	v: {
	    x: 100,   // pix.s^-1
	    y: 0},
	a: {
	    x: 0,
	    y: 980} // pix.s^-
    });
    _player = {
	x: _scr.w / 2,
	w: 20,
	h: 40,
	shots: 2,
	vx: 200
    };
    _keyboard = {
	left: false,
	right: false
    };
    _initTime = _time = new Date().getTime();
    colorsFromCss();
    setTimeout(draw, _step);
    setInterval(displayFps, 1000);
}

function displayFps() {
    document.title = _frames + " fps";
    _frames = 0;
}

function colorsFromCss() {
    _colors = {
	balls: new Array(),
	bullet: $("div.bullet").css("color"),
	grapnel: $("div.grapnel").css("color"),
	player: $("div.player").css("color")
    };
    for (var p = 0 ; p <= _maxSize ; p++) {
	_colors.balls[p] = $("div.ball-" + p).css("color");
    }
}
