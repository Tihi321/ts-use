"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useYoutube = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
var youtube_player_1 = __importDefault(require("youtube-player"));
var enums_1 = require("../enums");
var utils_1 = require("../utils");
var useYoutube = function (_a) {
    var videoId = _a.videoId, options = _a.options, events = _a.events;
    var _b = react_1.useState({}), element = _b[0], setElement = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var playerRef = react_1.useRef(null);
    var onPlayerStateChange = function (event) {
        if (events && events.onStateChange) {
            events.onStateChange(event);
        }
        switch (event.data) {
            case enums_1.PlayerState.PAUSED:
                if (events && events.onPause) {
                    events.onPause(event);
                }
                break;
            case enums_1.PlayerState.PLAYING:
                if (events && events.onPlay) {
                    events.onPlay(event);
                }
                break;
            case enums_1.PlayerState.ENDED:
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
    react_1.useEffect(function () {
        if (!utils_1.isBrowser()) {
            return;
        }
        if (videoId && !lodash_1.isEmpty(element)) {
            var youtubeParams = {
                playerVars: {
                    modestbranding: enums_1.IFrameStates.TRUE
                }
            };
            youtubeParams.videoId = videoId;
            if (options && options.autoplay) {
                youtubeParams.playerVars.autoplay = enums_1.IFrameStates.TRUE;
            }
            if (options && options.controls) {
                youtubeParams.playerVars.controls = enums_1.IFrameStates.TRUE;
            }
            if (options && options.loop) {
                youtubeParams.playerVars.loop = enums_1.IFrameStates.TRUE;
            }
            playerRef.current = youtube_player_1.default(element, youtubeParams);
            playerRef.current.on(enums_1.EventTypes.READY, onPlayerReady);
            playerRef.current.on(enums_1.EventTypes.STATE_CHANGE, onPlayerStateChange);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element]);
    react_1.useEffect(function () { return function () {
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
exports.useYoutube = useYoutube;
//# sourceMappingURL=useYoutube.js.map