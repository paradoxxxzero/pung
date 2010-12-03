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
 * This class represents a grapnel
 *
 * @author Mounier Florian
 * @constructor
 * @param player The player who shot this grapnel
 *
 */

var Grapnel = function (player) {
    this.location = new Location(
	player.location.x, Jspung._.screen.h,
	new Speed(
	    0, -1000,
	    new Acceleration(0, 0)
	));
    this.shape = new Shape(4, 0);
    this.color = Grapnel.colors[player.index];
    this.player = player;
};

/**
 * Static grapnels colors
 */
Grapnel.colors = new Array();
$(document).ready(function () {
		      for (var p = 0 ; p <= Player.maxPlayers ; p++) {
			  Grapnel.colors[p] = $("div.grapnel-" + p).css("color");
		      }
		  });
/**
 * This method moves the grapnel
 * @param dt Time delta to compute move
 * @return true If the grapnel must be destroyed
 */
Grapnel.prototype.move = function(dt) {
    this.location.move(dt);
    if(this.location.y < 0) {
	this.player.shotsLeft++;
	return true;
    }
    return false;
};

/**
 * This method renders the bullet
 * @param c The canvas context
 */
Grapnel.prototype.render = function(c) {
    c.shadowBlur = 5;
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.fillRect(Math.round(this.location.x - this.shape.w / 2),
	       Math.round(this.location.y),
	       this.shape.w,
	       Jspung._.screen.h - this.location.y);
};

/**
 * This method clip what was previously rendered
 * @param c The canvas context
 */
Grapnel.prototype.clip = function(c) {
    var margin = 10;
    c.fillRect(Math.round(this.location.x - this.shape.w / 2 - margin),
	       Math.round(this.location.y - margin),
	       this.shape.w + 2 * margin,
	       Jspung._.screen.h - this.location.y + margin); // only one margin needed we don't need to clip out of the canvas
};

/**
 * This method tests if the grapnel is colliding with the ball
 * @param ball The ball to test the collision with
 */
Grapnel.prototype.isCollidingWith = function(ball) {
    return this.location.distanceTo(ball.location) < ball.radius
	|| (
	    ball.location.x - ball.radius < this.location.x
		&& ball.location.x + ball.radius > this.location.x && ball.location.y > this.location.y
	);
};

Grapnel.prototype.toString = function ()  {
    return "Grapnel " + this.location;
};