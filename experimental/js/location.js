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
 * This class represents a geometric location
 *
 * @author Mounier Florian 
 * @constructor
 * @param x Initial abscissa
 * @param y Initial ordinate
 * @param speed Location speed
 *
 */
var Location = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
};

/**
 * This method computes the location change in dt ms depending on the speed and the acceleration
 * @param dt Time delta to compute move
 */
Location.prototype.move = function(dt) {
    this.speed.accelerate(dt);
    this.x += (this.speed.x * dt) / 1000;
    this.y += (this.speed.y * dt) / 1000;
};
/**
 * This method is similar to move but move backwards
 * @param dt Time delta to compute move
 */
Location.prototype.moveBackwards = function(dt) {
    this.speed.accelerate(dt);
    this.x -= (this.speed.x * dt) / 1000;
    this.y -= (this.speed.y * dt) / 1000;
};
