import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uuid } from "uuidv4";
import InfoCard from "./infoCard";
import TableItem from "./tableItem";

const PlaylistInfo = () => {
  const token = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";
  const playlistId = useSelector((state) => state.playlistId);

  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,id,status&maxResults=50&playlistId=${playlistId}&key=${token}`
      )
      .then((res) => {
        setPlaylist(res.data.items);
      });
  }, [playlistId]);

  return (
    <div className="container playlistInfo">
      <InfoCard />
      <div className="playlistTable">
        {playlist.map((item) => {
          const data = item.snippet;
          if (item.status.privacyStatus === "private") {
            return <></>;
          } else {
            return (
              <TableItem
                title={data.title}
                author={data.videoOwnerChannelTitle}
                thumb={data.thumbnails}
                key={uuid()}
              />
            );
          }
        })}
        <div style={{ marginBottom: "10em", display: "block" }}></div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
