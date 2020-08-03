let regEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    , regPwd = /^[a-zA-Z][A-Za-z0-9_-]{5,18}$/;

// 时间距当前
const computedTime = function (old) {
    //传入之前的时间  时间格式为(YY-MM-DD HH:MM:SS)
    var returnText = "";
    var nowDate = new Date().getTime(); //当前时间
    var setDate = new Date(old).getTime();
    var times = Math.floor((nowDate - setDate) / 1000);
    if (times > 60 * 60 * 24 * 365) {
        returnText = Math.floor(times / (60 * 60 * 24 * 365)) + "年前";
    } else if (times > 60 * 60 * 24 * 30) {
        returnText = Math.floor(times / (60 * 60 * 24 * 30)) + "个月前";
    } else if (times > 60 * 60 * 24) {
        returnText = Math.floor(times / (60 * 60 * 24)) + "天前";
    } else if (times > 60 * 60) {
        returnText = Math.floor(times / (60 * 60)) + "小时前";
    } else if (times > 60) {
        returnText = Math.floor(times / 60) + "分钟前";
    } else if (times > 0) {
        returnText = Math.floor(times / 1) + "秒前";
    } else {
        returnText = "系统错误,必须传入当前时间之前的数值";
    }
    return returnText;
}
// 时间格式化
const rTime = function (date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
}

const testEmail = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入邮箱'));
    } else if (!regEmail.test(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback()
    }
}
const testPwd = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入密码'));
    } else if (!regPwd.test(value)) {
        callback(new Error('密码格式不正确'))
    } else {
        callback()
    }
}
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
}
export {
    computedTime,
    rTime,
    testEmail,
    testPwd,
    getLoginCode
}
