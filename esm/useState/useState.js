import { useEffect, useMemo, useState } from "react";
export var useReactiveState = function (propState) {
    var _a = useState(propState), state = _a[0], setState = _a[1];
    var propMemoState = useMemo(function () { return propState; }, [propState]);
    useEffect(function () {
        setState(propMemoState);
    }, [propMemoState]);
    return [state, setState];
};
//# sourceMappingURL=useState.js.map