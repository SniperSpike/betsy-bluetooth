import videoIdReducer from "./songId";
import showVideo from "./showVideo";
import tokenReducer from "./token";
import searchReducer from "./searchValue";
import userReducer from "./user";
import isAddingSong from "./isAddingSong";
import { combineReducers } from "redux";
import setSearchResults from "./searchResults";
import setPlaylist from "./setPlaylist";
import isPaused from "./isPaused";
import isShuffled from "./isShuffled";
import isLooping from "./isLooping";
import colorPalette from "./colorPalette";

const allReducers = combineReducers({
  playlist: setPlaylist,
  token: tokenReducer,
  songId: videoIdReducer,
  isPaused,
  isShuffled,
  isLooping,
  showVideo,
  search: searchReducer,
  searchResults: setSearchResults,
  isAddingSong,
  colorPalette,
  user: userReducer,
});

export default allReducers;
