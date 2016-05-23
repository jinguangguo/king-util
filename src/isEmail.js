/**
 * @file 判断是否是email
 * @author jinguangguo
 * @date 2016/5/23
 */

export default function (value) {
    const REG_EMAIL = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    return REG_EMAIL.test(value);
}