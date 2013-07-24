(function() {
	"use strict";
	module("proxy");
	test("proxy", function() {
		var target = Object.create({
			type: "human"
		}, {
			id: {
				writable: true,
				value: 123
			}
		});
		var proxy = new Proxy(target, {
			defineProperty: function(target, name, pd) {
				window.dispatchEvent(new CustomEvent("trapDefineProperty"));
				Object.defineProperty(target, name, pd);
			},
			getOwnPropertyDescriptor: function(target, name) {
				window.dispatchEvent(new CustomEvent("trapGetOwnPropertyDescriptor"));
				return Object.getOwnPropertyDescriptor(target, name);
			},
			getOwnPropertyNames: function(target) {
				window.dispatchEvent(new CustomEvent("trapGetOwnPropertyNames"));
				return Object.getOwnPropertyNames(target);
			},
			keys: function(target) {
				window.dispatchEvent(new CustomEvent("trapKeys"));
				return Object.keys(target);
			},
			hasOwn: function(target, name) {
				window.dispatchEvent(new CustomEvent("trapHasOwn"));
				return Object.prototype.hasOwnProperty.call(target, name);
			},
			get: function(target, name, receiver) {
				window.dispatchEvent(new CustomEvent("trapGet"));
				return target[name];
			},
			set: function(target, name, value, receiver) {
				window.dispatchEvent(new CustomEvent("trapSet"));
				target[name] = value;
				return true;
			},
			deleteProperty: function(target, name) {
				window.dispatchEvent(new CustomEvent("trapDeleteProperty"));
				return delete target[name];
			},
			has: function(target, name) {
				window.dispatchEvent(new CustomEvent("trapHas"));
				return name in target;
			},
			enumerate: function(target) {
				window.dispatchEvent(new CustomEvent("trapEnumerate"));
				for (let p in target) {
					yield p;
				}
			},
			isExtensible: function(target) {
				window.dispatchEvent(new CustomEvent("trapIsExtensible"));
				return Object.isExtensible(target);
			},
			preventExtensions: function(target){
				window.dispatchEvent(new CustomEvent("trapPreventExtensions"));
				return Object.preventExtensions(target);
			},
			isSealed: function(target) {
				window.dispatchEvent(new CustomEvent("trapIsSealed"));
				return Object.isSealed(target);
			},
			seal: function(target){
				window.dispatchEvent(new CustomEvent("trapSeal"));
				return Object.seal(target);
			},
			isFrozen: function(target) {
				window.dispatchEvent(new CustomEvent("trapIsFrozen"));
				return Object.isFrozen(target);
			},
			freeze: function(target){
				window.dispatchEvent(new CustomEvent("trapFreeze"));
				return Object.freeze(target);
			}
		});

		window.addEventListener("trapdefineProperty", function(event) {
			equal(event.type, "trapdefineProperty", "handler.defineProperty");
		});
		Object.defineProperty(proxy, "name", {
			enumerable: true,
			writable: true,
			configurable: true,
			value: "wwq"
		});

		window.addEventListener("trapGetOwnPropertyDescriptor", function(event) {
			equal(event.type, "trapGetOwnPropertyDescriptor", "handler.getOwnPropertyDescriptor");
		});
		deepEqual(Object.getOwnPropertyDescriptor(proxy, "id"), {
			configurable: false,
			enumerable: false,
			writable: true,
			value: 123
		});

		window.addEventListener("trapGetOwnPropertyNames", function(event) {
			equal(event.type, "trapGetOwnPropertyNames", "handler.getOwnPropertyNames");
		});
		deepEqual(Object.getOwnPropertyNames(proxy), ["id", "name"]);

		window.addEventListener("trapKeys", function(event) {
			equal(event.type, "trapKeys", "handler.keys");
		});
		deepEqual(Object.keys(proxy), ["name"]);

		window.addEventListener("trapHasOwn", function(event) {
			equal(event.type, "trapHasOwn", "handler.hasOwn");
		});
		equal(Object.prototype.hasOwnProperty.call(proxy, "id"), true);
		equal(Object.prototype.hasOwnProperty.call(proxy, "type"), false);

		window.addEventListener("trapGet", function(event) {
			equal(event.type, "trapGet", "handler.get");
		});
		equal(proxy.name, "wwq");

		window.addEventListener("trapSet", function(event) {
			equal(event.type, "trapSet", "handler.set");
		});
		proxy.age = 12;

		var derivedProxy = Object.create(proxy);
		equal(derivedProxy.name, "wwq");
		derivedProxy.weight = 80;

		window.addEventListener("trapDeleteProperty", function(event) {
			equal(event.type, "trapDeleteProperty", "handler.deleteProperty");
		});
		equal(delete proxy.age, true);

		window.addEventListener("trapHas", function(event) {
			equal(event.type, "trapHas", "handler.has");
		});
		equal("id" in proxy, true);
		equal("type" in proxy, true);

		window.addEventListener("trapEnumerate", function(event) {
			equal(event.type, "trapEnumerate", "handler.enumerate");
		});
		var arr = [];
		for (let p in proxy) {
			arr.push(p);
		}
		deepEqual(arr, ["name", "type"]);

		window.addEventListener("trapIsExtensible", function(event) {
			equal(event.type, "trapIsExtensible", "handler.isExtensible");
		});
		equal(Object.isExtensible(proxy), true);

		window.addEventListener("trapPreventExtensions", function(event) {
			equal(event.type, "trapPreventExtensions", "handler.preventExtensions");
		});
		Object.preventExtensions(proxy);
		equal(Object.isExtensible(proxy), false);

		window.addEventListener("trapIsSealed", function(event) {
			equal(event.type, "trapIsSealed", "handler.isSealed");
		});
		equal(Object.isSealed(proxy), false);

		window.addEventListener("trapSeal", function(event) {
			equal(event.type, "trapSeal", "handler.seal");
		});
		Object.seal(proxy);
		equal(Object.isSealed(proxy), true);
		
		window.addEventListener("trapIsFrozen", function(event) {
			equal(event.type, "trapIsFrozen", "handler.isFrozen");
		});
		equal(Object.isFrozen(proxy), false);

		window.addEventListener("trapFreeze", function(event) {
			equal(event.type, "trapFreeze", "handler.freeze");
		});
		Object.freeze(proxy);
		equal(Object.isFrozen(proxy), true);

	});

	test("proxy of function", function() {
		function fn(b) {
			return this.a + b;
		};
		var proxy = new Proxy(fn, {
			apply: function(target, thisArgs, args) {
				window.dispatchEvent(new CustomEvent("trapApply"));
				return target.apply(thisArgs, args);
			}
		});

		window.addEventListener("trapApply", function(event) {
			equal(event.type, "trapApply", "handler.apply");
		});
		equal(proxy.apply({
			a: 100
		}, [50]), 150);

		

		function Person(name, age){
			this.name = name;
			this.age = age;
		}
		var proxy = new Proxy(Person, {
			construct: function(target, args){
				window.dispatchEvent(new CustomEvent("trapConstruct"));
				var obj = {};
				Person.apply(obj, args);
				return obj;
			}
		});

		window.addEventListener("trapConstruct", function(event) {
			equal(event.type, "trapConstruct", "handler.construct");
		});
		var obj = new proxy("wwq", 29);
		equal(obj.name, "wwq");
	});

})();