import React, { useState } from 'react';

const TaskList = ({ tasks, onToggle, onDelete, onUpdate, onMarkDone }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTag, setEditTag] = useState('');

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditTag(task.tag || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditTag('');
  };

  const saveEdit = async (task) => {
    const title = editTitle.trim();
    const tag = editTag.trim();
    if (!title) return;
    await onUpdate(task._id, { title, tag });
    cancelEdit();
  };
  if (!tasks.length) {
    return (
      <div className="text-gray-500 dark:text-dark-300 text-center py-6">No tasks yet. Add your first task!</div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200 dark:divide-dark-600">
      {tasks.map((task) => (
        <li key={task._id} className="py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-start gap-3 flex-1">
              <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggle(task)}
                className="h-4 w-4 text-indigo-600 border-gray-300 dark:border-dark-500 rounded mt-0.5 flex-shrink-0"
              />

              {editingId === task._id ? (
                <div className="flex-1 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full sm:w-36 border border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-white rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editTag}
                    onChange={(e) => setEditTag(e.target.value)}
                    placeholder="Tag"
                  />
                </div>
              ) : (
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${task.isCompleted ? 'line-through text-gray-400 dark:text-dark-400' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </div>
                  {task.tag && (
                    <div className="text-xs text-gray-500 dark:text-dark-400">#{task.tag}</div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
              {editingId === task._id ? (
                <>
                  <button
                    onClick={() => saveEdit(task)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm px-2 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-600 dark:text-dark-300 hover:text-gray-700 dark:hover:text-dark-200 text-sm px-2 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {!task.isCompleted && (
                    <button
                      onClick={() => onMarkDone(task)}
                      className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm px-2 py-1 rounded"
                    >
                      Done
                    </button>
                  )}
                  <button
                    onClick={() => startEdit(task)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;


