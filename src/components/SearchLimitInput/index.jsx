import React from "react";

const SearchLimitInput = ({ limitPage, handleLimit, setLimitIndicator }) => {
  return (
    <div className="limitButton">
      <input
        type="text"
        placeholder="Set Search Limit"
        value={limitPage}
        onChange={(e) => handleLimit(e.target.value)}
        className="search-input-next"
      />
      <span className="limitButton">
        <button onClick={() => setLimitIndicator((prev) => !prev)}>
          Set Limit
        </button>
      </span>
    </div>
  );
};

export default SearchLimitInput;
