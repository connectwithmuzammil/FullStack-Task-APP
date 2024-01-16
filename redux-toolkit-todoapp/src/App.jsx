import React, { useEffect } from "react";
import AddTodo from "./component/AddTodo";
import Todos from "./component/Todos";
import axios from "axios";
const App = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/api/v1/tasks");
  //       const {
  //         data: { data },
  //       } = response;
  //       console.log("responseData:", data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <h1>Redux ToolKit</h1>
      <AddTodo />
      <Todos />
    </>
  );
};

export default App;
