(function() {
	module("default parameters");
	test("default parameters", function() {
		function multiply(a, b = 1) {
			return a * b;
		}
		equal(multiply(10), 10);
		equal(multiply(10, undefined), 10, "undefined treat as missing");
		equal(multiply(10, null), 0, "null don't treat as missing");
		equal(multiply.length, 1, "function.length ignore the default parameters");
		throws(function() {
			eval("\
				function multiply(a = 1, b) {\
					return a * b;\
				}\
			");
		}, "default parameters just trailing arguments");
	});
})();