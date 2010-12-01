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
 * This class represents the keyboard and handle key states
 *
 * @author Mounier Florian
 * @constructor
 * @param pung The pung game controlled by the keyboard
 *
 */
var Keyboard = function (pung) {
    this.pung = pung;
};

/**
 * This method handle a key down
 */
Keyboard.prototype.down = function(event) {
    $.each(this.pung.players, function (i, player) {
	       $.each(player.controls, function (k, o) {
			  if(event.keyCode == o.keyCode) {
			      o.down = true;
			  }
		      });
	   });
};

/**
 * This method handle a key up
 */
Keyboard.prototype.up = function(event) {
    $.each(this.pung.players, function (i, player) {
	       $.each(player.controls, function (k, o) {
			  if(event.keyCode == o.keyCode) {
			      o.down = false;
			  }
		      });
	   });
};

Keyboard.prototype.toString = function ()  {
    return "Keyboard";
};
