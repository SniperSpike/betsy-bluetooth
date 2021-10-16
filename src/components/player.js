import React, { useState, useEffect } from "react";
import Header from "./layout/header.js";
import $ from "jquery";
import Song from "./song";
import Album from "./album";
import Lyrics from "./lyrics";
import { db } from "../firebase";
import Search from "../components/search";
import { useDispatch, useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { setPlaylist } from "../actions/index.js";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";

function Player(props) {
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlist);
  const colorPalette = useSelector((state) => state.colorPalette);

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

  function toggleQueue(event) {
    $(".queue-btn").removeClass("active");
    if (!isOpen) {
      setBtnToggle(false);
      $("#queue").css("top", "0");
      $("#current-video").slideToggle();
      setIsOpen(!isOpen);
    } else {
      $("#queue").css("top", "calc(calc(100vh - calc(100vh - 100%)) - 60px)");
      $("#current-video").slideToggle();
      setIsOpen(!isOpen);
    }
  }

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

  function setLyrics(event) {}

  if (playlist === undefined) {
    return <></>;
  } else {
    return (
      <div id="media-player" className="fix-nav">
        <div id="album">
          <Album />
          <div className="browser-search">
            <Search />
          </div>
        </div>
        <div id="queue">
          <div className="viewport-hidden"></div>
          <nav>
            <span
              className="queue-balk"
              onClick={(event) => toggleQueue(event)}
            ></span>
            <div id="queue-buttons">
              <button
                className="queue-btn"
                onClick={(event) => setUpNext(event)}
              >
                up next
              </button>
              <button
                className="queue-btn disabled"
                disabled
                onClick={(event) => setLyrics(event)}
              >
                lyrics
              </button>
              {colorPalette.map((item) => {
                return (
                  <div
                    style={{
                      width: "150px",
                      height: "50px",
                      backgroundColor: `rgb(${item[0]}, ${item[1]}, ${item[2]})`,
                      display: "inline-block",
                    }}
                  ></div>
                );
              })}
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
          <div id="lyrics" className={btnToggle ? "" : "hidden"}>
            <Lyrics />
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
