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
 * This class represents the screen
 *
 * @author Mounier Florian
 * @constructor
 * @param canvas The canvas element
 *
 */
var Screen = function (canvas) {
    this.canvas = canvas;
    this.w = canvas.width = 800;//window.innerWidth;
    this.h = canvas.height = 600; //window.innerHeight;
};

/**
 * This method refresh the canvas on resize
 * Unused since we use fixed size now
 */
Screen.prototype.resize = function() {
    this.w = this.canvas.width = window.innerWidth;
    this.h = this.canvas.height = window.innerHeight;
    // Background initialisation
    var context = this.canvas.getContext('2d');
    //TODO clip
    context.save();
    context.fillStyle = "rgba(34, 34, 34, 1)";
    context.fillRect(0, 0, this.w, this.h);
    context.restore();
};

Screen.prototype.toString = function ()  {
    return "Scr{w: " + this.w + ", h:" + this.h + "} ";
};
