import { useMount } from "../../useMount";
export var useDelayMount = function () {
    var timeout;
    var mounted = useMount({
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
//# sourceMappingURL=index.js.map