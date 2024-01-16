import React, { useEffect } from "react";
import { deleteTodo, fetchTodos } from "../features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const status = useSelector((state) => state.status);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  // console.log("todos render:", todos);
  useEffect(() => {
    // console.log("Dispatching fetchTodos...");
    dispatch(fetchTodos());
    // console.log("Status:", status);
    // console.log("Todos:", todos);
  }, [dispatch]);
  // console.log("after useEffect", todos);
  return (
    <>
      {status === "loading" && (
        <div className="flex justify-center items-center h-screen">
          <h1 className="md:text-7xl"> Loading...</h1>
        </div>
      )}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" && (
        <ul>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <li
                key={index}
                className="bg-zinc-800 flex justify-between items-center px-4 py-2 mt-3 rounded cursor-pointer"
              >
                {/* {console.log("todo In Map:", todo)} */}

                <div className="text-sm sm:text-lg p-3 sm:p-0 ">
                  {todo.task}
                </div>

                <button
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                  onClick={() => dispatch(deleteTodo(todo._id))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </li>
            ))
          ) : (
            <div className="mt-4">no todos yet. Add a todo to get started!</div>
          )}
        </ul>
      )}
    </>
  );
};

export default Todos;
