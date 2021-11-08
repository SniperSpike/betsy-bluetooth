import React, { useState } from "react";
import $ from "jquery";
import Cookies from "universal-cookie";
import logo from "../../images/trekker.png";
import CloseIcon from "@material-ui/icons/Close";
import {
  ArrowLeft,
  CastConnected,
  ExitToApp,
  Home,
  KeyboardArrowLeft,
  LibraryMusic,
  Search,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchValue,
  setSearchResults,
  selectedPlaylist,
  setPlaylistId,
  setUser,
} from "../../actions";
import { auth } from "../../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "@firebase/auth";
import { firebase } from "../../firebase";
import { Link } from "react-router-dom";

const API_KEY = "AIzaSyDDRrKbPOjqy7r1VnoGjpKOhq7g7ZCNtjE";

const Header = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const value = useSelector((state) => state.search);
  // const token = useSelector((state) => state.token);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [accountToggle, setAcountToggle] = useState(false);

  const cookies = new Cookies();
  const cookieToken = cookies.get("recent-token");
  const issetToken = cookies.get("recent-token") ? "" : "hidden";

  const signInWithGoogle = () => {
    $(".account > button").attr("disabled", true);
    const provider = new GoogleAuthProvider(firebase);
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        dispatch(setUser(user));
      })
      .catch((error) => {
        // Handle Errors here.
        $(".account > button").attr("disabled", false);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(user));
    }
  });

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

  const both = () => {
    setToggleSearch(false);
    returnToHome();
  };

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

  const searchChange = (e) => {
    dispatch(setSearchValue(e.target.value));
    if (e.target.value.length !== 0) {
      $(".closeIcon").removeClass("no-pointer");
    } else {
      $(".closeIcon").addClass("no-pointer");
    }
  };

  const closeSearch = () => {
    setToggleSearch(false);
    dispatch(setSearchResults([]));
    dispatch(setSearchValue(""));
  };

  const removeCookies = () => {
    cookies.remove("recent-token");
    window.location.href = "/home";
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <header id="searchBar">
      <nav id="search-nav">
        {renderLogo()}
        <div className="container-sm">
          {backIcon()}
          <form
            id="form"
            onSubmit={sendSearch}
            className={toggleSearch ? "" : "hidden"}
          >
            <ArrowLeft onClick={() => closeSearch()} />
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
            <li>
              <Link to="/" className={props.page === "home" ? "active" : ""}>
                <Home className="nav-icons" />
                Home
              </Link>
            </li>
            <li className={cookieToken ? "hidden" : ""}>
              <Link
                to="/join"
                className={props.page === "join" ? "active" : ""}
              >
                <CastConnected className="nav-icons" />
                Join
              </Link>
            </li>
            <li className={cookieToken ? "tokenli" : "hidden"}>
              <Link
                to={`/${cookieToken}`}
                className={props.page === cookieToken ? "active" : ""}
              >
                {cookieToken}
              </Link>
            </li>
            <li>
              <Link to="/">
                <LibraryMusic className="nav-icons" />
                Library
              </Link>
            </li>
            <li onClick={() => setToggleSearch(!toggleSearch)}>
              <Search /> Search
            </li>
          </ul>
        </div>
        <div className="account">
          {user.length === 0 ? (
            <button className="loginBtn" onClick={() => signInWithGoogle()}>
              SIGN IN
            </button>
          ) : (
            <>
              <img
                src={user.photoURL}
                alt="profile"
                referrerPolicy="no-referrer"
                onClick={() => setAcountToggle(!accountToggle)}
              />
              <div className={accountToggle ? "accountSettings" : "hidden"}>
                <div className="accountSettings__userInfo">
                  <img
                    src={user.photoURL}
                    alt="profile"
                    referrerPolicy="no-referrer"
                  />
                  <span>Slimper</span>
                </div>
                <ul className="accountSettings__ul">
                  <li onClick={() => removeCookies()} className={issetToken}>
                    <ExitToApp /> Leave party
                  </li>
                  <li onClick={() => logout()}>
                    <ExitToApp /> Sign out
                  </li>
                </ul>
              </div>
            </>
          )}
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
