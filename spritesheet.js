var SpriteSheet = function(gamejs, imagePath, sheetSpec) {
	this.get = function(id) {
	  return surfaceCache[id];
	};

	var image = gamejs.image.load(imagePath);
	var surfaceCache = [];

	if(sheetSpec.map) {
		createFromMap();
	} else {
		createRegular();
	}

	function createFromMap() {
		for(var i=0; i<sheetSpec.map.length; i++) {
			var width = sheetSpec.map[i].w;
			var height = sheetSpec.map[i].h;
			var imgRect = new gamejs.Rect([0,0],[width, height]);
			createSurface(sheetSpec.map[i].x, sheetSpec.map[i].y, width, height, imgRect);
		}
	}

	function createRegular() {
		var width = sheetSpec.width;
		var height = sheetSpec.height;
		var imgRect = new gamejs.Rect([0,0],[width,height]);
		// extract the single images from big spritesheet image
		for (var i=0; i<image.rect.width; i+=width) {
			for (var j=0;j<image.rect.height;j+=height) {
				createSurface(i, j, width, height, imgRect);
		  }
		}
	}

	function createSurface(x, y, w, h, imgRect) {
		var surface = new gamejs.Surface([w, h]);
		var rect = new gamejs.Rect(x, y, w, h);
		surface.blit(image, imgRect, rect);
		surfaceCache.push(surface);
	}
};