let regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
	, regPwd = /^[a-zA-Z][A-Za-z0-9_-]{5,18}$/

const testEmail = (rule, value, callback) => {
	if (!value) {
		callback(new Error('请输入邮箱'));
	} else if (!regEmail.test(value)) {
		callback(new Error('邮箱格式不正确'))
	} else {
		callback()
	}
};
const testPwd = (rule, value, callback) => {
	if (!value) {
		callback(new Error('请输入密码'));
	} else if (!regPwd.test(value)) {
		callback(new Error('密码格式不正确'))
	} else {
		callback()
	}
};
const getLoginCode = (len) => {
	var value = '', code = '',
		arr = [
			1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
			'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];
	for (var i = 0; i < 4; i++) {
		value = Math.round(Math.random() * (arr.length - 1));
		code += arr[value];
	}
	return code;
};
export {
	testEmail,
	testPwd,
	getLoginCode,
}
