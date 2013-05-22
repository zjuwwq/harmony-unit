(function() {
	module('const');
	test("const has block scope", function(){
		const a = 1;
		{
			// const a = 100;
			// equal(a, 100);
		}
		equal(a, 1);
	});
	test("reassignment", function() {
		const a = 100;
		a = 1;
		equal(a, 100, "reassignment const variable is useless.");
	});
	test("redeclared", function() {
		throws(function() {
			eval("\
				const a = 100;\
				var a;\
				");
		},
		TypeError,
			"redeclared a variable with the same name raise an TypeError");
	});
})();