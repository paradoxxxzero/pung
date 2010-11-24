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
 *
 * @constructor
 * @param location Initial location
 * @param shape Initial shape
 *
 */
var Player = function (location, shape) {
    this.location = location;
    this.shape = shape;
};

/**
 * This method moves the player
 * @param dt Time delta to compute move
 */
Player.prototype.move = function(dt) {
    if(_keyboard.right && this.location.x + this.shape.w / 2 < _scr.w) {
	this.location.move(dt);
    }
    if(_keyboard.left && this.location.x - this.shape.w / 2 > 0) {
	this.location.moveBackwards(dt);
    }
};
/**
 * This method renders the player
 * @param c The canvas context
 */
Player.prototype.render = function(c) {
    c.shadowBlur = 5;
    c.shadowColor = _colors.player;
    c.fillStyle = _colors.player;
    c.fillRect(this.location.x - this.shape.w / 2, _scr.h - this.shape.h, this.shape.w, this.shape.h);
};

