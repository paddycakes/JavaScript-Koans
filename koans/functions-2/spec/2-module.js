/*global describe, expect, it*/
//refactor this so that object with mapping is not created every time (i.e. it is created at most once)
//however, make sure nothing else goes into global namespace (except colorLookup function)
var colorLookup = (function () {

	var colorMap = {
		'red': 0xFF0000,
		'green': 0x00FF00,
		'blue': 0x0000FF
	};

	return function(color) {
		return colorMap[color];
	}
/*	return {
		'red': 0xFF0000,
		'green': 0x00FF00,
		'blue': 0x0000FF
	}[colorString];*/
})();

(function () {

	var colorMap = {
		'red': 0xFF0000,
		'green': 0x00FF00,
		'blue': 0x0000FF
	};

	window.colorLookup = colorMap[color];
})();

//test should remain the same
describe('Module pattern', function () {
	it('1 - should understand revealing module pattern', function () {
		expect(colorLookup('red')).toBe(0xFF0000);
		expect(colorLookup('green')).toBe(0x00FF00);
		expect(colorLookup('unknown color')).toBeUndefined();
	});
});
