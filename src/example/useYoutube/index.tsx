import React, { useEffect, useRef } from "react";

import { TYoutubeEvents, TYoutubeOptions } from "../../typings";
import { useYoutube } from "../../useYoutube";

interface IYoutubeProps {
  videoId: string;
  options?: TYoutubeOptions;
  events?: TYoutubeEvents;
}

export const Youtube = (params: IYoutubeProps) => {
  const youtubeRef = useRef({} as HTMLElement);
  const { addElement } = useYoutube({
    videoId: params.videoId,
    options: params.options,
    events: params.events,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => addElement(youtubeRef.current), [youtubeRef.current]);

  return (
    <div className="youtube-container">
      <div ref={youtubeRef as any} className="youtube-element" />
    </div>
  );
};
