import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": process.env.EXPO_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("there is an error fetching data");
    } finally {
      setIsLoading(false);
    }
  };
  const memoizedFetchData = useMemo(() => fetchData, []);
  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  const reFetch = () => {
    setIsLoading(true), fetchData();
  };

  return { data, isLoading, error, reFetch };
};

export default useFetch;
