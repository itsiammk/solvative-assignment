import React from "react";

const ItemsPerPageSelect = ({ itemsPerPage, handleItemsPerPageChange }) => {
  return (
    <div className="items-per-page">
      <label htmlFor="itemsPerPage">Items per page:</label>
      <select
        id="itemsPerPage"
        value={itemsPerPage}
        onChange={(e) => handleItemsPerPageChange(e.target.value)}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemsPerPageSelect;
