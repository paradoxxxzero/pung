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
 * This class represents a bullet
 *
 * @author Mounier Florian
 * @constructor
 * @param player The player who shot this bullet
 *
 */

var Bullet = function (player) {
    this.location = new Location(
	player.location.x, Jspung._.screen.h - player.shape.h,
	new Speed(
	    0, -2000,
	    new Acceleration(0, 0)
	));
    this.shape = new Shape(2, 10);
    this.color = Bullet.colors[player.index];
    this.player = player;
};

/**
 * Static bullet colors
 */
Bullet.colors = new Array();
$(document).ready(function () {
		      for (var p = 0 ; p <= Player.maxPlayers ; p++) {
			  Bullet.colors[p] = $("div.bullet-" + p).css("color");
		      }
		  });

/**
 * This method moves the bullet
 * @param dt Time delta to compute move
 * @return true If the bullet must be destroyed
 */
Bullet.prototype.move = function(dt) {
    this.location.move(dt);
    return this.location.y < 0;
};

/**
 * This method renders the bullet
 * @param c The canvas context
 */
Bullet.prototype.render = function(c) {
    c.shadowBlur = 5;
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.fillRect(Math.round(this.location.x - this.shape.w / 2),
	       Math.round(this.location.y),
	       this.shape.w,
	       this.shape.h);
};

/**
 * This method clip what was previously rendered
 * @param c The canvas context
 */
Bullet.prototype.clip = function(c) {
    var margin = 5;
    c.fillRect(Math.round(this.location.x - this.shape.w / 2 - margin),
	       Math.round(this.location.y - margin),
	       this.shape.w + 2 * margin,
	       this.shape.h + 2 * margin);
};

/**
 * This method tests if the bullet is colliding with the ball
 * @param ball The ball to test the collision with
 */
Bullet.prototype.isCollidingWith = function(ball) {
    return this.location.distanceTo(ball.location) < ball.radius;
};


Bullet.prototype.toString = function ()  {
    return "Bullet " + this.location;
};