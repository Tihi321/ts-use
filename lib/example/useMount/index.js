"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelayMount = void 0;
var useMount_1 = require("../../useMount");
var useDelayMount = function () {
    var timeout;
    var mounted = useMount_1.useMount({
        onPromise: function (resolve) {
            timeout = setTimeout(function () {
                clearTimeout(timeout);
                resolve();
            }, 500);
        }
    }, function () {
        clearTimeout(timeout);
    });
    return mounted;
};
exports.useDelayMount = useDelayMount;
//# sourceMappingURL=index.js.map