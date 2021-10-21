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
import volumeReducer from "./volume";
import selected from "./selectedPlaylist";
import setPlaylistId from "./setPlaylistId";

const allReducers = combineReducers({
  playlist: setPlaylist,
  token: tokenReducer,
  playlistId: setPlaylistId,
  songId: videoIdReducer,
  volume: volumeReducer,
  selectedPlaylist: selected,
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
