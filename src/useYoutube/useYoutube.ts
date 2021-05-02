import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import Player from "youtube-player";

import { EventTypes, IFrameStates, PlayerState } from "../enums";
import { TYoutubeEvents, TYoutubeOptions, YoutubeEvent } from "../typings";
import { isBrowser } from "../utils";

type TUseYoutubeProps = {
  videoId: string;
  options?: TYoutubeOptions;
  events?: TYoutubeEvents;
};

type TUseYoutube = (
  props: TUseYoutubeProps
) => {
  loading: boolean;
  player: any;
  addElement: (element: HTMLElement) => void;
};

export const useYoutube: TUseYoutube = ({ videoId, options, events }) => {
  const [element, setElement] = useState({} as HTMLElement);
  const [loading, setLoading] = useState(true);
  const playerRef = useRef(null as any);

  const onPlayerStateChange = (event: YoutubeEvent) => {
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

  const onPlayerReady = (event: YoutubeEvent) => {
    setLoading(false);

    if (events && events.onReady) {
      events.onReady(event);
    }
  };

  useEffect(() => {
    if (!isBrowser()) {
      return;
    }

    if (videoId && !isEmpty(element)) {
      const youtubeParams: any = {
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

  useEffect(
    () => () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    },
    []
  );

  const addElement = (playerElement: HTMLElement) => setElement(playerElement);

  return {
    loading,
    player: playerRef.current,
    addElement
  };
};
