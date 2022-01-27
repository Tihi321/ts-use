import React, { useEffect, useRef } from "react";
import { useYoutube } from "../../useYoutube";
export var Youtube = function (params) {
    var youtubeRef = useRef({});
    var addElement = useYoutube({
        videoId: params.videoId,
        options: params.options,
        events: params.events,
    }).addElement;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(function () { return addElement(youtubeRef.current); }, [youtubeRef.current]);
    return (React.createElement("div", { className: "youtube-container" },
        React.createElement("div", { ref: youtubeRef, className: "youtube-element" })));
};
//# sourceMappingURL=index.js.map