(function() {
	module("arrow function");
	test("arrow function", function(){
		let empty = () => {};
		equal(empty(), undefined);
		let square = x => x * x;
		equal(square(2), 4);
		var arr = [1, 2, 3, 4, 5];
		let evens = [];
		arr.forEach(x => {if(x % 2 === 0) evens.push(x);})
		deepEqual(evens, [2, 4]);
		equal(typeof empty, "function");
	});
	test("array function lack .prototype and [[constructor]] internal method like build-in function", function() {
		let Person = (name, age) => ({
			name: name,
			age: age
		});
		equal(Person.prototype, undefined, "array function lack .prototype");
		throws(function() {
			new Person();
		}, "array function lack [[constructor]] internal method");
	});
	test("arrow function has lexical 'this'", function() {
		let wwq = {
			name: "wwq",
			age: 29,
			getName: function(){
				return () => this.name;
			},
			getAge: function() {
				return this.age;
			}
		};
		let xx = {
			name: "xx",
			age: 27
		}
		equal(wwq.getName().call(xx), "wwq", "arrow function has lexical 'this'");
		equal(wwq.getAge.call(xx), 27, "common function has dynamic 'this'");
		let zz = {
			name: "zz",
			age: 30,
			getName: wwq.getName(),
			getAge: wwq.getAge
		};
		equal(zz.getName(), "wwq", "arrow function has lexical 'this'");
		equal(zz.getAge(), 30, "common function has dynamic 'this'");
	});
})();