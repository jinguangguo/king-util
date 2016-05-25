/**
 * @file
 * @author jinguangguo
 * @date 2016/5/23
 */


import chineseLen from './len';

/**
 * 字符串截取, 并在末尾添加"..."
 * @param value
 * @param number
 * @returns {*}
 */
export default function (value, number) {
    if (chineseLen(value) <= number) {
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

        if (chineseLen(c) === 2) {
            count = count + 2;
        } else {
            count = count + 1;
        }

        if (count >= number) {
            break;
        }

    }

    return value.substring(0, subNum) + '...';
}