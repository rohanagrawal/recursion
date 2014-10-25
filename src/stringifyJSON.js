// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	var finalStr = '';
	if (obj !== null) {
		if (typeof obj === 'string') {
			return '"' + obj + '"';
		}
		else if (Array.isArray(obj)) {
			var stringifyArray = function(param) {
				var paramStr = '[';
				if (param.length) {
					for (var i=0; i < param.length; i++) {
						if (typeof param[i] === 'string') {
							paramStr += '"' + param[i] + '"';
						}
						else if (Array.isArray(param[i])) {
							paramStr += stringifyArray(param[i]);
						}
						else {
							paramStr += param[i].toString();
						}
						if (i !== (param.length-1)) {
							paramStr += ',';
						}
					}
				}
				paramStr += ']';
				return paramStr;
			}
			finalStr += stringifyArray(obj);
			return finalStr;
		}
		else {
			return obj.toString();
		}
	}
	else {
		return 'null';
	}
};
