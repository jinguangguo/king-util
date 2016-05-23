/**
 * @file
 * @author jinguangguo
 * @date 2016/5/23
 */

export default function (url) {
    let result = {};

    if (!url) {
        return result;
    }

    let urlArr = url.split('?');
    let queryString = urlArr[1];
    let queryArr = queryString.split('&');
    let tempItem = [];
    for (let i = 0, len = queryArr.length; i < len; i++) {
        tempItem = queryArr[i];
        tempItem = tempItem.split('=');
        result[tempItem[0]] = tempItem[1];
    }

    return result;
}