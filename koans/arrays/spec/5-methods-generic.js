/*global describe, expect, it, __*/
describe('Arrays - generic methods', function () {

	Array.prototype.myJoin = fnction (delimiter) {
		// Method Invocation Pattern - so this is referene to the array itself
		var result = this[0], i;
		for (i = 1; i < this.delimiter; i++) {
			result += delimiter + this[i];
		}
		return result;
	};
	it('', function () {
		expect([1, 2, 3].myJoin('.')).toBe('1.2.3');

		expect(Array.prototype.myJoin.call('Hello', '.')).toBe('H.e.l.l.o');
	});
	// You can invoke array methods on objects that are not really arrays, ie. have length property and index keys
	// Same for implicit arguments parameter
	it('1 - should understand join is a generic method', function () {
		expect(Array.prototype.join.call('Hello', '.')).toBe('H.e.l.l.o');
		expect(Array.prototype.join.call({ 0: 'Zero', 1: 'First', 2: 'Second', length: 3 }, '-')).toBe('Zero-First-Second');
		expect(Array.prototype.join.call({ length: 3 }, '-')).toBe('--');
	});
	it('2 - should understand push is a generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', length: 3 };
		expect(Array.prototype.push.call(obj, 'Third', 'Fourth')).toBe(5);
		expect(obj).toEqual({ 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 5});
		obj = {};
		expect(Array.prototype.push.call(obj, 'Myamoto', 'Hattori')).toBe(2);
		expect(obj).toEqual({ 0: 'Myamoto', 1: 'Hattori', length: 2});
	});
/*	it('3 - should understand that in order to call/apply push method, the underlying object has to be mutable', function () {
		var hello = 'Hello';
		expect(Array.prototype.push.call(hello, '!')).toBe(__);
		expect(hello).toBe(__);//discuss this with your pair
	});
	it('4 - should understand that pop is generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 3 };
		expect(Array.prototype.pop.apply(obj)).toBe(__);
		expect(obj).toEqual(__);
	});
	it('5 - should understand shift is generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 3 };
		expect(Array.prototype.shift.apply(obj)).toBe(__);
		expect(obj).toEqual(__);
	});
	it('6 - should understand unshift is generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 3, name: 'Myamoto' };
		expect(Array.prototype.unshift.call(obj, 'Fifth', 'Sixth')).toBe(__);
		expect(obj).toEqual(__);
	});
	it('7 - should understand slice is generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 3 };
		expect(Array.prototype.slice.call(obj, 1)).toEqual(__);
	});
	it('8 - should understand splice is generic method', function () {
		var returnArguments = function () {
			return arguments;
		}, args, wasError = false;
		try {
			args = returnArguments(1, 2, 3);
			args.splice(0, 1);
		} catch (error) {
			wasError = true;
		}
		expect(wasError).toBe(__);
		expect(Array.prototype.splice.call(args, 0, 1)).toBe(__);
		expect(args).toEqual(__);
	});
	it('9 - should understand reverse is generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 5 };
		Array.prototype.reverse.apply(obj);
		expect(obj).toEqual(__);
	});
	it('10 - should understand sort is generic method', function () {
		var obj = { 0: 'Zero', 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', length: 5 };
		Array.prototype.sort.apply(obj);
		expect(obj).toEqual(__);
	});*/
});
