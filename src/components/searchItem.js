import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, auth } from "../firebase";
import { setSearchResults, setSearchValue } from "../actions";
import { goBack } from "./layout/header";
import $ from "jquery";
import { doc, setDoc, serverTimestamp } from "@firebase/firestore";

const SearchItem = ({ title, disc, image, dataUrl }) => {
  const dispatch = useDispatch();
  const API_KEY = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";
  const token = useSelector((state) => state.token);

  const addSong = async (songId) => {
    const { uid } = auth.currentUser;
    let duration;
    console.log(songId);
    $.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=contentDetails&key=${API_KEY}`,
      async function (data) {
        data.items.forEach((item) => {
          let total = item.contentDetails.duration;
          duration = total;
        });
        $.get(
          `https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=snippet&key=${API_KEY}`,
          async function (data2) {
            data2.items.forEach(async (item) => {
              let title = item.snippet.title;
              let artist = item.snippet.channelTitle;
              let photoURL = item.snippet.thumbnails.default.url;
              await setDoc(
                doc(db, "playlist", token, "queue", songId.replace(/-|_/g, "")),
                {
                  token,
                  songId: songId,
                  title,
                  artist,
                  photoURL,
                  duration,
                  uid,
                  createdAt: serverTimestamp(),
                }
              );
              goBack();
              setTimeout(() => {
                dispatch(setSearchValue(""));
                dispatch(setSearchResults([]));
              }, 300);
            });
          }
        );
      }
    );
  };

  return (
    <div
      className="searchItem"
      data-url={dataUrl}
      onClick={(e) => addSong(dataUrl)}
    >
      <img src={image} alt="" />
      <div className="searchInfo">
        <p className="searchTitle">{title}</p>
        <span className="searchDisc">Video • {disc}</span>
      </div>
    </div>
  );
};

export default SearchItem;
