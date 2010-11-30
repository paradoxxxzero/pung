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
 * This class represents a grapnel
 *
 * @author Mounier Florian
 * @constructor
 * @param x Initial abscissa
 * @param y Initial ordinate
 * @param color The grapnel color
 *
 */

var Grapnel = function (x, y, color) {
    this.location = new Location(
	x, y,
	new Speed(
	    0, -1000,
	    new Acceleration(0, 0)
	));
    this.shape = new Shape(4, 0);
    this.color = color;

};

/**
 * This method moves the grapnel
 * @param dt Time delta to compute move
 * @return true If the grapnel must be destroyed
 */
Grapnel.prototype.move = function(dt) {
    this.location.move(dt);
    return this.location.y < 0;
};

/**
 * This method renders the bullet
 * @param c The canvas context
 */
Grapnel.prototype.render = function(c) {
    c.shadowBlur = 5;
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.fillRect(this.location.x - this.shape.w / 2, this.location.y, this.shape.w, _screen.h - this.location.y);
};

/**
 * This method tests if the grapnel is colliding with the ball
 * @param ball The ball to test the collision with
 */
Grapnel.prototype.isCollidingWith = function(ball) {
    return this.location.distanceTo(ball.location) < ball.radius()
	|| (
	    ball.location.x - ball.radius() < this.location.x
		&& ball.location.x + ball.radius() > this.location.x && ball.location.y > this.location.y
	);
};

Grapnel.prototype.toString = function ()  {
    return "Grapnel " + this.location;
};