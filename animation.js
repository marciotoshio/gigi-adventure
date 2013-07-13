var Animation = function(spriteSheet, animationSpec, fps) {
	var fps = fps || 6;
	var frameDuration = 1000 / fps;
	var currentFrame = null;
	var currentFrameDuration = 0;
	var currentAnimation = null;
	var loopFinished = false;
	var image = null;
	var lastFrameCallback = null;

	this.currentFrame = function() { return currentFrame; }
	this.image = function() { return image; }

	this.start = function(animation, callback) {
		currentAnimation = animation;
		currentFrame = animationSpec[currentAnimation][0];
		currentFrameDuration = 0;
		lastFrameCallback = callback;
		this.update(0);
	};

	this.update = function(dt) {
		if (!currentAnimation) {
			throw new Error('No animation started. call start("fooCycle") before updating');
		}

		currentFrameDuration += dt;
		if (currentFrameDuration >= frameDuration) {
			currentFrame++;
			currentFrameDuration = 0;

			// loop back to first frame if animation finished or single frame
			var aniSpec = animationSpec[currentAnimation];
			if (aniSpec.length == 1 || currentFrame > aniSpec[1]) {
				loopFinished = true;
				// unless third argument is false, which means: do not loop
				if (aniSpec.length === 3 && aniSpec[2] === false) {
					currentFrame--;
				} else {
					currentFrame = aniSpec[0];
				}
				if(lastFrameCallback) lastFrameCallback();
			}
		}

		image = spriteSheet.get(currentFrame);
		return;
	};
}