var gamejs = require('gamejs');

gamejs.preload(['assets/samurai.png', 'assets/bg.jpg']);

gamejs.ready(function() { 
	var SCREEN_WIDTH = 800;
	var SCREEN_HEIGHT = 600;

	var display = gamejs.display.setMode([SCREEN_WIDTH, SCREEN_HEIGHT]);

	var background = new Background(gamejs);
	var player = new Player(gamejs);

	gamejs.onTick(function(dt) {
		update(dt);
		display.clear();
		draw();
	});

	function update(dt) {
	    background.update(dt);
	    player.update(dt);
	}


	function draw() {
		background.draw(display);
		player.draw(display);
	}
});