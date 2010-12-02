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

/**
 * Main singleton class contructed when the document is ready
 * @author Mounier Florian
 */
var JSPung = function () {
    this.canvas = $('#canvas')[0];
    this.c = this.canvas.getContext('2d');
    this.screen = new Screen(this.canvas);
    this.keyboard = new Keyboard();
    this.frames = 0;
    this.level = 1;
    this.leftPlayerSet = {
	left: {
	    keyCode: 37,
	    down: false
	},
	right: {
	    keyCode: 39,
	    down: false
	},
	bullet: {
	    keyCode: 17,
	    down: false
	},
	grapnel: {
	    keyCode: 16,
	    down: false
	}
    };

    this.rightPlayerSet = {
	left: {
	    keyCode: 68,
	    down: false
	},
	right: {
	    keyCode: 71,
	    down: false
	},
	bullet: {
	    keyCode: 65,
	    down: false
	},
	grapnel: {
	    keyCode: 81,
	    down: false
	}
    };
    //$(window).resize(function (event) {JSPung._.screen.resize(event);});
    $(window).keydown(function (event) {JSPung._.keyboard.down(event);});
    $(window).keyup(function (event) {JSPung._.keyboard.up(event);});
};

/**
 * This method starts the fps counter
 */
JSPung.prototype.startFps = function () {
    setInterval(function () {JSPung._.fps();}, 1000);
};

/**
 * This method is periodically called to display the fps rate
 */

JSPung.prototype.fps = function () {
    document.title = this.frames + " fps";
    this.frames = 0;
};

/**
 * This method is periodically called to call the animate function of the game
 * and to check the state of the game
 */
JSPung.prototype.animate = function () {
    this.frames++;
    var gameState = this.pung.animate();
    if(!gameState) {
	// The players are all dead
	if(gameState == null) {
	    this.makeLevel();
	} else {
	    this.level++;
	    this.makeLevel();
	}
    }
    setTimeout(function () { JSPung._.animate(); }, 8); // ~120Hz
};

/**
 * This function create a new level according to the value of level
 */
JSPung.prototype.makeLevel = function () {
    this.pung = new Pung(this.c);
    var levelBalls = JSPung.ballsByLevel[this.level - 1];
    var _this = this;
    $.each(levelBalls, function (i, ball) {
	       _this.pung.addBall(new Ball(ball.x, ball.xspeed, ball.life));
	   });
    this.pung.addPlayer(new Player(this.screen.w / 3, 1, this.leftPlayerSet));
    this.pung.addPlayer(new Player(this.screen.w * 2 / 3, 2, this.rightPlayerSet));

    // Init canvas
    this.c.save();
    this.c.fillStyle = "rgb(34, 34, 34)";
    this.c.fillRect(0, 0, this.screen.w, this.screen.h);
    this.c.restore();
};

/**
 * Static array describing the different levels
 */
JSPung.ballsByLevel = [
    [ // Level 1
	{
	    x: 500,
	    xspeed: 50,
	    life: 4
	}
    ], [ // Level 2
	{
	    x: 150,
	    xspeed: 100,
	    life: 4
	},
	{
	    x: 400,
	    xspeed: -50,
	    life: 3
	},
	{
	    x: 0,
	    xspeed: 30,
	    life: 0
	}
    ], [ // Level 3
	{
	    x: 50,
	    xspeed: 200,
	    life: 4
	},
	{
	    x: 400,
	    xspeed: -150,
	    life: 4
	}
    ]
];

/**
 * Init
 */
$(document).ready(
    function () {
	JSPung._ = new JSPung();
	JSPung._.makeLevel();
	JSPung._.startFps();
	JSPung._.animate();
    }
);
