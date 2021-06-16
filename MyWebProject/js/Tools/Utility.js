var patternParts = /^(yy(yy)?|M(M(M(M)?)?)?|d(d)?|EEE(E)?|a|H(H)?|h(h)?|m(m)?|s(s)?|S)/;
var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

var dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday'
];
var utility = {
    /**
     * 判断是否为空 为空返回true，不为空返回false
     * @param {any} data
     */
    IsNullOrEmpty: function (data) {
        if (data == null || data == undefined || $.trim(data) == "") {
            return true;
        }
        return false;
    },
    /**
     * 判断是否为空 为空返回true，不为空返回false
     * @param {any} data
     */
    IsNullOrUndefined: function (data) {
        if (data == null || data == undefined) {
            return true;
        }
        return false;
    },
    /**
     * 判断是否为空 为空返回true，不为空返回false
     * @param {any} data
     */
    IsNullOrEmptyLenth: function (data) {
        if (data == null || data == undefined || data.length == 0) {
            return true;
        }
        return false;
    },
    /**
     * 格式化日期
     * @param {any} date
     * @param {any} pattern
     */
    formatDate: function (date, pattern) {
        date = new Date(date);
        var result = [];
        while (pattern.length > 0) {
            patternParts.lastIndex = 0;
            var matched = patternParts.exec(pattern);
            if (matched) { result.push(patternValue[matched[0]].call(this, date)); pattern = pattern.slice(matched[0].length); }
            else { result.push(pattern.charAt(0)); pattern = pattern.slice(1); }
        }
        return result.join('');
    },
    /**
     * 获取Url参数值
     * @param {any} name
     */
    getUrlParam: function (name) {
        //正则表达式过滤
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    }
}
var patternValue = {
    yy: function (date) {
        return toFixedWidth(date.getFullYear(), 2);
    },
    yyyy: function (date) {
        return date.getFullYear().toString();
    },
    MMMM: function (date) {
        return monthNames[date.getMonth()];
    },
    MMM: function (date) {
        return monthNames[date.getMonth()].substr(0, 3);
    },
    MM: function (date) {
        return toFixedWidth(date.getMonth() + 1, 2);
    },
    M: function (date) {
        return date.getMonth() + 1;
    },
    dd: function (date) {
        return toFixedWidth(date.getDate(), 2);
    },
    d: function (date) {
        return date.getDate();
    },
    EEEE: function (date) {
        return dayNames[date.getDay()];
    },
    EEE: function (date) {
        return dayNames[date.getDay()].substr(0, 3);
    },
    HH: function (date) {
        return toFixedWidth(date.getHours(), 2);
    },
    H: function (date) {
        return date.getHours();
    },
    hh: function (date) {
        var hours = date.getHours();
        return toFixedWidth(hours > 12 ? hours - 12 : hours, 2);
    },
    h: function (date) {
        return date.getHours() % 12;
    },
    mm: function (date) {
        return toFixedWidth(date.getMinutes(), 2);
    },
    m: function (date) {
        return date.getMinutes();
    },
    ss: function (date) {
        return toFixedWidth(date.getSeconds(), 2);
    },
    s: function (date) {
        return date.getSeconds();
    },
    S: function (date) {
        return toFixedWidth(date.getMilliseconds(), 3);
    },
    a: function (date) {
        return date.getHours() < 12 ? 'AM' : 'PM';
    }
};
var toFixedWidth = function (value, length, fill) {
    var result = (value || '').toString();
    fill = fill || '0';
    var padding = length - result.length;
    if (padding < 0) {
        result = result.substr(-padding);
    }
    else {
        for (var n = 0; n < padding; n++) result = fill + result;
    } return result;
};
