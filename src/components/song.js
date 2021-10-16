import React from "react";
import $ from "jquery";
import { db } from "../firebase";
import { Equalizer, MoreVert } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { isPausedToggle, setSong } from "../actions";
import { YTDurationToSeconds, secondsToHms } from "./global";
import { deleteDoc, doc } from "@firebase/firestore";

function resize_to_fit() {
  var fontsize = $(".album-details > .title-items > .title").css("font-size");
  $(".album-details > .title-items > .title").css(
    "font-size",
    parseFloat(fontsize) - 1
  );

  if ($(".album-details > .title-items > .title").height() < 50) return;
  if (
    $(".album-details > .title-items > .title").height() >=
    $(".album-details > .title-items").height()
  ) {
    resize_to_fit();
  }
}

const Song = (props) => {
  const dispatch = useDispatch();
  const paused = useSelector((state) => state.isPaused);
  const token = useSelector((state) => state.token);

  const settings = (event) => {
    event.stopPropagation();
    deleteVideo(event.currentTarget.dataset.youtubeId);
  };

  const deleteVideo = async (videoID) => {
    if (window.confirm("Weet u zeker dat u dit nummer wilt verwijderen?")) {
      await deleteDoc(
        doc(db, "playlist", token, "queue", videoID.replace(/-|_/g, ""))
      );
    }
  };

  const openVideo = (event, ytid, title, artist, duration) => {
    let imgUrl = `https://i.ytimg.com/vi/${ytid}/mqdefault.jpg`;
    $("svg").removeClass("current-equalizer");
    $(".details-left > div").removeClass("currently-playing");
    $(".queue-song").removeClass("selected");
    event.currentTarget.children[0].children[0].classList.add(
      "currently-playing"
    );
    event.currentTarget.classList.add("selected");
    $("#current-video").show();

    $(".currently-playing > .equalizer").addClass("current-equalizer");

    $(".album-photo-border img").attr("src", imgUrl);
    $(".album-details > .title-items > .title").text(title);
    $(".album-details > .title-items > .title").css({ "font-size": "" });
    resize_to_fit();
    $(".album-details > .artist").text(artist);

    let youtube_id = event.currentTarget.dataset.youtubeId;
    if (paused === true) {
      dispatch(isPausedToggle(false));
    }
    dispatch(setSong(youtube_id));
  };

  const duration = secondsToHms(parseInt(YTDurationToSeconds(props.time)));

  return (
    <div
      className="queue-song"
      data-youtube-id={props.ytid}
      onClick={(event) =>
        openVideo(event, props.ytid, props.title, props.artist, duration)
      }
    >
      <div className="details-left">
        <div>
          <Equalizer className="equalizer" />
        </div>
        <img
          src={`https://i.ytimg.com/vi/${props.ytid}/mqdefault.jpg`}
          alt="album cover"
        />
      </div>
      <div className="details">
        <span className="details-title">{props.title}</span>
        <span className="details-artist">{`${props.artist} • ${duration}`}</span>
      </div>
      <div className="details-right">
        <button
          className="details-btn"
          data-youtube-id={props.ytid}
          onClick={(event) => settings(event)}
        >
          <MoreVert />
        </button>
      </div>
    </div>
  );
};

export default Song;
