import React from "react";

const SearchInput = ({ searchTerm, handleSearch, inputRef, handleKeyUp }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search places"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        ref={inputRef}
        onKeyUp={handleKeyUp}
        className={`search-input searchMain ${searchTerm ? "filled" : ""}`}
      />
      <div className="keyboard-shortcut">
        <span>Ctrl + /</span>
      </div>
    </div>
  );
};

export default SearchInput;
