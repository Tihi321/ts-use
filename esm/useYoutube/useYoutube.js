import isEmpty from "lodash/isEmpty";
import { useEffect, useRef, useState } from "react";
import { isBrowser } from "tsl-utils";
import Player from "youtube-player";
import { EventTypes, IFrameStates, PlayerState } from "../enums";
export var useYoutube = function (_a) {
    var videoId = _a.videoId, options = _a.options, events = _a.events;
    var _b = useState({}), element = _b[0], setElement = _b[1];
    var _c = useState(true), loading = _c[0], setLoading = _c[1];
    var playerRef = useRef(null);
    var onPlayerStateChange = function (event) {
        if (events && events.onStateChange) {
            events.onStateChange(event);
        }
        switch (event.data) {
            case PlayerState.PAUSED:
                if (events && events.onPause) {
                    events.onPause(event);
                }
                break;
            case PlayerState.PLAYING:
                if (events && events.onPlay) {
                    events.onPlay(event);
                }
                break;
            case PlayerState.ENDED:
                if (events && events.onEnd) {
                    events.onEnd(event);
                }
                break;
            default:
        }
    };
    var onPlayerReady = function (event) {
        setLoading(false);
        if (events && events.onReady) {
            events.onReady(event);
        }
    };
    useEffect(function () {
        if (!isBrowser()) {
            return;
        }
        if (videoId && !isEmpty(element)) {
            var youtubeParams = {
                playerVars: {
                    modestbranding: IFrameStates.TRUE
                }
            };
            youtubeParams.videoId = videoId;
            if (options && options.autoplay) {
                youtubeParams.playerVars.autoplay = IFrameStates.TRUE;
            }
            if (options && options.controls) {
                youtubeParams.playerVars.controls = IFrameStates.TRUE;
            }
            if (options && options.loop) {
                youtubeParams.playerVars.loop = IFrameStates.TRUE;
            }
            playerRef.current = Player(element, youtubeParams);
            playerRef.current.on(EventTypes.READY, onPlayerReady);
            playerRef.current.on(EventTypes.STATE_CHANGE, onPlayerStateChange);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element]);
    useEffect(function () { return function () {
        if (playerRef.current) {
            playerRef.current.destroy();
        }
    }; }, []);
    var addElement = function (playerElement) { return setElement(playerElement); };
    return {
        loading: loading,
        player: playerRef.current,
        addElement: addElement
    };
};
//# sourceMappingURL=useYoutube.js.map