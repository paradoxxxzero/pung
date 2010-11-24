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
 * This class represents a pung game
 * 		
 * @constructor
 *
 */
var Pung = function (context) {
    this.balls = new Array();
    this.players = new Array();
    this.context = context;
    this.time = new Date().getTime();
};

/**
 * This method adds a ball to the game
 * @param ball The Ball to add
 */
Pung.prototype.addBall = function(ball) {
	this.balls.push(ball);
};

/**
 * This methods erases a ball from the game
 * @param ball The Ball to remove
 */
Pung.prototype.rmBall = function(ball) {
	this.balls.splice(this.balls.indexOf(ball), 1);
};

/**
 * This method adds a player to the game
 * @param player The Player to add
 */
Pung.prototype.addPlayer = function(player) {
	this.players.push(player);
};

/**
 * This methods suppress a player from the game
 * @param player The Player to remove
 */
Pung.prototype.rmPlayer = function(player) {
	this.players.splice(this.players.indexof(player), 1);
};

/**
 * This method animates the game
 * @param ball The Ball to add
 */
Pung.prototype.animate = function() {
    _frames++;
    var dt = Math.min(new Date().getTime() - this.time, 50);

     $.each(this.balls, function(i, ball) {
	 ball.move(dt);
     });

     $.each(this.balls, function(i, ball) {
	 ball.render(this.context);
     });

    this.time = new Date().getTime();
    setTimeout(this.animate, _step);	
};
