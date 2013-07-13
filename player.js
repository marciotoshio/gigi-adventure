var Player = function (gamejs, image) {
	var state = 'stand';
	var position = new Vector2(0, 0);
	var velocity = new Vector2(0, 0);
	var gravity = new Vector2(0, 0.003);
	var jump_limit = 155;
	var start_jump_position = 0;
	var player_animation = new SamuraiAnimation(gamejs);
	
	gamejs.onEvent(function(event) {
		if(event.type == gamejs.event.KEY_DOWN) {
			switch(event.key) {
				case gamejs.event.K_DOWN: duck();
					break;
				case gamejs.event.K_UP: jump();
					break;
				case gamejs.event.K_LEFT: left();
					break;
				case gamejs.event.K_RIGHT: right();
					break;
				case gamejs.event.K_SPACE: attack();
					break;
				default: stand();
					break;
			}
		}

		if(event.type == gamejs.event.KEY_UP) {
			if(state == 'walking_right' || state == 'walking_left') stand();
		}
	});

	function right() {
		set_state('walking_right');
		velocity.x = 0.3;
	}

	function left() {
		set_state('walking_left');
		velocity.x = -0.3;
	}

	function stand() {
		set_state('stand');
		velocity.x = 0;
	}

	function jump() {
		if(state != 'jumping') start_jump_position = position.y;
		if(state != 'jumping' && state != 'falling') velocity.y = -1;
		set_state('jumping');
	}

	function duck() {
		set_state('duck');
	}

	function attack() {
		set_state('attack', function(){ stand();});
	}

	function set_state(s, callback) {
		if(state != s) {
			player_animation.animation.start(s, callback);
			state = s;
		}
	}

	this.update = function(dt) {
		player_animation.animation.update(dt);
		position.add(velocity.multiply_scalar(dt));
		velocity.add(gravity.multiply_scalar(dt));
		keep_limits();	
	}

	function keep_limits() {
		if(position.x < 0) { 
			position.x = 0;
		}
		if(position.y < 0) {
			position.y = 0;
		}

		var x_limit = gamejs.display.getSurface().canvas.width - player_animation.sheetSpec.map[player_animation.animation.currentFrame()].w;
		if(position.x > x_limit) {
			position.x = x_limit;
		}

		var y_limit = gamejs.display.getSurface().canvas.height - player_animation.sheetSpec.map[player_animation.animation.currentFrame()].h;
		if(position.y > y_limit) {
			position.y = y_limit;
			if(state == 'falling') stand();
		}

		if(state == 'jumping' && position.y < start_jump_position - jump_limit) {
			set_state('falling');
		}
	}

	this.draw = function(display) {
		display.blit(player_animation.animation.image(), position.to_array());
	}
}