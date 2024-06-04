import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";
import Loader from "../Loader";
import { API_URL, RAPIDAPI_HOST, RAPIDAPI_KEY } from "../constant";

const SearchPlaces = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [places, setPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [limitPage, setLimitPage] = useState(5);
  const [limitIndicator, setLimitIndicator] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        url: API_URL,
        params: {
          namePrefix: debouncedSearchTerm,
          limit: limitPage,
          offset: (currentPage - 1) * itemsPerPage,
        },
        headers: {
          "x-rapidapi-host": RAPIDAPI_HOST,
          "x-rapidapi-key": RAPIDAPI_KEY,
        },
      };

      try {
        const response = await axios.request(options);
        setPlaces(response.data.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    if (debouncedSearchTerm) {
      fetchData();
    } else {
      setPlaces([]);
    }
  }, [debouncedSearchTerm, currentPage, itemsPerPage, limitIndicator]);

  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    const timer = setTimeout(func, delay);
    setDebounceTimer(timer);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debounce(() => {
      setDebouncedSearchTerm(value);
    }, 1000); // Delay of 2 seconds
  };

  const handleLimit = (e) => {
    const value = e.target.value;
    setLimitPage(value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleGlobalKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter" && searchTerm) {
      setDebouncedSearchTerm(event.target.value);
      console.log(event.target.value, "d");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = places.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(places.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return <div className="pagination">{pageNumbers}</div>;
  };

  return (
    <div className="search-places">
      <div className="top-box">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search places"
            onChange={handleSearch}
            className={`search-input searchMain ${searchTerm ? "filled" : ""}`}
            ref={inputRef}
            // onKeyDown={handleGlobalKeyDown}
            onKeyUp={handleKeyUp}
          />
          <div className="keyboard-shortcut">
            <span>Ctrl + /</span>
          </div>
        </div>
        <div className="limitButton">
          <input
            type="text"
            placeholder="Set Search Limit"
            onChange={handleLimit}
            className={`search-input-next`}
          />
          <span className="limitButton">
            <button onClick={() => setLimitIndicator((prev) => !prev)}>
              Set Limit
            </button>
          </span>
        </div>
        <div className="items-per-page">
          <label htmlFor="itemsPerPage">Items per page:</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          <div> Loading </div>
          <Loader isLoading={isLoading} />
        </div>
      ) : (
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
                  {searchTerm ? "No result found" : "Start searching"}
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
      )}
      {places.length > 0 && renderPagination()}
    </div>
  );
};

export default SearchPlaces;
