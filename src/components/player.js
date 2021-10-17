import React, { useState, useEffect } from "react";
import Header from "./layout/header.js";
import $ from "jquery";
import Song from "./song";
import Ytplayer from "./ytplayer";
import { db } from "../firebase";
import Search from "../components/search";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import Favorite from "./favorite";
import { setPlaylist } from "../actions/index.js";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

function Player(props) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);

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
          <div className="viewport-hidden"></div>
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
              {playlist.map((item, index) => {
                return (
                  <div key={item.songId}>
                    <Song
                      key={item.songId}
                      index={index + 1}
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
        <div id="searchPopup">
          <Header type="mobiel" />
          <div id="mobielResults" className="fix-nav">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
