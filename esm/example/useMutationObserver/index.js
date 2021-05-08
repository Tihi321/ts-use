import React, { useEffect, useRef, useState } from "react";
import { useMutationObserver } from "../../useMutationObserver";
export var RevealElement = function () {
    var element = useRef({});
    var _a = useState(false), reveal = _a[0], setReveal = _a[1];
    var observe = useMutationObserver({
        onChildList: function () {
            setReveal(true);
        }
    }).observe;
    useEffect(function () {
        if (observe) {
            observe(element.current);
        }
    }, []);
    return React.createElement("div", { ref: element }, reveal && "reveal");
};
//# sourceMappingURL=index.js.map