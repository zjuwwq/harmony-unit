(function() {
	module('destructuring');
	test("avoid temporary variables", function() {
		var a = 10,
			b = 20;
		[b, a] = [a, b];
		equal(a, 20, "swap");
		equal(b, 10, "swap");

		function fibonacci() {
			var i = 0;
			var j = 1;
			while (true) {
				yield i;
				[i, j] = [j, i + j];
			}
		}
		var it = fibonacci();
		equal(it.next(), 0, "fibonacci number");
		equal(it.next(), 1, "fibonacci number");
		for (var i = 0; i < 20; i++) {
			it.next();
		}
		equal(it.next(), 17711, "fibonacci number");
	});
	test("multiple value returns", function() {
		function fn() {
			return [1, {
				name: "wwq"
			}, [1, 2, 3]];
		}
		var [a, b, c] = fn();
		equal(a, 1);
		deepEqual(b, {
			name: "wwq"
		});
		deepEqual(c, [1, 2, 3]);

		var [x, , y, z] = fn();
		equal(a, 1);
		deepEqual(y, [1, 2, 3]);
		equal(z, undefined);
	});
	test("loop across object", function() {
		var obj = {
			width: 100,
			length: 1000,
			color: "red"
		};
		for (var [key, value] in Iterator(obj)) {
			console.log(key + ":" + value);
		}
		equal(key, "color");
		equal(value, "red");
	});
	
	test("Pulling fields from objects passed as function parameter", function() {
		var user = {
			id: 100,
			nickName: "zjuwwq",
			fullName: {
				firstName: "Wenqing",
				lastName: "Wei"
			}
		};
		// "{id}" is shorthand of "{id: id}"

		function userId({
			id
		}) {
			return id;
		}
		equal(userId(user), 100);

		function whois({
			nickName: nickName,
			fullName: {
				firstName: name
			}
		}) {
			console.log(nickName + " is " + name);
			return [nickName, name];
		}
		var [a, b] = whois(user);
		equal(a, "zjuwwq");
		equal(b, "Wenqing");
	});
	// matching rest pattern
	// 
	// test("matching rest pattern", function() {
	// 	var [x, ...xs] = [1, 2, 3, 4, 5];
	// 	deepEqual(xs, [2, 3, 4, 5]);
	// });

})();