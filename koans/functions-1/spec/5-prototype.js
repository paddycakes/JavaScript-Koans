/*jslint nomen: true*/
/*global describe, expect, it, __*/
describe('prototype', function () {
	it('1 - should understand prototype', function () {
		var Person = function () {
		}, instance;
		Person.prototype = {
			name: 'default name'
		};
		instance = new Person();
		expect(instance.name).toBe('default name');
		expect(Person.prototype.isPrototypeOf(instance)).toBe(true);
	});
	it('2 - should understand prototype', function () {
		var Person = function () {
		}, instance;
		instance = new Person();
		Person.prototype = {
			name: 'default name'
		};
		expect(instance.name).toBe(undefined);
		expect(Person.prototype.isPrototypeOf(instance)).toBe(false);
	});
	it('3 - should understand prototype', function () {
		var Person = function () {
		}, firstInstance = new Person(), secondInstance, thirdInstance;
		expect(firstInstance.name).toBe(undefined);
		Person.prototype.name = 'before';
		secondInstance = new Person();
		expect(firstInstance.name).toBe('before');
		expect(secondInstance.name).toBe('before');
		Person.prototype = {
			name: 'after'
		};
		thirdInstance = new Person();
		expect(firstInstance.name).toBe('before');
		expect(secondInstance.name).toBe('before');
		expect(thirdInstance.name).toBe('after');
		Person.prototype.name = 'even more after';
		expect(firstInstance.name).toBe('before');
		expect(secondInstance.name).toBe('before');
		expect(thirdInstance.name).toBe('even more after');

		expect(Person.prototype.isPrototypeOf(firstInstance)).toBe(false);
		expect(Person.prototype.isPrototypeOf(secondInstance)).toBe(false);
		expect(Person.prototype.isPrototypeOf(thirdInstance)).toBe(true);
	});
	it('4 - should understand prototype & delete', function () {
		var Person = function () {
		}, instance;
		Person.prototype.name = 'default name';
		instance = new Person();
		expect(instance.name).toBe('default name');
		delete Person.prototype.name;
		expect(instance.name).toBe(undefined);
	});
	it('5 - should understand prototype', function () {
		var Person = function () {
		}, firstInstance, secondInstance;
		Person.prototype.name = 'default name';
		Person.prototype.address = {
			street: 'Kosovska 51',
			postcode: '11000'
		};
		firstInstance = new Person();
		secondInstance = new Person();
		firstInstance.name = 'new name';
		// The key point here is that there is more than 1 dot.
		// With one dot you are adding a new property directly on the instance.
		// With more than one dot you are adding/changing properties on the prototype.
		firstInstance.address.street = 'Kosovska 49';
		expect(secondInstance.name).toBe('default name');
		expect(secondInstance.address.street).toBe('Kosovska 49');
	});
	it('6 - should understand prototypes - angularjs scopes (Scope.prototype.$new)', function () {
		var parentScope = {
				name: 'default name',
				address: {
					street: 'Kosovska 51',
					postcode: '11000'
				}
			},
			createChildScope = function (parentScope) {
				var ChildScopeConstructor = function () {
				};
				ChildScopeConstructor.prototype = parentScope;
				return new ChildScopeConstructor();
			},
			childScope = createChildScope(parentScope);
		expect(parentScope.name).toBe('default name');
		expect(childScope.name).toBe('default name');
		childScope.name = 'new name';
		expect(parentScope.name).toBe('default name');
		expect(childScope.name).toBe('new name');
		expect(parentScope.address.street).toBe('Kosovska 51');
		expect(childScope.address.street).toBe('Kosovska 51');
		// The key point here is that there is more than 1 dot.
		// With one dot you are adding a new property directly on the instance.
		// With more than one dot you are adding/changing properties on the prototype.
		childScope.address.street = 'Kosovska 49';
		// VERY IMPORTANT
		// childScope does not have a property address; checks prototype, which it does.
		// It then changes the address of the parent prototype address.
		// It is because we have to navigate more than one dot, ie. if we asked for childScope.address = [ street: 'Kosovska 49' }
		// then it would set it on the childScope. But because we do childScope.address.street = 'Kosovska 49', it says
		// do I have an address property on the childScope -> no, then looks for address on the parentScope -> yes, then changes
		// the parent prototype which affects both parentScope and childScope.
		expect(parentScope.address.street).toBe('Kosovska 49');
		expect(childScope.address.street).toBe('Kosovska 49');
	});
});
