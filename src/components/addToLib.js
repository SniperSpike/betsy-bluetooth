import React from "react";
import { Queue } from "@material-ui/icons";
import { useSelector } from "react-redux";
import axios from "axios";

const AddToLib = (props) => {
  const token = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";
  const playlistId = useSelector((state) => state.playlistId);

  const addLibrary = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,id,status&maxResults=50&playlistId=${playlistId}&key=${token}`
      )
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <button onClick={() => addLibrary()}>
      <Queue />
      ADD TO LIBRARY
    </button>
  );
};

export default AddToLib;
