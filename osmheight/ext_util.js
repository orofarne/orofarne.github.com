L.Util.templateRe = /\{ *(\?? *[\w_:.]+) *\}/g;

L.Util.template = function (str, data) {
	return str.replace(L.Util.templateRe, function (str, key) {
		var subKeys = key.replace(/^\?/, '').split('.');
		var value = data;
		for (var i in subKeys) {
			value = value[subKeys[i]];
			if (value === undefined) {
				break;
			}
		}

		if (value === undefined) {
			if (key.indexOf('?') === 0) {
				return '';
			} else {
				throw new Error('No value provided for variable ' + str);
			}
		} else if (typeof value === 'function') {
			value = value(data);
		}
		return value;
	});
};
