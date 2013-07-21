var GigiAnimation = function(gamejs) {
	this.sheetSpec = {map: [
		{x:1, y:27, w:82, h:192},
		{x:106, y:33, w:86, h:186},
		{x:212, y:36, w:74, h:178},
		{x:302, y:26, w:87, h:190},
		{x:402, y:113, w:99, h:102},
		{x:712, y:26, w:87, h:190},
		{x:815, y:36, w:74, h:178},
		{x:909, y:33, w:86, h:186},
		{x:1018, y:27, w:82, h:192}
	]};

	var spriteSheet = new SpriteSheet(gamejs, 'assets/gigi.png', this.sheetSpec);
	this.animation = new Animation(spriteSheet, {'walking_left': [0,3], 'duck': [4], 'walking_right': [5,8], 'stand': [0] }, 10);
	this.animation.start('stand');
}

var BackgroundAnimation = function(gamejs) {
	this.sheetSpec = {map: [{x:0, y:0, w:3200, h:600}]};

	var spriteSheet = new SpriteSheet(gamejs, 'assets/bg.jpg', this.sheetSpec);
	this.animation = new Animation(spriteSheet, {'scroll': [0]},  6);
	this.animation.start('scroll');
}

var Platforms = function(gamejs) {
	return [new Platform(gamejs, 150, 500 , 150, 25),
		new Platform(gamejs, 400, 400 , 150, 25),
		new Platform(gamejs, 650, 400 , 150, 25),
		new Platform(gamejs, 900, 400 , 150, 25),
		new Platform(gamejs, 1150, 400 , 150, 25),
		new Platform(gamejs, 1450, 400 , 150, 25),
		new Platform(gamejs, 1750, 400 , 150, 25),
		new Platform(gamejs, 2000, 400 , 150, 25),
		new Platform(gamejs, 2350, 400 , 150, 25),
		new Platform(gamejs, 2700, 400 , 150, 25),
		new Platform(gamejs, 2900, 450 , 150, 25)];
}

var CoinAnimation = function(gamejs) {
	this.sheetSpec = {width: 30, height: 30};

	var spriteSheet = new SpriteSheet(gamejs, 'assets/coin.png', this.sheetSpec);
	this.animation = new Animation(spriteSheet, {'spin': [0,15]},  6);
	this.animation.start('spin');
}

var SamuraiAnimation = function(gamejs) {
	this.sheetSpec = {map: [
		//stand
		{x:10, y:19, w:49, h:67},
		{x:65, y:20, w:49, h:66},
		{x:126, y:22, w:48, h:64},
		{x:184, y:20, w:49, h:66}, 
		//walking_left
		{x:17, y:99, w:52, h:61},
		{x:76, y:103, w:57, h:57},
		{x:138, y:99, w:56, h:61},
		{x:201, y:100, w:51, h:60},
		{x:259, y:103, w:49, h:57},
		{x:316, y:100, w:47, h:60},
		//duck
		{x:756, y:27, w:50, h:59},
		//attack
		{x:24, y:391, w:40, h:59},
		{x:82, y:393, w:38, h:57},
		{x:141, y:400, w:47, h:50},
		{x:199, y:376, w:76, h:79},
		{x:294, y:378, w:48, h:72},
		//jumping
		{x:17, y:473, w:51, h:68},
		{x:84, y:473, w:51, h:68},
		{x:154, y:470, w:50, h:59},
		//falling
		{x:220, y:462, w:48, h:79},
		{x:278, y:463, w:48, h:78},
		{x:338, y:482, w:50, h:59}, 
		//walking_right
		{x:45, y:271, w:46, h:59},
		{x:100, y:274, w:48, h:56},
		{x:156, y:271, w:50, h:59},
		{x:214, y:270, w:55, h:60},
		{x:275, y:274, w:56, h:56},
		{x:339, y:270, w:51, h:60},
	]};

	var spriteSheet = new SpriteSheet(gamejs, 'assets/samurai.png', this.sheetSpec);
	this.animation = new Animation(spriteSheet, {'stand': [0,3], 
		'walking_left': [4,9], 
		'duck': [10], 
		'attack': [11,15], 
		'jumping': [16,18], 
		'falling': [19,21],
		'walking_right': [22,27]},  6);
	this.animation.start('walking_right');
}