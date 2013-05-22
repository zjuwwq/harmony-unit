(function() {
	module('let');
	test("let has block scope", function() {
		let a = 1;
		var b = 1; {
			let a = 100;
			var b = 100;
			equal(a, 100);
			equal(b, 100);
		}
		equal(a, 1);
		equal(b, 100);

		for (let i = 0; i < 10; i++) {
			console.log(i);
		}
		throws(function() {
			console.log(i);
		}, "error because i in the scope of for-loop");
	});
	test("expression", function() {
		let(a = 1) equal(a * 2, 2);
	});
	test("block, use as a private function", function() {
		let(square = function(x){
			return x * x;
		}) {
			var Cube = function(side) {
				this.side = side;
			};
			Cube.prototype.volume = function() {
				return square(this.side) * this.side;
			};
		}
		equal(new Cube(3).volume(), 27);
	});
	test("redeclared", function() {
		throws(function() {
			eval('\
				switch (1) {\
					case 0:\
						let x;\
						break;\
					case 1:\
						let x;\
						break;\
				}\
			');
		},
		TypeError,
			"redeclared a variable with the same name raise an TypeError");
	});
})();