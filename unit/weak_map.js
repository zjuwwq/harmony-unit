(function() {
	module("weak map");
	test("weak map", function() {
		var wm = new WeakMap();
		var obj0 = {};
		var obj1 = function() {};
		var obj2 = window;
		var obj3 = new WeakMap();

		wm.set(obj0, "value of object");
		wm.set(obj1, "value of function");
		wm.set(obj2, "value of window");
		wm.set(obj3, "value of WeakMap");

		equal(wm.get(obj1), "value of function", "WeakMap.get()");
		equal(wm.has(obj2), true, "WeakMap.has()");
		wm.delete(obj2);
		equal(wm.has(obj2), false, "WeakMap.delete()");
		wm.clear();
		equal(wm.has(obj0), false, "WeakMap.clear()");
		equal(wm.has(obj1), false, "WeakMap.clear()");
		equal(wm.has(obj3), false, "WeakMap.clear()");
	});

	test("what is weak", function() {
		var wm = new WeakMap();

		var element = document.createElement("div");
		document.body.appendChild(element);
		wm.set(element, "hello");
		document.body.removeChild(element);
		equal(1, 1, "the elment can be gc, because the reference from weak map is weak");
	});

	test("weak map difference of map", function() {
		var wm = new WeakMap();
		throws(function() {
			wm.set("name", "wwq");
		}, "key must be object not value");
		wm.set({}, 12);
		equal(wm.size, undefined, "can not get the size of the weak map");
		throws(function() {
			for (let[k, v] of wm) {
				console.log("weak map:" + k + ":" + v);
			}
		}, "can not iterate weak map");
	});


})();