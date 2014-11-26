/*global beforeEach, describe, expect, it, __*/
describe('Functions - method as a callback', function () {
	beforeEach(function () {
		window.name = 'window name';
	});
	it('0 - warmup (a brief refresh on invocation patterns)', function () {
		var model = {
			name: 'original name',
			setName: function (value) {
				this.name = value;
			}
		}, fn = model.setName;
		fn('new name');													// Function Invocation Pattern - 'this' is a reference to the global object, ie. window in browser.
		expect(model.name).toBe('original name');
		expect(window.name).toBe('new name');
	});
	var createModel1 = function () {
		var result = {
			name: 'original name',
			setName: function (value) {
				this.name = value;
			}
		};
		return result;
	}, createModel2 = function () {
		var result = {
			name: 'original name',
			setName: function (value) {
				result.name = value;
			}
		};
		return result;
	}, CreateModel3 = function () {
		this.name = 'original name';
		this.setName = function (value) {
			this.name = value;
		};
	}, CreateModel5 = function () {
	}, simulateAjax = function (successCallback) {
		successCallback('new name');
	};
	CreateModel5.prototype.name = 'original name';
	CreateModel5.prototype.setName = function (value) {
		this.name = value;
	};
	it('1 - should understand passing a method as callback', function () {
		var model = createModel1();
		simulateAjax(model.setName);							// Function Invocation Pattern - 'this' is a reference to the global object, ie. window in browser.
		expect(model.name).toBe('original name');
		expect(window.name).toBe('new name');
	});
	it('2 - should understand how to manually enforce scope', function () {
		var model = createModel1();
		simulateAjax(function (name) {					// This is Function Invocation Pattern ... but the next line is
			model.setName(name);									// Method Invocation Pattern - 'this' is a reference to the object invoking the method (what's left of the dot), ie. model
		});
		expect(model.name).toBe('new name');
		expect(window.name).toBe('window name');
	});
	it('3 - should understand how to use bind to enforce scope', function () {
		var model = createModel1();
		simulateAjax(model.setName.bind(model));
		expect(model.name).toBe(__);
		expect(window.name).toBe(__);
	});
	it('4 - should understand the consequences of not using this keyword to access own properties', function () {
		var createModel2 = function () {
			var result = {
				name: 'original name',
				setName: function (value) {
					result.name = value;					 // But this is always going to do the right thing, however it is called (Function / Method Invocation, etc). Much less dependency on the user about invoking context
				}
			};
			return result;
		};
		var model = createModel2();
		simulateAjax(model.setName);					// This is Function Invocation Pattern ... 'this' is a reference to window
		expect(model.name).toBe('new name');
		expect(window.name).toBe('window name');
	});
	/*
	discuss with your pair:
		- what are pros and cons of first and second approach (createModel1 and createModel2)?
	 */
	it('5 - should understand passing a method as callback', function () {
		var model = new CreateModel3();
		simulateAjax(model.setName);
		expect(model.name).toBe('original name');
		expect(window.name).toBe('new name');
	});
	it('6 - should understand passing a method as callback', function () {
		var CreateModel4 = function () {
			// Using the Constructor Invocation Pattern, the 'this' reference is a
			// reference to the newly created object, ie model on line 92.
			// Because of the assignment of this to self and the use of self
			// thereafter, it means that it will always reference the newly
			// created object when self.name is set to value. It doesn't matter
			// what 'this' is at point of invocation as no longer relevant to usage.
			var self = this;
			this.name = 'original name';
			this.setName = function (value) {
				self.name = value;
			};
		};
		var model = new CreateModel4();
		simulateAjax(model.setName);
		expect(model.name).toBe('new name');
		expect(window.name).toBe('window name');
	});
	it('7 - should understand passing a method as callback', function () {
		var model = new CreateModel5();								// This is also Function Invocation Pattern, 'this' is a reference to window
		simulateAjax(model.setName);
		expect(model.name).toBe('original name');
		expect(window.name).toBe('new name');
	});
});
