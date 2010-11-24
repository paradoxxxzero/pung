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
 * This class represents a simple ball
 *
 * @author Mounier Florian 
 * @constructor
 * @param location Initial location
 * @param life Life of the ball defines how many hit remains before the ball dies
 *
 */

var Ball = function (location, life) {
    this.location = location;
    this.life = life;

};

/**
 * Static sizes for balls life
 */
Ball.prototype.sizes = [6.25, 12.5, 25, 50, 100];

/**
 * This method moves the ball
 * @param dt Time delta to compute move
 * @return true If the ball must be destroyed
 */
Ball.prototype.move = function(dt) {
    this.location.move(dt);
    if(this.location.x + this.radius() > _scr.w) {
	this.location.x = _scr.w - this.radius();
	this.location.speed.x *= -1;
    } else if(this.location.x - this.radius() < 0) {
	this.location.x = this.radius();
	this.location.speed.x *= -1;
    }
    if(this.location.y + this.radius() > _scr.h) {
	this.location.y = _scr.h - this.radius();
	this.location.speed.y *= -1;
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
    c.shadowColor = _colors.balls[this.life];
    c.fillStyle = _colors.balls[this.life];
    c.arc(this.location.x, this.location.y, this.radius(), 0, 2 * Math.PI, false);
    c.fill();
};

/**
 * This method return the ball radius which depends the ball life
 */
Ball.prototype.radius = function() {
    return this.sizes[this.life];
};

