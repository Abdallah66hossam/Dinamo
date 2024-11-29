import axios, { AxiosRequestConfig } from "axios";
import { handleErrors } from "./handleErrors.ts";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type CustomFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any> | FormData;
};

const customFetch = async (url: string, options: CustomFetchOptions = {}) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type":
      options.body instanceof FormData
        ? "multipart/form-data"
        : "application/json",
  };

  const axiosConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/${url}`,
    method: options.method || "GET",
    headers,
    data: options.body || undefined,
  };

  try {
    const response = await axios(axiosConfig);

    if (response.data?.status === false) {
      handleErrors(response.data);
    } else {
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (response) {
        handleErrors(response.data);
      } else {
        console.error("Network error or no response received:", error.message);
      }
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

export default customFetch;
