import React from "react";
import $ from "jquery";
import YouTube from "@u-wave/react-youtube";
import { useSelector, useDispatch } from "react-redux";
import { isPausedToggle, setSong } from "../actions";
const Ytplayer = () => {
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlist);
  const isPaused = useSelector((state) => state.isPaused);
  const videoId = useSelector((state) => state.songId);
  const showVid = useSelector((state) => state.showVideo);
  const isShuffled = useSelector((state) => state.isShuffled);
  const isLooping = useSelector((state) => state.isLooping);

  const onChange = (e) => {
    switch (e.data) {
      case 1:
        dispatch(isPausedToggle(false));
        break;
      case 2:
        dispatch(isPausedToggle(true));
        break;
      case 3:
        dispatch(isPausedToggle(false));
        break;
      default:
        break;
    }
  };

  const onVideoEnd = () => {
    playlist.forEach((element, index) => {
      if (videoId === element.songId) {
        if (isShuffled) {
          let playlistLength = playlist.length;
          let random = Math.floor(Math.random() * playlistLength);
          $(`div[data-youtube-id="${playlist[random].songId}"]`).click();
        }
        if (isLooping) {
          dispatch(setSong("reload"));
          $(`div[data-youtube-id="${playlist[index].songId}"]`).click();
        }
        if (!isShuffled && !isLooping) {
          if (playlist[index + 1] !== undefined) {
            $(`div[data-youtube-id="${playlist[index + 1].songId}"]`).click();
          } else {
            alert("Geen volgende video gevonden in de playlist.");
          }
        }
      }
    });
  };

  return (
    <YouTube
      id="player"
      autoplay
      paused={isPaused}
      startSeconds={0}
      video={videoId}
      className={showVid ? "" : "hidden"}
      allowFullscreen={false}
      // controls={false}
      modestBranding={true}
      onEnd={onVideoEnd}
      onStateChange={onChange}
      playsInline={true}
      // disableKeyboard={true}
    />
  );
};

export default Ytplayer;
