var Platform = function(gamejs, x, y, w, h) {
	var position = new Vector2(x, y);
	var velocity = new Vector2(-0.09, 0);
	var rect = new gamejs.Rect(x, y, w, h);

	this.top = function() { return rect.top; }

	this.collidePoint = function(x, y) {
		return rect.collidePoint(x, y);
	}

	this.update = function(dt, end_stage) {
		if(end_stage) velocity.x = 0;
		position.add(velocity.multiply_scalar(dt));
		rect.left = position.x;
	}

	this.draw = function(display) {
		gamejs.draw.rect(display, '#0000ff', rect, 0);
	}
}