import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../useFetchAPi";
import axios from "axios";

// LocalStorage
// const loadTodosFromLocalStorage = () => {
//     const todos = localStorage.getItem("todos");
//     return todos ? JSON.parse(todos) : [];
// };
// const saveTodosToLocalStorage = (todos) => {
//     localStorage.setItem("todos", JSON.stringify(todos));
// };

//


const initialState = {
    // todos: loadTodosFromLocalStorage()
    todos: [],
    status: "idle",
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, actions) => {
            state.todos = actions.payload;
            state.status = "succeeded";
        },
        setError: (state, actions) => {
            state.error = actions.payload;
            state.status = "failed";
        },
        setLoading: (state, action) => {
            state.status = "loading";
        }

        // addTodo: (state, actions) => {
        //     const todo = {
        //         id: nanoid(),
        //         text: actions.payload,
        //     }
        //     state.todos.push(todo)
        //     saveTodosToLocalStorage(state.todos)
        //     console.log('todos', todo);
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteTodo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const { payload } = action;
                const existingTodo = state.todos.find((todo) => todo.id === payload);
                if (existingTodo) {
                    state.todos = state.todos.filter((todo) => todo.id !== payload);
                }
                state.status = 'succeeded';
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addTodos.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTodos.fulfilled, (state, action) => {
                state.todos.push(action.payload);
                state.status = 'succeeded';
            })
            .addCase(addTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

})

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
    try {
        const url = 'http://localhost:3000/api/v1/tasks';
        const data = await fetchData(url);
        console.log('Fetched todos:', data);
        return data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
});
export const deleteTodo = createAsyncThunk('deleteTodo', async (id, { getState, rejectWithValue }) => {
    console.log('deleteTodo', id)
    try {
        await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
        const existingTodos = getState().todos;
        console.log('existingTodos', existingTodos)
        const updatedTodos = existingTodos.filter((todo) => todo.id !== id);

        return updatedTodos;
        // const res = await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
        // const url = `http://localhost:3000/api/v1/tasks/${id}`;
        // const data = await fetchData(url, 'delete');
        // console.log("deleteTodo:", data)
        // return id; // Return the id to use in reducer

    } catch (error) {
        console.error('Error deleting todo:', error);
        return rejectWithValue(error.message);
    }
});
export const addTodos = createAsyncThunk('addTask', async (taskData) => {
    console.log('taskData', taskData)
    try {
        const url = ('http://localhost:3000/api/v1/tasks');
        return await fetchData(url, 'post', taskData);

    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
});
export const { setTodos, setError, setLoading } = todoSlice.actions;


export const addTask = createAsyncThunk('addTask', async (taskData) => {
    // console.log('taskData', taskData)
    try {
        const res = await axios.post('http://localhost:3000/api/v1/tasks', taskData);
        // console.log("POST RES:", res);
        return res.data.task;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
});

export default todoSlice.reducer