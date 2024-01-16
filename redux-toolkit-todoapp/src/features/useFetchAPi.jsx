import axios from "axios";

export const fetchData = async (url, method = "get", data = null) => {
  try {
    const config = {
      method,
      url,
      data,
    };
    console.log("data:", data);
    const response = await axios(config);
    console.log("API Response:", response);
    return response.data.data.task;
  } catch (error) {
    throw error;
  }
};
