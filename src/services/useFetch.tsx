import { useEffect, useState } from "react";
import customFetch from "./customFetch";

const useFetch = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await customFetch(url);
      setData(res);
      setLoading(false);
    };

    fetchPosts();
  }, [url]);

  return { data, loading, setData };
};

export default useFetch;
