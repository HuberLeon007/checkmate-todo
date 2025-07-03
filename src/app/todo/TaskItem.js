"use client";

import React, { useState, useEffect, useRef } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const editingRef = useRef(false);

  const handleEdit = () => {
    if (editingRef.current) return;
    editingRef.current = true;
    if (editValue.trim() !== "") {
      onEdit(task.id, editValue.trim());
      setIsEditing(false);
    }
    setTimeout(() => {
      editingRef.current = false;
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditValue(task.text);
      setIsEditing(false);
      editingRef.current = false;
    }
  };

  const handleBlur = (e) => {
    const isConfirmButton = e.relatedTarget && e.relatedTarget.classList && e.relatedTarget.classList.contains("confirm-button");
    if (!isConfirmButton) {
      handleEdit();
    }
  };

  return (
    <li className={`flex items-center justify-between py-2 px-3 mb-2 bg-white/70 shadow-sm border border-gray-200 ${task.completed ? "opacity-60" : ""}`}>
      <div className="flex items-center gap-3 w-full">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="accent-black w-5 h-5 border-gray-300"
        />
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-full px-2 py-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-black text-color-black"
            autoFocus
          />
        ) : (
          <span
            className={`text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 ml-2">
        <button
          onClick={isEditing ? handleEdit : () => setIsEditing(true)}
          className={`confirm-button px-2 py-1 ${isEditing ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          disabled={task.completed && !isEditing}
          title={isEditing ? "Bestätigen" : "Bearbeiten"}
        >
          {isEditing ? "✓" : "✏️"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="delete-button px-2 py-1 bg-red-500 text-white hover:bg-red-600"
          title="Löschen"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
