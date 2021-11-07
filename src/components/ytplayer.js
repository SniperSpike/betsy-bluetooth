import React from "react";
import $ from "jquery";
import YouTube from "@u-wave/react-youtube";
import { useSelector, useDispatch } from "react-redux";
import { isPausedToggle, setSong } from "../actions";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../firebase";
const Ytplayer = () => {
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlist);
  const isPaused = useSelector((state) => state.isPaused);
  const videoId = useSelector((state) => state.songId);
  const showVid = useSelector((state) => state.showVideo);
  const isShuffled = useSelector((state) => state.isShuffled);
  const isLooping = useSelector((state) => state.isLooping);
  const volume = useSelector((state) => state.volume);
  const token = useSelector((state) => state.token);
  const remoteControl = useSelector((state) => state.remoteControl);

  const onChange = async (e) => {
    switch (e.data) {
      case 1:
        dispatch(isPausedToggle(false));
        if (remoteControl) {
          await updateDoc(doc(db, "playlist", token), {
            isPaused: false,
          });
        }
        break;
      case 2:
        dispatch(isPausedToggle(true));
        if (remoteControl) {
          await updateDoc(doc(db, "playlist", token), {
            isPaused: true,
          });
        }
        break;
      case 3:
        dispatch(isPausedToggle(false));
        if (remoteControl) {
          await updateDoc(doc(db, "playlist", token), {
            isPaused: false,
          });
        }
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
    <div className="yt-player">
      <YouTube
        id="player"
        autoplay
        paused={isPaused}
        startSeconds={0}
        video={videoId}
        className={showVid ? "" : "hidden"}
        allowFullscreen={true}
        controls={false}
        modestBranding={true}
        onEnd={onVideoEnd}
        onStateChange={onChange}
        showCaptions={false}
        showRelatedVideos={false}
        showInfo={false}
        suggestedQuality={false}
        annotations={false}
        playsInline={true}
        volume={volume}
        // disableKeyboard={true}
      />
    </div>
  );
};

export default Ytplayer;
