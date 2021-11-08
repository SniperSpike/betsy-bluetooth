import React, { useState, useEffect } from "react";
import { Box, IconButton, Slider } from "@material-ui/core";
import $ from "jquery";
import {
  ArrowLeft,
  Loop,
  MoreVert,
  Pause,
  PlayArrow,
  Shuffle,
  SkipNext,
  SkipPrevious,
  ThumbDownOutlined,
  ThumbUpOutlined,
  VolumeDown,
  VolumeOff,
  VolumeUp,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { isPaused, setVolume } from "../../actions";
import betsy from "../../images/trekker.png";
import { db } from "../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

const Footer = () => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.isPaused);
  const songId = useSelector((state) => state.songId);
  const playlist = useSelector((state) => state.playlist);
  const token = useSelector((state) => state.token);
  const volume = useSelector((state) => state.volume);
  const remoteControl = useSelector((state) => state.remoteControl);

  const [title, setTitle] = useState("Betsy Bluetooth Mediaplayer");
  const [image, setImage] = useState(betsy);
  const [artist, setArtist] = useState("");

  const [value, setValue] = useState(30);
  const [oldVolume, setOldVolume] = useState(30);

  // eslint-disable-next-line
  useEffect(updatePlaying, [songId]);

  function updatePlaying() {
    playlist.forEach((element) => {
      if (songId === element.songId) {
        setTitle(element.title);
        setImage(`https://i.ytimg.com/vi/${element.songId}/mqdefault.jpg`);
        setArtist(element.artist);
        // setFirst(false);
      }
    });
  }

  const deleteVideo = async () => {
    if (songId.length > 0) {
      if (window.confirm("Weet u zeker dat u dit nummer wilt verwijderen?")) {
        skipSong("forward");
        await deleteDoc(
          doc(db, "playlist", token, "queue", songId.replace(/-|_/g, ""))
        );
      }
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setVolume(newValue / 100));
  };

  const handleSubmit = async (event) => {
    dispatch(setVolume(value / 100));
    if (remoteControl) {
      await updateDoc(doc(db, "playlist", token), {
        volume: value / 100,
      });
    }
  };

  function skipSong(direction) {
    playlist.forEach((element, index) => {
      if (songId === element.songId) {
        switch (direction) {
          case "forward":
            if (playlist[index + 1] !== undefined) {
              $(`div[data-youtube-id="${playlist[index + 1].songId}"]`).click();
            }
            break;
          case "backward":
            if (playlist[index - 1] !== undefined) {
              $(`div[data-youtube-id="${playlist[index - 1].songId}"]`).click();
            }
            break;
          default:
            break;
        }
      }
    });
  }

  function pause(event) {
    dispatch(isPaused(!paused));
  }

  function skipForward() {
    skipSong("forward");
  }

  function skipBackward() {
    skipSong("backward");
  }

  function volumeIcons() {
    if (volume === 0) {
      return (
        <VolumeOff
          onClick={() => mute()}
          className="controller__right--button"
        />
      );
    } else if (volume * 100 <= 50) {
      return (
        <VolumeDown
          onClick={() => mute()}
          className="controller__right--button"
        />
      );
    } else {
      return (
        <VolumeUp
          onClick={() => mute()}
          className="controller__right--button"
        />
      );
    }
  }

  function mute() {
    console.log(volume);
    if (volume !== 0) {
      setOldVolume(volume);
      dispatch(setVolume(0));
      setValue(0);
    } else {
      dispatch(setVolume(oldVolume));
      setValue(oldVolume * 100);
    }
  }

  return (
    <footer className="controller">
      <div className="controller__left">
        <SkipPrevious
          onClick={() => skipBackward()}
          className="controller__left--sideControls"
        />
        {paused ? (
          <>
            <IconButton
              onClick={() => pause()}
              className="controller__left--mainControls"
            >
              <PlayArrow />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              onClick={() => pause()}
              className="controller__left--mainControls"
            >
              <Pause />
            </IconButton>
          </>
        )}
        <SkipNext
          onClick={() => skipForward()}
          className="controller__left--sideControls"
        />
      </div>
      {/* middle */}
      <div className="controller__middle">
        <img src={image} alt="" />
        <div className="controller__middle--info">
          <span>{title}</span>
          <span>{artist}</span>
        </div>
        <IconButton
          onClick={() => skipForward()}
          className="controller__middle--button"
        >
          <ThumbDownOutlined />
        </IconButton>
        <IconButton className="controller__middle--button">
          <ThumbUpOutlined />
        </IconButton>
        <IconButton
          onClick={() => deleteVideo()}
          className="controller__middle--button"
        >
          <MoreVert />
        </IconButton>
      </div>
      {/* right */}
      <div className="controller__right">
        <div className="controller__right--onhover">
          <Box className="controller__right--slider" sx={{ width: 80 }}>
            <Slider
              aria-label="Volume"
              value={value}
              onChange={handleChange}
              onMouseUp={handleSubmit}
            />
          </Box>
          {volumeIcons()}
          <Loop className="controller__right--button" />
          <Shuffle className="controller__right--button" />
        </div>
        <ArrowLeft className="controller__right--arrow" />
      </div>
    </footer>
  );
};

export default Footer;
