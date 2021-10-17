// import React, { useState, useEffect } from "react";
// import $ from "jquery";
// import {
//   Pause,
//   SkipNext,
//   SkipPrevious,
//   ThumbUpAltOutlined,
//   ThumbDownAltOutlined,
//   PlayArrow,
//   MoreVert,
//   Search,
//   Shuffle,
//   Loop,
// } from "@material-ui/icons";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   isPaused,
//   setIsLooping,
//   setIsShuffled,
//   showVideo,
// } from "../actions/index";
// import Ytplayer from "./ytplayer";
// import { db } from "../firebase";
// import betsy from "../images/trekker.png";
// import { deleteDoc, doc } from "@firebase/firestore";

// const Album = () => {
//   const dispatch = useDispatch();
//   const paused = useSelector((state) => state.isPaused);
//   const showVid = useSelector((state) => state.showVideo);
//   const songId = useSelector((state) => state.songId);
//   const playlist = useSelector((state) => state.playlist);
//   const isShuffled = useSelector((state) => state.isShuffled);
//   const isLooping = useSelector((state) => state.isLooping);
//   const token = useSelector((state) => state.token);

//   const [title, setTitle] = useState("Betsy Bluetooth Mediaplayer");
//   const [image, setImage] = useState(betsy);
//   const [artist, setArtist] = useState("");
//   // const [timeStamp, setTimeStamp] = useState("3:35");
//   const [first, setFirst] = useState(true);

//   const shuffleState = isShuffled ? "#10638d" : "";
//   const loopingState = isLooping ? "#10638d" : "";
//   const isFirstImage = first ? { width: "0px" } : { width: "auto" };
//   const firstTitle = first ? { fontSize: "22px" } : { fontSize: "16px" };

//   // eslint-disable-next-line
//   useEffect(updatePlaying, [songId]);

//   function updatePlaying() {
//     playlist.forEach((element) => {
//       if (songId === element.songId) {
//         setTitle(element.title);
//         setImage(`https://i.ytimg.com/vi/${element.songId}/mqdefault.jpg`);
//         setArtist(element.artist);
//         setFirst(false);
//       }
//     });
//   }

//   function skipSong(direction) {
//     playlist.forEach((element, index) => {
//       if (songId === element.songId) {
//         switch (direction) {
//           case "forward":
//             if (playlist[index + 1] !== undefined) {
//               $(`div[data-youtube-id="${playlist[index + 1].songId}"]`).click();
//             }
//             break;
//           case "backward":
//             if (playlist[index - 1] !== undefined) {
//               $(`div[data-youtube-id="${playlist[index - 1].songId}"]`).click();
//             }
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   }

//   const deleteVideo = async () => {
//     if (songId.length > 0) {
//       if (window.confirm("Weet u zeker dat u dit nummer wilt verwijderen?")) {
//         skipSong("forward");
//         await deleteDoc(
//           doc(db, "playlist", token, "queue", songId.replace(/-|_/g, ""))
//         );
//       }
//     }
//   };

//   function pause() {
//     dispatch(isPaused(!paused));
//   }

//   function toggleVideo() {
//     dispatch(showVideo());
//   }

//   function skipForward() {
//     skipSong("forward");
//   }

//   function skipBackward() {
//     skipSong("backward");
//   }

//   function toggleShuffle() {
//     dispatch(setIsShuffled());
//     if (isLooping) {
//       dispatch(setIsLooping());
//     }
//   }

//   function toggleLoop() {
//     dispatch(setIsLooping());
//     if (isShuffled) {
//       dispatch(setIsShuffled());
//     }
//   }

//   function search() {
//     $("#searchPopup").css("top", "0");
//     $(".searchBox").focus();
//   }

//   return (
//     <div id="album-player">
//       <div className="switch-button-container">
//         <Search
//           onClick={() => search()}
//           className="dropAlbum"
//           style={{ color: "white", marginTop: "2px" }}
//         />
//         <div
//           className="switch-button"
//           onClick={() => {
//             toggleVideo();
//           }}
//         >
//           <input className="switch-button-checkbox" type="checkbox"></input>
//           <label className="switch-button-label" htmlFor="">
//             <span className="switch-button-label-span">Song</span>
//           </label>
//         </div>
//         <MoreVert
//           onClick={() => deleteVideo()}
//           style={{ color: "white", marginTop: "2px" }}
//         />
//       </div>

//       <div className="album-photo">
//         <Ytplayer />
//         <div className={`album-photo-border ${showVid ? "hidden" : ""}`}>
//           <img
//             src={image}
//             alt="album"
//             className={showVid ? "hidden" : ""}
//             style={isFirstImage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Album;

// $(function () {
//   $(document)
//     .on("input", "input[type=range]", function (e) {
//       var min = e.target.min,
//         max = e.target.max,
//         val = e.target.value;

//       $(e.target).css({
//         backgroundSize: ((val - min) * 100) / (max - min) + "% 100%",
//       });
//     })
//     .trigger("input");
// });
