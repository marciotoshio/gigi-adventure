var gamejs = require('gamejs');

gamejs.preload(['assets/samurai.png']);

gamejs.ready(function() { 
	var SCREEN_WIDTH = 800;
	var SCREEN_HEIGHT = 300;

	var display = gamejs.display.setMode([SCREEN_WIDTH, SCREEN_HEIGHT]);

	var player = new Player(gamejs);

	gamejs.onTick(function(dt) {
		update(dt);
		display.clear();
		draw();
	});

	function update(dt) {
	    player.update(dt);
	}


	function draw() {
		player.draw(display);
	}
});