(function() {
	// can only run on firfox
	function map(it, fn) {
		for (var x of it) {
			yield fn(x);
		}
	}

	function filter(it, fn) {
		for (var x of it) {
			if (fn(x)) {
				yield x;
			}
		}
	}

	function range(from, to) {
		while (from <= to) {
			yield from++;
		}
	}

	function forall(it, fn) {
		for (x of it) {
			if (!fn(x)) {
				return false;
			}
		}
		return true;
	}

	// begin test
	module("generators");

	function natural() {
		var i = 1;
		while (true) {
			yield i++;
		}
	}
	test("generate nature number(a infinite sequence)", function() {
		var it = natural();
		equal(it.next(), 1);
		equal(it.next(), 2);
		for (var i = 3; i < 1000; i++) {
			it.next();
		}
		equal(it.next(), 1000);
	});

	test("map of the infinite sequence", function() {
		var it = map(natural(), function(x) {
			return x * x;
		});
		equal(it.next(), 1);
		equal(it.next(), 4);
		for (var i = 3; i < 100; i++) {
			it.next();
		}
		equal(it.next(), 1e4);
	});

	test("filter of the infinite sequence", function() {
		var it = filter(natural(), function(x) {
			return x % 2 === 0;
		});
		equal(it.next(), 2);
		equal(it.next(), 4);
		for (var i = 3; i < 1000; i++) {
			it.next();
		}
		equal(it.next(), 2000);
	});

	function prime() {
		function isPrime(n) {
			return forall(range(2, n - 1), function(x) {
				return n % x;
			});
		}
		return filter(natural(), isPrime);
	}
	test("calculate prime, a compounded test", function() {
		var it = prime();
		equal(it.next(), 1);
		equal(it.next(), 2);
		for (var i = 3; i < 100; i++) {
			it.next();
		}
		equal(it.next(), 523);
	});

	test("calculate prime, a compounded test", function() {
		var it = prime();
		equal(it.next(), 1);
		equal(it.next(), 2);
		for (var i = 3; i < 100; i++) {
			it.next();
		}
		equal(it.next(), 523);
	});

	test("StopIteration error when out of range", function() {
		var it = range(4, 10);
		throws(function() {
			while (true) {
				it.next()
			}
		},
		StopIteration,
			"raised error is an instance of StopIteration");
	});

	test("iterate over generator", function() {
		var it = range(4, 10);
		var arr = [];
		for (let i in it) {
			arr.push(i);
		}
		deepEqual(arr, [4, 5, 6, 7, 8, 9, 10], "iterate use for...in");

		arr = [];
		it = range(4, 10);
		for (let i of it) {
			arr.push(i);
		}
		deepEqual(arr, [4, 5, 6, 7, 8, 9, 10], "iterate use for...of");
	});
})();