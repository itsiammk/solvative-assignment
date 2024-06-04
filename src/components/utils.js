import axios from "axios";

export const fetchData = async (url, params, headers) => {
    try {
      const response = await axios.get(url, { params, headers });
      return response.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };