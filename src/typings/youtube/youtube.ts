import { PlayerState } from "../../enums";

export type TYoutubeOptions = {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
};

export interface YoutubeEvent extends Event {
  data: PlayerState;
}

export type TYoutubeEvents = {
  onEnd?: (event: YoutubeEvent) => void;
  onPlay?: (event: YoutubeEvent) => void;
  onPause?: (event: YoutubeEvent) => void;
  onReady?: (event: YoutubeEvent) => void;
  onStateChange?: (event: YoutubeEvent) => void;
};
