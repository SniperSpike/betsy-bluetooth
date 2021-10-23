import React, { useState } from "react";
import $ from "jquery";
import Cookies from 'universal-cookie'
import logo from "../../images/trekker.png";
import CloseIcon from "@material-ui/icons/Close";
import { CastConnected, Home, KeyboardArrowLeft, LibraryMusic, Search } from "@material-ui/icons";
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
  // const token = useSelector((state) => state.token);
  const [toggleSearch, setToggleSearch] = useState(false);

  const cookies = new Cookies();
  const cookieToken = cookies.get('recent-token');

  const sendSearch = async (e) => {
    e.preventDefault();
    videoSearch(API_KEY, value, 30);
  };

  const videoSearch = (key, search, maxResults) => {
    $.get(
      `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=${maxResults}&q=${search}`,
      function (data) {
        dispatch(setSearchResults(data.items));
      }
    );
  };

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

  const both = () =>{
    setToggleSearch(false);
    returnToHome();
  }

  const renderLogo = () => {
    if (props.type === "desktop") {
      return (
        <div onClick={() => both()} className={`logo`}>
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

  const goHome = () => {
    if(props.page !== "home"){
      window.location.href = "/home"
    }
  }
  
  const goJoin = () => {
    if(props.page !== "join"){
      window.location.href = "/join";
    }
  }

  const goParty = (token) => {
    if(props.page !== token){
      window.location.href = `/${token}`;
    }
   
  }

  const searchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    if (e.target.value.length !== 0) {
      $(".closeIcon").removeClass("no-pointer");
    } else {
      $(".closeIcon").addClass("no-pointer");
    }
  };

  return (
    <header id="searchBar">
      <nav id="search-nav">
        {renderLogo()}
        <div className="container-sm">
          {backIcon()}
          <form id="form" onSubmit={sendSearch} className={toggleSearch ? "" : "hidden"}>
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
          <ul className={toggleSearch ? "hidden" : "navbar"}>
            <li className="active" onClick={() => goHome()}><Home className="nav-icons"/>Home</li>
            <li onClick={() => goJoin()}  className={cookieToken ? "hidden" : ""}><CastConnected className="nav-icons"/>Join</li>
            <li onClick={() => goParty(cookieToken)} className={cookieToken ? "tokenli" : "hidden"}>{cookieToken}</li>
            <li><LibraryMusic className="nav-icons"/>Library</li>
            <li onClick={() => setToggleSearch(!toggleSearch)}><Search/> Search</li>
          </ul>
        </div>
        <div className="account">
          <img src={user.photoURL} alt="profile" referrerPolicy="no-referrer" />
        </div>
      </nav>
      {/* <nav id="invite-nav">
        <p>{token}</p>
      </nav> */}
    </header>
  );
};

export default Header;

export function goBack(e) {
  $("#searchPopup").css("top", "calc(100vh - calc(100vh - 100%))");
}
