"use client";

import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import ConfirmModal from "./ConfirmModal";
import { useAuth } from "../auth-context";
import { useRouter } from "next/navigation";

export default function TodoPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    // Load user-specific tasks
    let userData = JSON.parse(localStorage.getItem("checkmate-userdata") || "{}");
    setTasks(userData[user.email]?.tasks || []);
  }, [user, router]);

  useEffect(() => {
    if (!user) return;
    let userData = JSON.parse(localStorage.getItem("checkmate-userdata") || "{}");
    userData[user.email] = { tasks };
    localStorage.setItem("checkmate-userdata", JSON.stringify(userData));
  }, [tasks, user]);

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  const showConfirmModal = (title, message, onConfirm, modalType = "simple", requiredWord = null) => {
    setModalConfig({
      title,
      message,
      modalType,
      requiredWord,
      onConfirm: () => {
        onConfirm();
        setShowModal(false);
      },
      onCancel: () => setShowModal(false),
    });
    setShowModal(true);
  };

  const deleteAllTasks = () => {
    showConfirmModal(
      "Delete all tasks",
      "Are you sure you want to delete all tasks?\nThis action cannot be undone.",
      () => setTasks([]),
      "requireText",
      "ALL"
    );
  };

  const deleteAllCompleted = () => {
    const completedTasks = tasks.filter((task) => task.completed);
    showConfirmModal(
      "Delete completed tasks",
      `Are you sure you want to delete ${completedTasks.length} completed task(s)?\nThis action cannot be undone.`,
      () => setTasks(tasks.filter((task) => !task.completed)),
      "requireText",
      "DONE"
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900/80 to-gray-700/90 animate-fade-in">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-gray-200 animate-pop-in flex flex-col max-h-[90vh]">
        <h1 className="text-3xl font-semibold text-center mb-8 text-gray-900 tracking-tight">Checkmate To-Do</h1>
        {totalCount > 0 && (
          <div className="mb-6 sticky top-0 z-10 bg-white/80 backdrop-blur-md pt-2 pb-2 rounded-t-3xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">{completedCount} of {totalCount} completed</span>
              <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-black rounded-full transition-all"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-black text-color-black placeholder:text-gray-500"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Add
          </button>
        </div>
        <div className="mb-8 overflow-y-auto flex-1">
          {tasks.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Your tasks will appear here.</div>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={editTask}
                />
              ))}
            </ul>
          )}
        </div>
        {tasks.length > 0 && (
          <div className="flex justify-between gap-2 text-black sticky bottom-0 bg-white/80 backdrop-blur-md pb-2 pt-2 rounded-b-3xl">
            <button
              onClick={deleteAllTasks}
              className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              title="Delete all tasks"
            >
              Delete all
            </button>
            {completedCount > 0 && (
              <button
                onClick={deleteAllCompleted}
                className="px-4 py-2 rounded-xl bg-orange-400 text-white font-semibold hover:bg-orange-500 transition"
                title="Delete completed tasks"
              >
                Delete done ({completedCount})
              </button>
            )}
          </div>
        )}
        {showModal && (
          <ConfirmModal
            title={modalConfig.title}
            message={modalConfig.message}
            modalType={modalConfig.modalType}
            requiredWord={modalConfig.requiredWord}
            onConfirm={modalConfig.onConfirm}
            onCancel={modalConfig.onCancel}
          />
        )}
      </div>
    </div>
  );
}
