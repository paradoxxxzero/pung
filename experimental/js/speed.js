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
 * This class represents a speed for a location
 * 		
 * @constructor
 * @param x Initial speed abscissa
 * @param y Initial speed ordinate
 * @param acceleration Location acceleration
 *
 */
var Speed = function (x, y, acceleration) {
    this.x = x;
    this.y = y;
    this.acceleration = acceleration;
};

/**
 * This method compute the speed change in dt ms depending on the acceleration
 * @param dt Time delta to compute acceleration
 */
Speed.prototype.accelerate = function (dt) {
	this.x += (this.acceleration.x * dt) / 1000;
	this.y += (this.acceleration.y * dt) / 1000;
};