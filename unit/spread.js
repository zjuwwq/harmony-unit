(function() {
	module("spread");
	test("spread", function() {
		var part = [2, 3, 4];
		var arr = [1, ...part, 1, ...part];
		deepEqual(arr, [1, 2, 3, 4, 1, 2, 3, 4], "use within an ElementList in an ArrayLiteral");

		// var x = [1, 2, 3];
		// function sum(a, b, c, d) {
		// 	return a + b + c + d;
		// }
		// equal(sum(...x, 4), 10, "use within an ArgumentList");

		// function NumberList(a, b, c) {
		// 	this.list = [];
		// 	this.list.push(a, b, c);
		// }
		// equal(new NumberList(...x).list, [1, 2, 3], "the arguments of constructor is also ArgumentList");
	});
})();