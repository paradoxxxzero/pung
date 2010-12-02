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
 * This class represents a player
 * This constructor initializes the player with a default shape
 * @author Mounier Florian
 * @constructor
 * @param x The initial player abscissa
 * @param index The player index (1 for p1, 2 for p2, ...)
 * @param controls The keyboard keyCodes to control this player
 *
 */
var Player = function (x, index, controls) {
    this.shape = new Shape(20,40);
    this.location = new Location(
	x, JSPung._.screen.h - this.shape.h,
	new Speed(
	    500, 0,
	    new Acceleration(0, 0)
	)
    );
    this.index = index;
    this.controls = controls;
    this.color = Player.colors[index];
    this.score = 0;
    this.displayedScore = 0;
    this.shotsLeft = 2;
    this.$score = $(".score-" + this.index);
    this.$score.text("P" + this.index + ": " + this.score);
};

/**
 * Static max player number (for colors)
 */
Player.maxPlayers = 2;

/**
 * Static player colors
 */
Player.colors = new Array();
$(document).ready(function () {
		      for (var p = 0 ; p <= Player.maxPlayers ; p++) {
			  Player.colors[p] = $("div.player-" + p).css("color");
		      }
});

/**
 * This method moves the player
 * @param dt Time delta to compute move
 * @return true If the player must be destroyed
 */
Player.prototype.move = function(dt) {
    if(this.controls.right.down && this.location.x + this.shape.w / 2 < JSPung._.screen.w) {
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
    c.fillRect(Math.round(this.location.x - this.shape.w / 2),
	       Math.round(this.location.y),
	       this.shape.w,
	       this.shape.h);
};

/**
 * This method clip what was previously rendered
 * @param c The canvas context
 */
Player.prototype.clip = function(c) {
    var margin = 5;
    c.fillRect(Math.round(this.location.x - this.shape.w / 2 - margin),
	       Math.round(this.location.y - margin),
	       this.shape.w + 2 * margin,
	       this.shape.h + margin); // only one margin needed we don't need to clip out of the canvas
};

/**
 * This method tests if the player is colliding with the ball
 * @param ball The ball to test the collision with
 */
Player.prototype.isCollidingWith = function(ball) {
    var originalX = this.location.x;
    this.location.x -= this.shape.w / 2;
    // Approx collision by only computing the two top corners of the player :
    var colliding = this.location.distanceTo(ball.location) < ball.radius;
    this.location.x += this.shape.w;
    colliding = colliding || this.location.distanceTo(ball.location) < ball.radius;
    this.location.x = originalX;
    return colliding;
};

/**
 * This method updates the player score
 */
Player.prototype.increaseScore = function (deltaScore)  {
    if(this.displayedScore == this.score) {
	this.score += deltaScore;
	this.updateScore();
    } else {
	this.score += deltaScore;
    }
};

/**
 * This method updates the displayed score
 */
Player.prototype.updateScore = function ()  {
    this.displayedScore += 5;
    if(this.displayedScore > this.score) {
	this.displayedScore = this.score;
	this.$score.text("P" + this.index + ": " + this.score);
    } else {
	this.$score.text("P" + this.index + ": " + this.displayedScore);
	var _this = this;
	setTimeout(function () { _this.updateScore(); }, 20);
    }
};

Player.prototype.toString = function ()  {
    return "Player " + this.index + " " + this.location;
};
