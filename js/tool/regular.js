/* 正则 */
var RegExps = {
    notnull: "^\\s*$", //不为空
    password: "^\\s*$", //
    mobile: "^([1][34578])\\d{9}$", //验证电话号码正则
    int: "^[0-9]+$", // 为正整数
    nullornumber: "^$|^[0-9]+$" /* 可为空 或者 正整数 */,
    nullor1number: "^$|^[1-9]+$" /* 可为空 或者 1-9正整数 */,
    nullornumberordecimal: "^$|^[0-9]+$|^(\\d{1,})+\\.\\d\\d$",
    /* 可为空 正整数 2小数 */
    username: "^\\w+$",
    /* 英文数字或者下划线 */
    /* 正整数 2小数 */
    numberordecimal: "^[0-9]+$|^(\\d{1,})+\\.(\\d{1,})$"
};
module.exports = exports = RegExps;