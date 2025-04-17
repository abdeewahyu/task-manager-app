import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/features/tasks/taskSlice";
import { nanoid } from "nanoid";

const TaskForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSumbit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;

    dispatch(
      addTask({
        id: nanoid(),
        text: text.trim(),
        completed: false,
      })
    );

    setText("");
  };

  return (
    <form
      onSubmit={handleSumbit}
      className="flex items-center gap-3 mb-6 bg-white p-4 rounded-2xl shadow-md"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task..."
        className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      />
      <button
        type="submit"
        className="px-5 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
