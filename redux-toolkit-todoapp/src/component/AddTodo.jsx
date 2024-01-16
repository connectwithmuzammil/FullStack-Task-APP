import React from "react";
import { useDispatch } from "react-redux";
import { addTodos } from "../features/todo/todoSlice";

const AddTodo = () => {
  const [input, setInput] = React.useState("");
  const dispatch = useDispatch();

  const addTodoHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    if (input.trim() === "") {
      console.log("Please add todo");
      return;
    }
    try {
      dispatch(addTodos({ task: input }));
      setInput("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  return (
    <>
      <form
        onSubmit={addTodoHandler}
        className="flex justify-center flex-wrap space-x-3  mt-12"
      >
        <input
          type="text"
          placeholder="Enter a Todo"
          className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-2 w-[80vw] max-w-[380px]"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <button
          className="bg-blue-600 px-3 py-2 w-[150px] rounded-full hover:bg-blue-900  font-semibold mt-4 sm:mt-0"
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </>
  );
};

export default AddTodo;
