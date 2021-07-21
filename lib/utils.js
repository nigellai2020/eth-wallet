"use strict";
var Utils;
(function (Utils) {
    function sleep(millisecond) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(null);
            }, millisecond);
        });
    }
    Utils.sleep = sleep;
    ;
})(Utils || (Utils = {}));
;
module.exports = Utils;
