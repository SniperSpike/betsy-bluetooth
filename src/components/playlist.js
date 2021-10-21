import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { uuid } from "uuidv4";
import PlaylistItem from "./playlistItem";
import { IconButton } from "@material-ui/core";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  VerifiedUserTwoTone,
} from "@material-ui/icons";

const Playlist = (props) => {
  const user = useSelector((state) => state.user);
  const token = "AIzaSyArK7LW94cC06E2Kxb6lV3Hql3g6HTaU30";
  const [playlist, setPlaylist] = useState([]);
  const [image, setImage] = useState(
    "http://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_large_dark.jpg"
  );
  const channelId = props.channelId;
  const channelName = props.user;
  const subs = props.subs;
  const isVerified = props.isVerified;
  let scrollAmount = 0;
  // eslint-disable-next-line
  let scrollMax;
  const scrollForward = () => {
    let container = document.querySelector(`#${channelId}`);
    scrollMax = container.clientWidth;

    container.scrollTo({
      top: 0,
      left: (scrollAmount += 1290),
      behavior: "smooth",
    });
    if (scrollAmount > 1200) {
      document.querySelector(`.${channelId}`).style.opacity = "1";
    } else {
      document.querySelector(`.${channelId}`).style.opacity = "0";
    }
  };

  const scrollBackward = () => {
    let container = document.querySelector(`#${channelId}`);
    scrollMax = container.clientWidth;
    if (scrollAmount <= 0) {
      scrollAmount = 0;
    }

    container.scrollTo({
      top: 0,
      left: (scrollAmount -= 1290),
      behavior: "smooth",
    });

    if (scrollAmount > 1200) {
      document.querySelector(`.${channelId}`).style.opacity = "1";
    } else {
      document.querySelector(`.${channelId}`).style.opacity = "0";
    }
  };

  useEffect(() => {
    getPlaylist();
    getUserData();
    // eslint-disable-next-line
  }, [user]);

  const getPlaylist = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet,status&maxResults=50&channelId=${channelId}&key=${token}`
      )
      .then((res) => {
        console.log(res);
        if (res.data.items[0].status.privacyStatus === "public") {
          setPlaylist(res.data.items);
        }
      });
  };

  const getUserData = () => {
    if (props.type === "library") return;
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&fields=items%2Fsnippet%2Fthumbnails&key=${token}
    `
      )
      .then((res) => {
        setImage(res.data.items[0].snippet.thumbnails.medium.url);
      });
  };

  return (
    <div className=" container playlistBox">
      <div className="playlistBox__info">
        <img src={image} alt="profilepicture" />
        <div>
          <h2 style={{ color: "white", fontWeight: "bold" }}>
            {channelName} {isVerified ? <VerifiedUserTwoTone /> : <></>}
          </h2>
          <span
            style={{
              color: "#9E9E9E",
              fontWeight: "bold",
              marginBottom: "2em",
              display: "block",
            }}
          >
            {subs} subscribers
          </span>
        </div>
      </div>
      <div className="slider">
        <IconButton
          className={`sliderBtn ${channelId}`}
          onClick={() => scrollBackward()}
        >
          <KeyboardArrowLeft />
        </IconButton>
        <div id={`${channelId}`} className={"playlistContainer "}>
          {playlist.map((item, index) => {
            if (
              item.snippet.thumbnails.high ===
              "https://i.ytimg.com/img/no_thumbnail.jpg"
            ) {
              return <></>;
            } else {
              return (
                <PlaylistItem
                  key={uuid()}
                  index={index}
                  playlistId={item.id}
                  thumb={item.snippet.thumbnails.high}
                  title={item.snippet.localized.title}
                  user={item.snippet.channelTitle}
                  data={item}
                />
              );
            }
          })}
        </div>
        <IconButton
          className={`sliderBtn ${channelId}`}
          onClick={() => scrollForward()}
        >
          <KeyboardArrowRight />
        </IconButton>
      </div>
    </div>
  );
};

export default Playlist;
