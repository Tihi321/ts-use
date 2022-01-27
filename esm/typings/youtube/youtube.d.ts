/// <reference types="react" />
/// <reference types="web" />
import { PlayerState } from "../../enums";
export declare type TYoutubeOptions = {
    autoplay?: boolean;
    controls?: boolean;
    loop?: boolean;
};
export interface YoutubeEvent extends Event {
    data: PlayerState;
}
export declare type TYoutubeEvents = {
    onEnd?: (event: YoutubeEvent) => void;
    onPlay?: (event: YoutubeEvent) => void;
    onPause?: (event: YoutubeEvent) => void;
    onReady?: (event: YoutubeEvent) => void;
    onStateChange?: (event: YoutubeEvent) => void;
};
//# sourceMappingURL=youtube.d.ts.map