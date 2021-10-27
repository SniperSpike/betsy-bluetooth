import React, { useState, useEffect } from "react";
import $ from "jquery";
import { MoreVert, Shuffle } from "@material-ui/icons";
import { useSelector } from "react-redux";
import AddToLib from "./addToLib";

const InfoCard = () => {
  const data = useSelector((state) => state.selectedPlaylist);
  const [image, setImage] = useState("");
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setUser(data.user);
    if (data.thumb !== undefined) {
      setImage(data.thumb.url);
    }
    setTitle(data.title);
    setTimeout(() => {
      setAmount($(".playlistTable > div").length - 1);
    }, 1000);
  }, [data]);

  return (
    <div>
      <div className="infoContainer">
        <div className="infoContainer__left">
          <img src={image} alt="" />
        </div>
        <div className="infoContainer__right">
          <h1 className="infoContainer__title">{title}</h1>
          <span className="infoContainer__data">
            Playlist • {user} • 2021 <br />
            {amount} songs • 8 hours, 10 minutes
          </span>
          <span className="infoContainer__disc">
            A mix of the songs you've been listening to most in the last few
            weeks.
          </span>
          <div className="infoContainer__right--buttons">
            <button>
              <Shuffle />
              SHUFFLE
            </button>
            <AddToLib />
            <MoreVert className="right__buttons--morevert" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
