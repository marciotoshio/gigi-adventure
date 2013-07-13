var Vector2 = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	this.add = function(v) {
		this.x += v.x;
		this.y += v.y;

		return this;
	}

	this.multiply_scalar = function(s) {
		var v = new Vector2();
		v.x = this.x * s;
		v.y = this.y * s;
		return v;
	}

	this.to_array = function() {
		return [this.x, this.y];
	}
}