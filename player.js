var Player = function (gamejs) {
	var state = 'stand';
	var position = new Vector2(0, 0);
	var velocity = new Vector2(0, 0);
	var rect = new gamejs.Rect(0, 0);
	var gravity = new Vector2(0, 0.002);
	var jump_limit = 155;
	var start_jump_position = 0;
	var player_animation = new SamuraiAnimation(gamejs);
	var points = 0;
	
	gamejs.onEvent(function(event) {
		if(event.type == gamejs.event.KEY_DOWN) {
			switch(event.key) {
				case gamejs.event.K_DOWN: duck();
					break;
				case gamejs.event.K_UP: jump();
					break;
				case gamejs.event.K_LEFT: walk_left();
					break;
				case gamejs.event.K_RIGHT: walk_right();
					break;
				case gamejs.event.K_SPACE: attack();
					break;
				default: stand();
					break;
			}
		}

		if(event.type == gamejs.event.KEY_UP) {
			if(is_walking_right() || is_walking_left()) stand();
		}
	});

	function walk_right() {
		set_state('walking_right');
		velocity.x = 0.3;
	}

	function is_walking_right() {
		return state == 'walking_right';
	}

	function walk_left() {
		set_state('walking_left');
		velocity.x = -0.3;
	}

	function is_walking_left() {
		return state == 'walking_left';
	}

	function stand() {
		set_state('walking_right');
		velocity.x = 0;
	}

	function jump() {
		if(!is_jumping()) start_jump_position = position.y;
		if(!is_jumping() && !is_fallling()) velocity.y = -0.8;
		set_state('jumping');
	}

	function is_jumping() {
		return state == 'jumping';
	}

	function duck() {
		set_state('duck');
	}

	function attack() {
		set_state('attack', function(){ stand();});
	}

	function falling() {
		set_state('falling');
	}

	function is_fallling() {
		return state == 'falling';
	}

	function set_state(s, callback) {
		if(state != s) {
			player_animation.animation.start(s, callback);
			state = s;
		}
	}

	this.on_platform = function(platformY) {
		if(platformY) {
			velocity.y = 0;
			position.y = platformY - current_frame_height();
		}
	}

	this.rect = function() {
		return rect;
	}

	this.point = function(point) {
		points += point;
	}

	this.score = function() { return points; }

	this.update = function(dt) {
		player_animation.animation.update(dt);
		position.add(velocity.multiply_scalar(dt));
		velocity.add(gravity.multiply_scalar(dt));
		rect.x = position.x;
		rect.y = position.y;
		rect.width = current_frame_width();
		rect.height = current_frame_height();
		keep_limits();
	}

	function keep_limits() {
		if(position.x < 0) { 
			position.x = 0;
		}
		if(position.y < 0) {
			position.y = 0;
		}

		var x_limit = gamejs.display.getSurface().canvas.width - current_frame_width();
		if(position.x > x_limit) {
			position.x = x_limit;
		}

		var y_limit = gamejs.display.getSurface().canvas.height - current_frame_height();
		if(position.y > y_limit) {
			position.y = y_limit;
			if(is_fallling()) stand();
		}

		if(is_jumping() && position.y < start_jump_position - jump_limit) {
			falling();
		}
	}

	function current_frame_width() {
		return player_animation.sheetSpec.map[player_animation.animation.currentFrame()].w;
	}

	function current_frame_height() {
		return player_animation.sheetSpec.map[player_animation.animation.currentFrame()].h
	}

	this.draw = function(display) {
		display.blit(player_animation.animation.image(), position.to_array());
	}
}
