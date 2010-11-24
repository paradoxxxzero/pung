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
 * This class represents a bullet
 *
 * @author Mounier Florian 
 * @constructor
 * @param location Initial location
 * @param shape The bullet shape
 *
 */

var Bullet = function (location, shape) {
    this.location = location;
    this.shape = shape;

};

/**
 * This method moves the bullet
 * @param dt Time delta to compute move
 * @return true If the bullet must be destroyed
 */
Bullet.prototype.move = function(dt) {
    this.location.move(dt);
    return this.location.y > 0;
};

/**
 * This method renders the bullet
 * @param c The canvas context
 */
Bullet.prototype.render = function(c) {
    c.shadowBlur = 5;
    c.shadowColor = _colors.bullet;
    c.fillStyle = _colors.bullet;
    c.fillRect(this.location.x - this.shape.w / 2, this.location.y, this.shape.w, this.shape.h);
};
