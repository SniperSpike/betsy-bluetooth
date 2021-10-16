import React from "react";
import { useSelector } from "react-redux";
import SearchItem from "../components/searchItem";
import FlipMove from "react-flip-move";

const Search = () => {
  const searchResults = useSelector((state) => state.searchResults);
  return (
    <>
      <FlipMove maintainContainerHeight="true" className="search-results">
        {searchResults.map((item) => {
          return (
            <div key={item.id.videoId}>
              <SearchItem
                dataUrl={item.id.videoId}
                image={item.snippet.thumbnails.default.url}
                title={item.snippet.title}
                disc={item.snippet.channelTitle}
              />
            </div>
          );
        })}
      </FlipMove>
    </>
  );
};

export default Search;
