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
    console.log("API Response:", response); // Log the entire response
    return response.data.data.task;
    // const responseData = response.data;
    // if (
    //   responseData &&
    //   responseData.data &&
    //   responseData.data.task !== undefined
    // ) {
    //   return responseData.data.task;
    // } else {
    //   // Adjust the return value based on your use case
    //   return null;
    // }
    // if (
    //   responseData &&
    //   responseData.status === "success" &&
    //   responseData.data
    // ) {
    //   return responseData.data.task; // Assuming the task data is nested under data field
    // } else {
    //   throw new Error(`API request failed with status: ${responseData.status}`);
    // }
    // console.log("Fetched todos:", todos);
    // return todos;
    // console.log("RESPONSE:", response.data.data.task);
    // return response.data;
  } catch (error) {
    throw error;
  }
};
