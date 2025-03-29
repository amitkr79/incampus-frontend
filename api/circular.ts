import axios from "axios";

// Define the API base URL (use your actual backend URL)
const BASE_URL = "http://192.168.58.68:8000/api";

// Create an Axios instance for better reusability
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch circulars from the backend and map _id to id
export const fetchCirculars = async () => {
  try {
    const response = await apiClient.get("/circulars");
    // Map each returned object so that _id is renamed to id
    const data = response.data.map((item: any) => ({
      ...item,
      id: item._id,
    }));
    return data;
  } catch (error) {
    console.error("Error fetching circulars:", error?.response?.data || error.message);
    throw error;
  }
};
