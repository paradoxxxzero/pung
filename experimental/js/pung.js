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
 * This class represents a pung game
 *
 * @author Mounier Florian
 * @constructor
 * @param context The 2d canvas context
 *
 */
var Pung = function (context) {
    this.balls = new Array();
    this.players = new Array();
    this.bullets = new Array();
    this.grapnels = new Array();
    this.objects = [this.balls, this.bullets, this.grapnels, this.players];
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
 * This method adds a bullet to the game
 * @param bullet The Bullet to add
 */
Pung.prototype.addBullet = function(bullet) {
    this.bullets.push(bullet);
};

/**
 * This methods erases a bullet from the game
 * @param bullet The Bullet to remove
 */
Pung.prototype.rmBullet = function(bullet) {
    this.bullets.splice(this.bullets.indexOf(bullet), 1);
};

/**
 * This method adds a grapnel to the game
 * @param grapnel The Grapnel to add
 */
Pung.prototype.addGrapnel = function(grapnel) {
    this.grapnels.push(grapnel);
};

/**
 * This methods erases a bullet from the game
 * @param bullet The Bullet to remove
 */
Pung.prototype.rmGrapnel = function(grapnel) {
    this.grapnels.splice(this.bullets.indexOf(grapnel), 1);
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
 * This method makes the game
 *
 * @param ball The Ball to add
 * @return True if the game goes on
 *         False if the players won this level
 *         Null if the level is lost
 */
Pung.prototype.animate = function() {
    var _this = this;
    var c = this.context;

    // Handle player action (bullets, grapnels...)
    $.each(this.players, function(i, player) {
	       if(player.controls.bullet.down) {
		   _this.addBullet(new Bullet(player));
		   player.controls.bullet.down = false;
	       }
	       if(player.controls.grapnel.down) {
		   _this.addGrapnel(new Grapnel(player));
		   player.controls.grapnel.down = false;
	       }
	   });

    // Move all objects

    // This array stores an object containing the object to destroy and his array
    var toBeDestroyed = [];
    var dt = Math.min(new Date().getTime() - this.time, 50);
    $.each(this.objects, function(i, os) {
	       $.each(os, function(j, o) {
			  if(o.move(dt)) {
			      toBeDestroyed.push({os: os, o: o});
			  }
		      });
	   });

    // Handling ball collision with bullets or grapnels
    $.each(this.balls, function(i, ball) {
	       $.each(_this.bullets, function(j, bullet) {
			  if(bullet.isCollidingWith(ball)) {
			      bullet.player.increaseScore(50);
			      toBeDestroyed.push({os: _this.balls, o: ball});
			      toBeDestroyed.push({os: _this.bullets, o: bullet});
			      var forks = ball.fork();
			      if(forks != null) {
				  _this.balls.push(forks.left);
				  _this.balls.push(forks.right);
			      }
			  }
		      });
	       $.each(_this.grapnels, function(j, grapnel) {
			  if(grapnel.isCollidingWith(ball)) {
			      grapnel.player.increaseScore(100);
			      toBeDestroyed.push({os: _this.balls, o: ball});
			      toBeDestroyed.push({os: _this.grapnels, o: grapnel});
			      var forks = ball.fork();
			      if(forks != null) {
				  _this.balls.push(forks.left);
				  _this.balls.push(forks.right);
			      }
			  }
		      });
	       $.each(_this.players, function(j, player) {
			  if(player.isCollidingWith(ball)) {
			      toBeDestroyed.push({os: _this.players, o: player});
			  }
		      });
	   });

    // Remove destroyed objects
    $.each(toBeDestroyed, function(i, oz) {
	       oz.os.splice(oz.os.indexOf(oz.o), 1);
	   });

    // Render all objects
    $.each(this.objects, function(i, os) {
	       c.save();
	       $.each(os, function(j, o) {
			  o.render(c);
		      });
	       c.restore();
	   });

    // Test end of level
    if(this.balls.length == 0) {
	return false;
    }
    if(this.players.length == 0) {
	return null;
    }
    this.time = new Date().getTime();
    return true;
};


Pung.prototype.toString = function ()  {
    return "Pung game";
};
