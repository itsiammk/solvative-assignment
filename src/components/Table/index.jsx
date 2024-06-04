import React from "react";

const Table = ({ places, currentPage, itemsPerPage }) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = places.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <table className="table-main">
      <thead>
        <tr className="borderClass">
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length === 0 ? (
          <tr className="noItem">
            <td colSpan="3">
              {places.length > 0 ? "No result found" : "Start searching"}
            </td>
          </tr>
        ) : (
          currentItems.map((place, index) => (
            <tr key={place.id}>
              <td className="text-bold">{indexOfFirstItem + index + 1}</td>
              <td>{place.name}</td>
              <td>
                <img
                  src={`https://flagsapi.com/${place.countryCode}/shiny/64.png`}
                  alt={place.country}
                  className="flag"
                />
                {place.country}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
