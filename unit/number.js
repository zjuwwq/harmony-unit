(function(){
	module("number");
	test("number", function(){
		equal(Number.isNaN(NaN), true, "Number.isNaN");
		equal(Number.isNaN(parseInt("abc")), true, "Number.isNaN");
		equal(Number.isNaN(100), false, "Number.isNaN");
		equal(Number.isFinite(1/0), false, "Number.isFinite");
		equal(Number.isFinite(Infinity), false, "Number.isFinite");
		equal(Number.isFinite(100), true, "Number.isFinite");
		equal(Number.isFinite(NaN), false, "Number.isFinite");
		equal(Number.isInteger(100), true, "Number.isInteger");
		equal(Number.isInteger(1.1), false, "Number.isInteger");
		equal(Number.toInteger(NaN), 0, "Number.toInteger");
		equal(Number.toInteger(Infinity), Infinity, "Number.toInteger");
		equal(Number.toInteger(Math.PI), 3, "Number.toInteger");
		equal(Number.toInteger(-2.34), -2, "Number.toInteger");
	});
})();