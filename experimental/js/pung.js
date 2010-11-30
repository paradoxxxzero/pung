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

/**
 * This class represents a pung game
 *
 * @author Mounier Florian
 * @constructor
 *
 */
var Pung = function (context) {
    this.balls = new Array();
    this.players = new Array();
    this.bullets = new Array();
    this.grapnels = new Array();
    this.objects = [this.balls, this.players, this.bullets, this.grapnels];
    this.context = context;
    this.time = new Date().getTime();
    this.maxBallLife = 4;
    this.colors = {
	balls: new Array(),
	bullet: $("div.bullet").css("color"),
	grapnel: $("div.grapnel").css("color"),
	player: $("div.player").css("color")
    };
    for (var p = 0 ; p <= this.maxBallLife ; p++) {
	this.colors.balls[p] = $("div.ball-" + p).css("color");
    }
};

/**
 * This method adds a ball to the game
 * @param ball The Ball to add
 */
Pung.prototype.addBall = function(ball) {
    this.balls.push(ball);
};

/**
 * This methods erases a ball from the game
 * @param ball The Ball to remove
 */
Pung.prototype.rmBall = function(ball) {
    this.balls.splice(this.balls.indexOf(ball), 1);
};

/**
 * This method adds a bullet to the game
 * @param bullet The Bullet to add
 */
Pung.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
};

/**
 * This methods erases a bullet from the game
 * @param bullet The Bullet to remove
 */
Pung.prototype.rmBullet = function(bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
};

/**
 * This method adds a grapnel to the game
 * @param grapnel The Grapnel to add
 */
Pung.prototype.addGrapnel = function(grapnel) {
    this.grapnels.push(grapnel);
};

/**
 * This methods erases a bullet from the game
 * @param bullet The Bullet to remove
 */
Pung.prototype.rmGrapnel = function(grapnel) {
    this.grapnels.splice(this.bullets.indexOf(grapnel), 1);
};

/**
 * This utility method creates a new ball with default values
 * @param x The initial ball abscissa
 * @param xspeed The initial ball horizontal speed
 * @param life The initial ball life
 */
Pung.prototype.makeBall = function(x, xspeed, life) {
    return new Ball(x, xspeed, life, this.colors.balls[life]);
};

/**
 * This method adds a player to the game
 * @param player The Player to add
 */
Pung.prototype.addPlayer = function(player) {
    this.players.push(player);
};

/**
 * This methods suppress a player from the game
 * @param player The Player to remove
 */
Pung.prototype.rmPlayer = function(player) {
    this.players.splice(this.players.indexof(player), 1);
};

/**
 * This utility method creates a new player with default values
 * @param x The initial player abscissa
 */
Pung.prototype.makePlayer = function(x, controls) {
    return new Player(x, controls, this.colors.player);
};

/**
 * This method makes the game
 * @param ball The Ball to add
 */
Pung.prototype.animate = function() {
    var _this = this;
    var c = this.context;
    $.each(this.players, function(i, player) {
	       if(player.controls.bullet.down) {
		   _this.addBullet(new Bullet(player.location.x, _screen.h - player.shape.h, _this.colors.bullet));
		   player.controls.bullet.down = false;
	       }
	       if(player.controls.grapnel.down) {
		   _this.addGrapnel(new Grapnel(player.location.x, _screen.h - player.shape.h, _this.colors.grapnel));
		   player.controls.grapnel.down = false;
	       }
	   });
    var dt = Math.min(new Date().getTime() - this.time, 50);
    $.each(this.objects, function(i, os) {
	       $.each(os, function(i, o) {
			  o.move(dt);
		      });
	   });
    $.each(this.objects, function(i, os) {
	       c.save();
	       $.each(os, function(i, o) {
			  o.render(c);
		      });
	       c.restore();
	   });
    this.time = new Date().getTime();
};
