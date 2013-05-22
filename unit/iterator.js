(function() {
	module("iterator");
	test("for...of loops iterator", function() {
		var arr = [1, 3, "hello"];
		var result = [];
		for (let i of arr) {
			console.log("iterate array:" + i);
			result.push(i);
		}
		deepEqual(result, arr, "array is iterable");

		var iterator = arr.iterator();
		equal(iterator.next(), 1, "for...of substantially use object.iterator().next()");
		equal(iterator.next(), 3, "for...of substantially use object.iterator().next()");
		equal(iterator.next(), "hello", "for...of substantially use object.iterator().next()");

		arr.foo = "abcd";
		result = [];
		for (let i of arr) {
			result.push(i);
		}
		equal(result.indexOf("abcd"), -1, "for...of just iterate the value of array/array-like");
	});
	
	test("array/string/set/map is iterable", function() {
		var arr = [1, 3, "hello"];
		var result = [];
		for (let i of arr) {
			console.log("iterate array:" + i);
			result.push(i);
		}
		deepEqual(result, arr, "array is iterable");

		var str = "hello world";
		result = "";
		for (let i of str) {
			console.log("iterate string:" + i);
			result += i;
		}
		equal(str, result, "string is iterable");

		var set = new Set(arr);
		result = [];
		for (let i of set) {
			console.log("iterate set:" + i);
			result.push(i);
		}
		deepEqual(result, arr, "set is iterable");

		var map = new Map;
		map.set("name", "wwq");
		map.set("age", 30);
		var keys = [];
		var values = []
		for (let[key, value] of map) {
			console.log("iterate map:" + key + "=" + value);
			keys.push(key);
			values.push(value);
		}
		deepEqual(keys, ["name", "age"], "map is iterable");
		deepEqual(values, ["wwq", 30], "map is iterable");
	});

	test("custom iterable object", function() {
		function Range(low, high) {
			this.low = low;
			this.high = high;
		}

		function RangeIterator(range) {
			this.range = range;
			this.current = this.range.low;
		}
		RangeIterator.prototype.next = function() {
			if (this.current > this.range.high) {
				throw StopIteration;
			} else {
				return this.current++;
			}
		}
		Range.prototype.iterator = function() {
			return new RangeIterator(this);
		}

		var range = new Range(4, 9);
		var result = [];
		for (let i of range) {
			result.push(i);
		}
		deepEqual(result, [4, 5, 6, 7, 8, 9], "custom iterable object");

		Range.prototype.iterator = function() {
			for (var i = this.low; i <= this.high; i++) {
				yield i;
			}
		};

		var range = new Range(4, 9);
		result = [];
		for (let i of range) {
			result.push(i);
		}
		deepEqual(result, [4, 5, 6, 7, 8, 9], "custom iterable object by generator");
	});
})();