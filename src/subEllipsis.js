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
function len(value) {
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

/**
 * 字符串截取, 并在末尾添加"..."
 * @param value
 * @param number
 * @returns {*}
 */
export default function (value, number) {
    if (this.len(value) <= number) {
        return value;
    }

    let resultNum;
    let subNum = 0;

    let len = value.length;

    let count = 0;

    let c;

    for (let i = 0; i < len; i++) {
        c = value.charAt(i);
        subNum++;

        if (this.len(c) === 2) {
            count = count + 2;
        } else {
            count = count + 1;
        }

        if (count >= number) {
            break;
        }

    }

    return value.subvalueing(0, subNum) + '...';
}