var gamejs = require('gamejs');

gamejs.preload(['assets/samurai.png', 'assets/bg.jpg', 'assets/coin.png']);

gamejs.ready(function() { 
	var SCREEN_WIDTH = 800;
	var SCREEN_HEIGHT = 600;

	var display = gamejs.display.setMode([SCREEN_WIDTH, SCREEN_HEIGHT]);

	var end_stage = false;
	var background = new Background(gamejs, function() { end_stage = true; });
	var player = new Player(gamejs);
	var coins = [new Coin(gamejs, 760, 370)];
	var platforms = new Platforms(gamejs);

	gamejs.onTick(function(dt) {
		update(dt);
		draw();
	});

	function update(dt) {
	    background.update(dt);	
	    player.update(dt);

	    for(var i = 0; i < coins.length; i++) {
			coins[i].update(dt, end_stage);  
		}
	    check_coin_collision(player);

	    for(var i = 0; i < platforms.length; i++) {
			platforms[i].update(dt, end_stage);
		}
	    check_platform_collision(player);
	}

	function draw() {
		background.draw(display);
		for(var i = 0; i < platforms.length; i++) {
			platforms[i].draw(display);
		}
		for(var i = 0; i < coins.length; i++) {
			coins[i].draw(display);
		}
		player.draw(display);
	}

	function check_platform_collision(subject) {
		for(var i = 0; i < platforms.length; i++) {
			if(platforms[i].collidePoint(subject.rect().center[0], subject.rect().bottom)) {
				subject.on_platform(platforms[i].top());
				break;
			}
		}
	}

	function check_coin_collision(subject) {
		for(var i = 0; i < coins.length; i++) {
			if(coins[i].collideRect(subject.rect())) {
				console.log('point!');
			}
		}
	}
});