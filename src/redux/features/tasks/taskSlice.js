import { createSlice } from "@reduxjs/toolkit";

const loadTaskFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("demoTasks");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveTaskToLocalStorage = (tasks) => {
  localStorage.setItem("demoTasks", JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: loadTaskFromLocalStorage(),
    filter: {
      status: "all",
      search: "",
    },
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      saveTaskToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTaskToLocalStorage(state.tasks);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
      saveTaskToLocalStorage(state.tasks);
    },
    editTask: (state, action) => {
      const { id, nextText } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) task.text = nextText;
      saveTaskToLocalStorage(state.tasks);
    },
    setStatusFilter: (state, action) => {
      state.filter.status = action.payload;
    },
    setSearchFilter: (state, action) => {
      state.filter.search = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
  setStatusFilter,
  setSearchFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
