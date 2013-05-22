(function() {
	module("map");
	test("map", function() {
		var map = new Map();
		map.set("name", "wwq");
		var obj = {};
		map.set(obj, "hello");
		notEqual(map.get({}), "hello", "compare key use ===");
		map.get(obj, "hello", "use object key");

		function a() {}
		map.set(a, {
			foo: "abc"
		});
		deepEqual(map.get(a), {
			foo: "abc"
		}, "use function key");
		equal(map.has("name"), true, "map.has()");
		equal(map.size, 3, "map.size");
		map.delete(a);
		equal(map.get(a), undefined, "map.delete()");
		map.clear();
		equal(map.size, 0, "map.clear()");

	});
	test("map construct with iterator", function() {
		var wwq = {
			name: "wwq",
			age: 29,
			weight: 80
		};
		wwq.iterator = function() {
			for (let p in wwq) {
				yield([p, wwq[p]]);
			}
		};
		var map = new Map(wwq);
		equal(map.get("age"), 29);
		equal(map.size, 4);
	});

	test("iterate map", function() {
		var map = new Map();
		map.set("name", "wwq");
		map.set("age", 29);
		map.set("weight", 80);
		var arr = [];
		for (let k of map.keys()) {
			arr.push(k);
		}
		deepEqual(arr, ["name", "age", "weight"], "iterate the map.keys()");
		arr = [];
		for (let v of map.values()) {
			arr.push(v);
		}
		deepEqual(arr, ["wwq", 29, 80], "iterate the map.values()");
		arr = [];
		for (let[k, v] of map) {
			arr.push([k, v]);
		}
		deepEqual(arr, [
			["name", "wwq"],
			["age", 29],
			["weight", 80]
		], "iterate the map");
	});
})();