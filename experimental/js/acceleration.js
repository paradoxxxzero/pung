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
 * This class represents an acceleration for a location
 *
 * @author Mounier Florian
 * @constructor
 * @param x Initial acceleration abscissa
 * @param y Initial acceleration ordinate
 *
 */
var Acceleration = function (x, y) {
    this.x = x;
    this.y = y;
};

Acceleration.prototype.toString = function ()  {
    return "A{x: " + this.x + ", y:" + this.y + "}";
};