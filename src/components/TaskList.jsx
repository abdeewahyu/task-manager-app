import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  editTask,
  setSearchFilter,
  setStatusFilter,
  toggleComplete,
} from "../redux/features/tasks/taskSlice";
import { motion } from "framer-motion";

const TaskList = () => {
  const { tasks, filter } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter.status === "completed") return task.completed;
      if (filter.status === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(filter.search.toLowerCase())
    );

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
    setIsModalOpen(true);
  };

  const handleEditSave = (id) => {
    if (editText.trim()) {
      dispatch(editTask({ id, nextText: editText.trim() }));
      setIsModalOpen(false);
      setEditId(null);
      setEditText("");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditText("");
    setEditId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEditSave(editId);
    }
  };

  return (
    <div>
      {/* Search Task */}
      <input
        type="text"
        placeholder="Search tasks"
        value={filter.search}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      {/* Filtering Tasks */}
      <div className="flex gap-3 mb-6">
        {["all", "completed", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => dispatch(setStatusFilter(status))}
            className={`px-5 py-2 text-sm rounded-xl border transition font-medium ${
              filter.status === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-blue-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      {/* Display Tasks */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 && (
          <p className="text-gray-500 text-sm italic">No tasks found.</p>
        )}
        {filteredTasks.map((task) => (
          <motion.li
            key={task.id}
            className={`flex items-center justify-between p-4 border rounded-xl shadow-sm transition ${
              task.completed ? "bg-gray-50 border-gray-300" : "bg-white"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className="w-5 h-5 accent-blue-600 rounded-md cursor-pointer transition"
              />
              <span
                className={`text-sm transition-all duration-300 ${
                  task.completed
                    ? "line-through text-gray-400 italic"
                    : "text-gray-800"
                }`}
              >
                {task.text}
              </span>
            </div>

            <div className="flex gap-2 text-sm">
              <button
                onClick={() => handleEdit(task.id, task.text)}
                className="px-3 py-1 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-blue-100 hover:text-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="px-3 py-1 rounded-lg bg-red-100 text-red-600 font-medium hover:bg-red-200 transition"
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      {/* Modal for Editing */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditSave(editId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;
