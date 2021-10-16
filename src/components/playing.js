import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPaused } from "../actions";
import { Equalizer, Pause, PlayArrow, SkipNext } from "@material-ui/icons";

const Playing = (props) => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.isPaused);
  const playlist = useSelector((state) => state.playlist);
  const songId = useSelector((state) => state.songId);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [artist, setArtist] = useState("");

  // eslint-disable-next-line
  useEffect(updatePlaying, [songId]);

  function pause(event) {
    dispatch(isPaused(!paused));
  }

  function updatePlaying() {
    playlist.forEach((element) => {
      if (songId === element.songId) {
        setTitle(element.title);
        setImage(element.songId);
        setArtist(element.artist);
      }
    });
  }

  return (
    <div id="audio-player">
      <div className="queue-song song-display">
        <div className="details-left">
          <div>
            <Equalizer />
          </div>
          <img
            src={`https://i.ytimg.com/vi/${image}/mqdefault.jpg`}
            alt="album cover"
          />
        </div>
        <div className="details">
          <span className="details-title">{title}</span>
          <span className="details-artist">{`${artist}`}</span>
        </div>
        <div className="details-right">
          {paused ? (
            <PlayArrow onClick={(event) => pause(event)} />
          ) : (
            <Pause onClick={(event) => pause(event)} />
          )}
          <SkipNext />
        </div>
      </div>
    </div>
  );
};

export default Playing;
