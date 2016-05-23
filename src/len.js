/**
 * @file
 * @author jinguangguo
 * @date 2016/5/23
 */

/**
 * 具有中文字符的长度(默认一个中文代表两个英文字符长度)
 * @param value
 * @returns {number}
 */
export default function (value) {
    let reg = /[^\u0000-\u00FF]/;   // 匹配非单字节字符
    let c = '';
    let count = 0;
    for(let i = 0; i < value.length; i++) {
        c = value.charAt(i);
        if (reg.test(c) === true) {
            count = count + 2;
        } else {
            count++;
        }
    }
    return count;
}