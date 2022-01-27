/// <reference types="react" />
/// <reference types="web" />
import { TYoutubeEvents, TYoutubeOptions } from "../typings";
declare type TUseYoutubeProps = {
    videoId: string;
    options?: TYoutubeOptions;
    events?: TYoutubeEvents;
};
declare type TUseYoutube = (props: TUseYoutubeProps) => {
    loading: boolean;
    player: any;
    addElement: (element: HTMLElement) => void;
};
export declare const useYoutube: TUseYoutube;
export {};
//# sourceMappingURL=useYoutube.d.ts.map