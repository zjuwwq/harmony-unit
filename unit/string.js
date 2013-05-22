(function(){
	module("string");
	test("string", function(){
		var str = "wwq";
		equal(str.repeat(3), "wwqwwqwwq", "String.repeat");
		equal(str.repeat(0), "", "String.repeat");
		throws(function(){
			str.repeat(-100);
		}, "String.repeat");
		equal(String.prototype.repeat.call([1,2,3], 2), "1,2,3,1,2,3", "String.repeat");

		str = "To be, or not to be, that is the question.";
		equal(str.startsWith("To be"), true, "String.startsWith");
		equal(str.startsWith("not to be"), false, "String.startsWith");
		equal(str.startsWith("not to be", 10), true, "String.startsWith");

		equal(str.endsWith("the question."), true, "String.endsWith");
		equal(str.endsWith("not to be"), false, "String.endsWith");
		equal(str.endsWith("not to be", 23), true, "String.endsWith");

		equal(str.contains("not to be"), true, "String.contains");
		equal(str.contains("not to be", 20), false, "String.contains");
	});
})();