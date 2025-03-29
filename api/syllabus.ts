import axios from "axios";

// Replace with your actual backend URL
// const BASE_URL = "http://10.0.2.2:8000/api"; // Fixed "loacalhost" typo
const BASE_URL = "http://192.168.58.68:8000/api";

// Function to fetch syllabus data based on query parameters
export const fetchSyllabus = async ({ stream, scheme, year, branch }) => {
  try {
    const response = await axios.get(`${BASE_URL}/syllabus`, {
      params: { stream, scheme, year, branch },
    });
    console.log("Fetched syllabus data:", response.data);
    return response.data; // Return the fetched syllabus data
  } catch (error) {
    console.error("Error fetching syllabus:", error?.response?.data || error.message);
    return null; // Return null if an error occurs
  }
};

//function to fetch scheme data based on query parameters
export const fetchScheme = async ({ stream, scheme, year, branch }) => {
  try {
    const response = await axios.get(`${BASE_URL}/scheme`, {
      params: { stream, scheme, year, branch },
    });
    console.log("Fetched scheme data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching scheme:", error?.response?.data || error.message);
    return null;
  }
};
