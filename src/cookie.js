/**
 * @file
 * @auth jinguangguo
 * @date 2016/9/20
 */

/**
 * 操作 cookie
 *
 * 对外暴露三个方法:
 *
 * get()
 * set()
 * remove()
 *
 * 使用 cookie 必须了解的知识：
 *
 * 一枚 cookie 有如下属性：
 *
 *    key value domain path expires secure
 *
 *    domain: 浏览器只向指定域的服务器发送 cookie，默认是产生 Set-Cookie 响应的服务器的主机名
 *    path: 为特定页面指定 cookie，默认是产生 Set-Cookie 响应的 URL 的路径
 *    expires: 日期格式为（Weekday, DD-MON-YY HH:MM:SS GMT）唯一合法的时区是 GMT，默认是会话结束时过期
 *    secure: 使用 ssl 安全连接时才会发送 cookie
 *
 * 有点类似命名空间的意思
 *
 */

/**
 * 一小时的毫秒数
 *
 * @inner
 * @const
 * @type {number}
 */
var HOUR_TIME = 60 * 60 * 1000;

/**
 * 把 cookie 字符串解析成对象
 *
 * @inner
 * @param {string} cookieStr 格式为 key1=value1;key2=value2;
 * @return {Object}
 */
function parse(cookieStr) {

    if (cookieStr.indexOf('"') === 0) {
        // 如果 cookie 按照 RFC2068 规范进行了转义，要转成原始格式
        cookieStr = cookieStr.slice(1, -1)
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
    }

    var result = { };

    try {
        // Replace server-side written pluses with spaces.
        // If we can't decode the cookie, ignore it, it's unusable.
        // If we can't parse the cookie, ignore it, it's unusable.
        cookieStr = decodeURIComponent(cookieStr.replace(/\+/g, ' '));

        $.each(
            cookieStr.split(';'),
            function (index, part) {
                var pair = part.split('=');
                var key = $.trim(pair[0]);
                var value = $.trim(pair[1]);

                if (key) {
                    result[key] = value;
                }
            }
        );
    }
    catch (e) { }

    return result;
}

/**
 * 设置一枚 cookie
 *
 * @param {string} key
 * @param {string} value
 * @param {Object} options
 */
function setCookie(key, value, options) {

    var expires = options.expires;

    if (typeof expires ==  'number') {
        var hours = expires;
        expires = new Date();
        expires.setTime(expires.getTime() + hours * HOUR_TIME);
    }

    document.cookie = [
        encodeURIComponent(key), '=', encodeURIComponent(value),
        expires ? ';expires=' + expires.toUTCString() : '',
        options.path ? ';path=' + options.path : '',
        options.domain ? ';domain=' + options.domain : '',
        options.secure ? ';secure' : ''
    ].join('');
}

export default {
    /**
     * 读取 cookie 的键值
     *
     * 如果不传 key，则返回完整的 cookie 键值对象
     *
     * @param {string=} key
     * @return {string|Object|undefined}
     */
    get(key) {
        var result = parse(document.cookie);
        return $.type(key) === 'string' ? result[key] : result;
    },

    /**
     * 写入 cookie
     *
     * @param {string|Object} key 如果 key 是 string，则必须传 value
     *                            如果 key 是 Object，可批量写入
     * @param {*=} value
     * @param {Object=} options
     * @property {number=} options.expires 过期小时数，如 1 表示 1 小时后过期
     * @property {string=} options.path 路径，默认是 /
     * @property {string=} options.domain 域名
     * @property {boolean=} options.secure 是否加密传输
     */
    set(key, value, options) {
        if ($.isPlainObject(key)) {
            options = value;
            value = null;
        }

        options = $.extend({ }, exports.defaultOptions, options);

        if (value === null) {
            $.each(
                key,
                function (key, value) {
                    setCookie(key, value, options);
                }
            );
        }
        else {
            setCookie(key, value, options);
        }
    },

    /**
     * 删除某个 cookie
     *
     * @param {string} key
     * @param {Object=} options
     * @property {string=} options.path cookie 的路径
     * @property {string=} options.domain 域名
     * @property {boolean=} options.secure 是否加密传输
     */
    remove(key, options) {

        if (key == null) {
            return;
        }

        options = options || { };
        options.expires = -1;

        setCookie(
            key,
            '',
            $.extend({ }, exports.defaultOptions, options)
        );
    }
}
