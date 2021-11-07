import React, { useState, useEffect } from "react";
import $ from "jquery";
import Song from "./song";
import Ytplayer from "./ytplayer";
import { db } from "../firebase";
import Cookies from "universal-cookie";
import Search from "../components/search";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import Favorite from "./favorite";
import { setPlaylist, setRemoteControl } from "../actions/index.js";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { Switch } from "@material-ui/core";

function Player(props) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);
  const remoteControl = useSelector((state) => state.remoteControl);
  const cookies = new Cookies();
  const toggleState = cookies.get("RemoteControl");

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "playlist", props.token, "queue"),
        orderBy("createdAt", "asc")
      ),
      (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        dispatch(setPlaylist(items));
      }
    );
    // eslint-disable-next-line
  }, []);

  const [btnToggle, setBtnToggle] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // function toggleQueue(event) {
  //   $(".queue-btn").removeClass("active");
  //   if (!isOpen) {
  //     setBtnToggle(false);
  //     $("#queue").css("top", "0");
  //     $("#current-video").slideToggle();
  //     setIsOpen(!isOpen);
  //   } else {
  //     $("#queue").css("top", "calc(calc(100vh - calc(100vh - 100%)) - 60px)");
  //     $("#current-video").slideToggle();
  //     setIsOpen(!isOpen);
  //   }
  // }

  function setUpNext(event) {
    setBtnToggle(false);
    $(".queue-btn").removeClass("active");
    event.currentTarget.classList.add("active");
    if (!isOpen) {
      $("#queue").css("top", "0");
      $("#current-video").slideToggle();
      setIsOpen(true);
    }
  }

  function setFavorite(event) {
    setBtnToggle(true);
    $(".queue-btn").removeClass("active");
    event.currentTarget.classList.add("active");
  }

  function toggleRemote() {
    // dispatch(setRemoteControl(!remoteControl));
    let d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
    cookies.remove("RemoteControl");
    cookies.set("RemoteControl", !remoteControl, { path: "/", expires: d });

    if (!remoteControl) {
      console.log("remote is on");
    } else {
      console.log("remote is off");
    }
  }

  if (playlist === undefined) {
    return <></>;
  } else {
    return (
      <div id="media-player" className="fix-nav">
        <div id="album">
          {/* <Album /> */}
          <Ytplayer />
          <div className="browser-search">
            <Search />
          </div>
        </div>
        <div id="queue">
          {/* <div className="viewport-hidden"></div> */}
          <nav>
            <div id="queue-buttons">
              <button
                className="queue-btn active"
                onClick={(event) => setUpNext(event)}
              >
                up next
              </button>
              <button
                className="queue-btn"
                onClick={(event) => setFavorite(event)}
              >
                Favorites
              </button>
            </div>
          </nav>

          <div id="queue-list" className={btnToggle ? "hidden" : ""}>
            <FlipMove maintainContainerHeight="true" className="queue-items">
              <div className="queue-options">
                <div className="queue-options__details">
                  <span>Remote control</span>
                  <span>
                    Enable remote control on the host device to make this
                    feature work.
                  </span>
                </div>
                {toggleState === true ? (
                  <Switch
                    disabled
                    defaultChecked
                    onClick={() => toggleRemote()}
                  />
                ) : (
                  <Switch disabled onClick={() => toggleRemote()} />
                )}
              </div>
              {playlist.map((item, index) => {
                return (
                  <div key={item.songId}>
                    <Song
                      key={item.songId}
                      index={index}
                      ytid={item.songId}
                      artist={item.artist}
                      title={item.title}
                      time={item.duration}
                    />
                  </div>
                );
              })}
            </FlipMove>
            {playlist.length === 0 ? (
              <p>Op dit moment staan er nog geen nummers in de playlist.</p>
            ) : (
              ""
            )}
          </div>
          <div id="favorite" className={btnToggle ? "" : "hidden"}>
            <Favorite />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
