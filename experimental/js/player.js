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
 * This class represents a player
 * This constructor initializes the player with a default shape
 * @author Mounier Florian
 * @constructor
 * @param x The initial player abscissa
 * @param controls The keyboard keyCodes to control this player
 *   example:
 * @param color The player color
 *
 */
var Player = function (x, controls, color) {
    this.location = new Location(
	x, _screen.h,
	new Speed(
	    500, 0,
	    new Acceleration(0, 0)
	)
    );
    this.shape = new Shape(20,40);
    this.controls = controls;
    this.color = color;
};

/**
 * This method moves the player
 * @param dt Time delta to compute move
 * @return true If the player must be destroyed
 */
Player.prototype.move = function(dt) {
    if(this.controls.right.down && this.location.x + this.shape.w / 2 < _screen.w) {
	this.location.move(dt);
    }
    if(this.controls.left.down && this.location.x - this.shape.w / 2 > 0) {
	this.location.moveBackwards(dt);
    }
    return false;
};
/**
 * This method renders the player
 * @param c The canvas context
 */
Player.prototype.render = function(c) {
    c.shadowBlur = 5;
    c.shadowColor = this.color;
    c.fillStyle = this.color;
    c.fillRect(this.location.x - this.shape.w / 2, _screen.h - this.shape.h, this.shape.w, this.shape.h);
};

