import { IconButton } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { selectedPlaylist, setPlaylistId } from "../actions";

const PlaylistItem = (props) => {
  const dispatch = useDispatch();

  const SetPlaylist = () => {
    dispatch(selectedPlaylist(props));
    dispatch(setPlaylistId(props.playlistId));
    const homepage = document.querySelector(".homepage");
    const playlistInfo = document.querySelector(".playlistInfo");
    setTimeout(() => {
      homepage.style.display = "none";
      playlistInfo.style.display = "block";
    }, 100);
  };

  if (props.thumb.url === "https://i.ytimg.com/img/no_thumbnail.jpg")
    return <></>;

  return (
    <div className="playlistItem">
      <div className="playlistItem__imageContainer">
        <img src={`${props.thumb.url}`} loading="lazy" height="226px" alt="" />
      </div>
      <div className="playlistItem__overlay">
        <div>
          <IconButton
            onClick={() => SetPlaylist()}
            className="playlistItem__overlay--arrow"
          >
            <PlayArrow />
          </IconButton>
        </div>
      </div>
      <span style={{ maxWidth: "220px" }} onClick={() => SetPlaylist()}>
        {props.title}
      </span>
      <span>{props.user}</span>
    </div>
  );
};

export default PlaylistItem;
