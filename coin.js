var Coin = function (gamejs, x, y) {
	var position = new Vector2(x, y);
	var velocity = new Vector2(-0.09, 0);
	var rect = new gamejs.Rect(x, y, 30, 30);
	var coin_animation = new CoinAnimation(gamejs);
	var enabled = true;

	this.collideRect = function(subjectRect) {
		if(enabled && rect.collideRect(subjectRect)) {
			velocity.y = -0.3;
			enabled = false;
			return true;
		}
		return false;
	}

	this.update = function(dt, end_stage) {
		if(end_stage) velocity.x = 0;
		coin_animation.animation.update(dt);
		position.add(velocity.multiply_scalar(dt));
		rect.left = position.x;
	}

	this.draw = function(display) {
		display.blit(coin_animation.animation.image(), position.to_array());
	}
}
