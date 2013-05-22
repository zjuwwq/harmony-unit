(function() {
	module('set');
	test("set", function(){
		var set = new Set();
		var obj = {};
		set.add(1);
		set.add(obj);
		set.add("hello");
		equal(set.has(1), true, "map.has()");
		equal(set.has({}), false, "compare key width ===");
		equal(set.has(obj), true, "compare key width ===");
		equal(set.size, 3, "set.size");
		set.delete(1);
		equal(set.has(1), false, "map.delete()");
		set.clear();
		equal(set.size, 0, "map.clear()");
	});
	test("set costruct with iterator", function() {
		var set = new Set("world");
		equal(set.has("o"), true, "construct by string");
		equal(set.size, 5, "construct by string");
		set = new Set([1, 2, 1, 3]);
		equal(set.has(1), true, "construct by array");
		equal(set.size, 3, "construct by array");
	});
	test("iterate set", function(){
		var set = new Set([1, 2, 1, 3]);
		var arr = [];
		for(let i of set){
			arr.push(i);
		}
		deepEqual(arr, [1, 2, 3], "iterate the set");
	});
})();