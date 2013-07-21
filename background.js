var Background = function(gamejs, endCallback) {
	var position = new Vector2(0, 0);
	var velocity = new Vector2(-0.09, 0);
	var bg_animation = new BackgroundAnimation(gamejs);

	this.update = function(dt) {
		if(position.x < -3200 + gamejs.display.getSurface().canvas.width) {
			velocity.x = 0;
			endCallback();
		} 
		bg_animation.animation.update(dt);
		position.add(velocity.multiply_scalar(dt));
	}

	this.draw = function(display) {
		display.blit(bg_animation.animation.image(), position.to_array());
	}
}