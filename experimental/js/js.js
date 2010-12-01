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

var _screen, _keyboard;

$(document).ready(
    /**
     * Main function called when the document is ready
     * @author Mounier Florian
     */
    function () {
	var _canvas = $('#canvas')[0];
	var _c = _canvas.getContext('2d');
	var pungGame = new Pung(_c);
	_screen = new Screen(_canvas);
	_keyboard = new Keyboard(pungGame);

	$(window).resize(function (event) {_screen.resize(event);});
	$(window).keydown(function (event) {_keyboard.down(event);});
	$(window).keyup(function (event) {_keyboard.up(event);});

	pungGame.addBall(pungGame.makeBall(50, 200, Ball.maxLife));
	pungGame.addBall(pungGame.makeBall(400, -100, Ball.maxLife - 1));

	var leftPlayerSet = {
			   left: {
			       keyCode: 37,
			       down: false
			   },
			   right: {
			       keyCode: 39,
			       down: false
			   },
			   bullet: {
			       keyCode: 17,
			       down: false
			   },
			   grapnel: {
			       keyCode: 16,
			       down: false
			   }};
	var rightPlayerSet = {
			   left: {
			       keyCode: 68,
			       down: false
			   },
			   right: {
			       keyCode: 71,
			       down: false
			   },
			   bullet: {
			       keyCode: 65,
			       down: false
			   },
			   grapnel: {
			       keyCode: 81,
			       down: false
			   }};

	pungGame.addPlayer(pungGame.makePlayer(50, leftPlayerSet, 1));
	pungGame.addPlayer(pungGame.makePlayer(250, rightPlayerSet, 2));

	var _frames = 0;
	var displayFps = function() {
	    document.title = _frames + " fps";
	    _frames = 0;
	};
	setInterval(displayFps, 1000);

	var animate = function () {
	    _frames++;
	    _c.save();
	    _c.fillStyle = "rgb(34, 34, 34)";
	    _c.fillRect(0, 0, _screen.w, _screen.h);
	    _c.restore();
	    pungGame.animate();
	    setTimeout(animate, 5);
	};
	animate();
    }
);
