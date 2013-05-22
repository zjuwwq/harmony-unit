(function() {
	module("rest parameters");
	test("rest parameters is a array", function() {
		function multiply(multiplier, ...restArgs) {
			return restArgs.map(function(x) {
				return x * multiplier;
			});
		}
		deepEqual(multiply(2, 1, 2, 3), [2, 4, 6], "use the array method 'map'");
		equal(multiply.length, 1, "function.length not include rest parameters");


		function sum(...restArgs) {
			return restArgs.reduce(function(previous, current) {
				return previous + current;
			});
		}
		equal(sum(1, 2, 3, 4), 10, "use the array method 'reduce'");
	});

	test("rest parameters vs arguments", function() {
		throws(function() {
			arguments.push(1);
		}, "arguments is not a array");

		function fn() {
			return Object.prototype.toString.call(arguments.callee) === "[object Function]";
		}
		equal(fn(), true);
	});
})();