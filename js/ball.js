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
 * This class represents a simple ball
 * This constructor initialize y speed to 0 and acceleration to standard gravity acceleration
 *
 * @author Mounier Florian
 * @constructor
 * @param x The initial ball abscissa
 * @param xspeed The initial ball horizontal speed
 * @param life Life of the ball defines how many hit remains before the ball dies
 *
 */

var Ball = function (x, xspeed, life) {
    this.life = life;
    this.location = new Location(
	x, Jspung._.screen.h * Ball.heights[this.life],
	new Speed(
	    xspeed, 0,
	    new Acceleration(0, 400)
	));
    this.radius = Ball.sizes[life];
    this.color = Ball.colors[life];
};

/**
 * Static sizes for balls life
 */
Ball.sizes = [5, 10, 25, 50, 75];

/**
 * Static max heights for balls
 */
Ball.heights = [.75, .625, .5, .25, .125];

/**
 * Static max life for balls
 */
Ball.maxLife = 4;

/**
 * Static balls colors
 */
Ball.colors = new Array();
$(document).ready(function () {
		      for (var l = 0 ; l <= Ball.maxLife ; l++) {
			  Ball.colors[l] = $("div.ball-" + l).css("color");
		      }
		  });
/**
 * This method moves the ball
 * @param dt Time delta to compute move
 * @return true If the ball must be destroyed
 */
Ball.prototype.move = function(dt) {
    this.location.move(dt);
    if(this.location.x + this.radius > Jspung._.screen.w) {
	this.location.x = Jspung._.screen.w - this.radius;
	this.location.speed.x *= -1;
    } else if(this.location.x - this.radius < 0) {
	this.location.x = this.radius;
	this.location.speed.x *= -1;
    }
    if(this.location.y + this.radius > Jspung._.screen.h) {
	this.location.y = Jspung._.screen.h - this.radius;
	this.location.speed.y *= -1.01242;
    }
    return false;
};

/**
 * This method renders the ball
 * @param c The canvas context
 */
Ball.prototype.render = function(c) {
    c.beginPath();
    c.shadowBlur = 10;
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.arc(Math.round(this.location.x), Math.round(this.location.y), this.radius, 0, 2 * Math.PI, false);
    c.fill();
};

/**
 * This method clip what was previously rendered
 * @param c The canvas context
 */
Ball.prototype.clip = function(c) {
    var margin = 8;
    c.fillRect(Math.round(this.location.x - this.radius - margin),
	       Math.round(this.location.y - this.radius - margin),
	       2 * (margin + this.radius),
	       2 * (margin + this.radius));
};

/**
 * This method forks a ball after a collision
 * @return an object with the two forked balls one .left and one .right or null if this ball has no more life
 */
Ball.prototype.fork = function() {
    if(this.life == 0) return null;
    var left = new Ball(this.location.x, -this.location.speed.x, this.life - 1, this.color);
    var right = new Ball(this.location.x, this.location.speed.x, this.life - 1, this.color);
    return {left: left, right: right};
};

Ball.prototype.toString = function ()  {
    return "Ball R:" + this.radius + " V:" + this.life + " " + this.location;
};
