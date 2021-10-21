import React from "react";
import $ from "jquery";
import logo from "../../images/trekker.png";
import CloseIcon from "@material-ui/icons/Close";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchValue,
  setSearchResults,
  selectedPlaylist,
  setPlaylistId,
} from "../../actions";

const API_KEY = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const value = useSelector((state) => state.search);
  const token = useSelector((state) => state.token);

  const sendSearch = async (e) => {
    e.preventDefault();
    videoSearch(API_KEY, value, 30);
  };

  const videoSearch = (key, search, maxResults) => {
    $.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResults}&q=${search}`,
      function (data) {
        dispatch(setSearchResults(data.items));
        // data.items.forEach((item) => {
        //   let video = (
        //     <SearchItem
        //       key={uuid}
        //       dataUrl={item.id.videoId}
        //       image={item.snippet.thumbnails.default.url}
        //       title={item.snippet.title}
        //       disc={item.snippet.channelTitle}
        //     />
        //   );
        //   let video = `
        //     <div class="searchItem" data-url="${item.id.videoId}">
        //         <img src="${item.snippet.thumbnails.default.url}"/>
        //         <div class="searchInfo">
        //             <p class="searchTitle">${item.snippet.title}</p>
        //             <span class="searchDisc">Video • ${item.snippet.channelTitle}</span>
        //         </div>
        //     </div>
        //     `;
        //   $("#album").append(video);
        //   $("#mobielResults").append(video);
        // });
      }
    );
  };

  // const addSong = (songId) => {
  //   const { uid } = auth.currentUser;
  //   let duration;
  //   if (isAddingSong === false) {
  //     dispatch(isAddingSongToggle(true));
  //     $.get(
  //       `https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=contentDetails&key=${API_KEY}`,
  //       function (data) {
  //         data.items.forEach((item) => {
  //           let total = item.contentDetails.duration;
  //           duration = total;
  //         });
  //       }
  //     );
  //     console.log(duration);
  //     $.get(
  //       `https://www.googleapis.com/youtube/v3/videos?id=${songId}&part=snippet&key=${API_KEY}`,
  //       function (data2) {
  //         // console.log(data2);
  //         // data2.items.forEach((item) => {
  //         //   let title = item.snippet.title;
  //         //   let artist = item.snippet.channelTitle;
  //         //   let photoURL = item.snippet.thumbnails.default.url;
  //         //   firestore
  //         //     .collection("playlist")
  //         //     .where("token", "==", token)
  //         //     .onSnapshot(async (res) => {
  //         //       res.forEach((doc) => {
  //         //         let queueRef = firestore.collection(
  //         //           `${doc.ref.path}/queue`
  //         //         );
  //         //         queueRef.doc(songId.replace(/-|_/g, "")).set({
  //         //           token,
  //         //           songId: songId,
  //         //           title,
  //         //           artist,
  //         //           photoURL,
  //         //           duration,
  //         //           uid,
  //         //           createdAt:
  //         //             firebase.firestore.FieldValue.serverTimestamp(),
  //         //         });
  //         //       });
  //         //     });
  //         // });
  //       }
  //     );
  //   }
  // };

  const returnToHome = () => {
    if (props.page === "home") {
      dispatch(selectedPlaylist([]));
      dispatch(setPlaylistId(""));

      const homepage = document.querySelector(".homepage");
      const playlistInfo = document.querySelector(".playlistInfo");
      playlistInfo.style.display = "none";
      homepage.style.display = "block";
    } else {
      window.location.href = "/home";
    }
  };

  const renderLogo = () => {
    if (props.type === "desktop") {
      return (
        <div onClick={() => returnToHome()} className={`logo`}>
          <img className="logo-icon" src={logo} alt="betsy" />
          <span>Music</span>
        </div>
      );
    }
  };

  const backIcon = () => {
    if (props.type === "mobiel") {
      return (
        <KeyboardArrowLeft
          onClick={(event) => goBack(event)}
          style={{ color: "white", fontSize: "2em" }}
        />
      );
    }
  };

  const closeIcon = (e) => {
    dispatch(setSearchValue(""));
    $(".closeIcon").addClass("no-pointer");
    $("#search").focus();
  };

  const searchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    if (e.target.value.length !== 0) {
      $(".closeIcon").removeClass("no-pointer");
    } else {
      $(".closeIcon").addClass("no-pointer");
    }
  };

  // $(function () {
  //   $(document).on("click", ".searchItem", function (e) {
  //     let yt = $(this).attr("data-url");
  //     // addSong(yt);
  //     console.log("dit");
  //   });
  // });

  return (
    <header id="searchBar">
      <nav id="search-nav">
        {renderLogo()}
        <div className="container-sm">
          {backIcon()}
          <form id="form" onSubmit={sendSearch}>
            <div className="searchBarInput">
              <input
                id="search"
                type="text"
                className="searchBox"
                autoComplete="off"
                placeholder="Zoeken"
                maxLength="170"
                onChange={(e) => searchChange(e)}
                value={useSelector((state) => state.search)}
              />
              <CloseIcon
                className="closeIcon no-pointer"
                onClick={() => closeIcon()}
              />
            </div>
          </form>
        </div>
        <div className="account">
          <img src={user.photoURL} alt="profile" referrerPolicy="no-referrer" />
        </div>
      </nav>
      <nav id="invite-nav">
        <p>{token}</p>
      </nav>
    </header>
  );
};

export default Header;

export function goBack(e) {
  $("#searchPopup").css("top", "calc(100vh - calc(100vh - 100%))");
}
