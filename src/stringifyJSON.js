// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	var finalStr = '';
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
				else if (typeof param[i] === 'object') {
					// paramStr += stringifyObject(param[i]);
					var stringifyObjectWithinArray = function(param) {
						var paramStr = '{';
						var paramLength = 0;
						for (i in param) {
							paramLength++;
						}
						if (paramLength) {
							var commaTest = 0;
							for (key in param) {
								commaTest++;
								if (typeof param[key] === 'string') {
									paramStr += '"' + key.toString() + '":"' + param[key] + '"';
								}
								else if (Array.isArray(param[key])) {
									paramStr += '"' + key.toString() + '":' + stringifyArray(param[key]);
								}
								else if (param[key] === null) {
									paramStr += '"' + key.toString() + '":null';
								}
								else if (typeof param[key] === 'object') {
									paramStr += '"' + key.toString() + '":' + stringifyObjectWithinArray(param[key]);
								}
								else {
									paramStr += '"' + key.toString() + '":' + param[key].toString();
								}
								if (commaTest !== paramLength) {
									paramStr += ',';
								}
							}
						}
						paramStr += '}';
						return paramStr;
					}
					paramStr += stringifyObjectWithinArray(param[i]);
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
	var stringifyObject = function(param) {
		var paramStr = '{';
		var paramLength = 0;
		for (i in param) {
			paramLength++;
		}
		if (paramLength) {
			var commaTest = 0;
			for (key in param) {
				commaTest++;
				if (typeof param[key] === 'string') {
					paramStr += '"' + key.toString() + '":"' + param[key] + '"';
				}
				else if (Array.isArray(param[key])) {
					paramStr += '"' + key.toString() + '":' + stringifyArray(param[key]);
				}
				else if (param[key] === null) {
					paramStr += '"' + key.toString() + '":null';
				}
				else if (typeof param[key] === 'object') {
					paramStr += '"' + key.toString() + '":' + stringifyObject(param[key]);
				}
				else {
					paramStr += '"' + key.toString() + '":' + param[key].toString();
				}
				if (commaTest !== paramLength) {
					paramStr += ',';
				}
			}
		}
		paramStr += '}';
		return paramStr;
	}
	if (obj !== null) {
		if (typeof obj === 'string') {
			return '"' + obj + '"';
		}
		else if (Array.isArray(obj)) {
			// var stringifyArray = function(param) {
			// 	var paramStr = '[';
			// 	if (param.length) {
			// 		for (var i=0; i < param.length; i++) {
			// 			if (typeof param[i] === 'string') {
			// 				paramStr += '"' + param[i] + '"';
			// 			}
			// 			else if (Array.isArray(param[i])) {
			// 				paramStr += stringifyArray(param[i]);
			// 			}
			// 			else {
			// 				paramStr += param[i].toString();
			// 			}
			// 			if (i !== (param.length-1)) {
			// 				paramStr += ',';
			// 			}
			// 		}
			// 	}
			// 	paramStr += ']';
			// 	return paramStr;
			// }
			finalStr += stringifyArray(obj);
			return finalStr;
		}
		else if (typeof obj === 'object') {
			// var stringifyObject = function(param) {
			// 	var paramStr = '{';
			// 	var paramLength = 0;
			// 	for (i in param) {
			// 		paramLength++;
			// 	}
			// 	if (paramLength) {
			// 		var commaTest = 0;
			// 		for (key in param) {
			// 			commaTest++;
			// 			if (typeof param[key] === 'string') {
			// 				paramStr += '"' + key.toString() + '":"' + param[key] + '"';
			// 			}
			// 			else if (Array.isArray(param[key])) {
			// 				paramStr += '"' + key.toString() + '":' + stringifyArray(param[key]);
			// 			}
			// 			else if (param[key] === null) {
			// 				paramStr += '"' + key.toString() + '":null';
			// 			}
			// 			else if (typeof param[key] === 'object') {
			// 				paramStr += '"' + key.toString() + '":' + stringifyObject(param[key]);
			// 			}
			// 			else {
			// 				paramStr += '"' + key.toString() + '":' + param[key].toString();
			// 			}
			// 			if (commaTest !== paramLength) {
			// 				paramStr += ',';
			// 			}
			// 		}
			// 	}
			// 	paramStr += '}';
			// 	return paramStr;
			// }
			finalStr += stringifyObject(obj);
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
