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

	pungGame.addBall(pungGame.makeBall(50, 200, pungGame.maxBallLife));
	pungGame.addBall(pungGame.makeBall(400, -100, pungGame.maxBallLife - 1));

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

	pungGame.addPlayer(pungGame.makePlayer(50, leftPlayerSet));
	pungGame.addPlayer(pungGame.makePlayer(250, rightPlayerSet));

	var _frames = 0;
	var displayFps = function() {
	    document.title = _frames + " fps";
	    _frames = 0;
	};
	setInterval(displayFps, 1000);

	var animate = function () {
	    _frames++;
	    _c.save();
	    _c.fillStyle = "rgba(34, 34, 34, 0.5)";
	    _c.fillRect(0, 0, _screen.w, _screen.h);
	    _c.restore();
	    pungGame.animate();
	    setTimeout(animate, 5);
	};
	animate();
    }
);
