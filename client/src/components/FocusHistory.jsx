import React from 'react';

const formatDuration = (sec) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
};

const FocusHistory = ({ sessions, tasksById }) => {
  if (!sessions.length) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Focus History</h3>
        <div className="text-gray-500 dark:text-dark-300 text-sm">No focus sessions yet.</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Focus History</h3>
      <ul className="divide-y divide-gray-200 dark:divide-dark-600 space-y-0">
        {sessions.map((s) => (
          <li key={s._id} className="py-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 dark:text-white truncate">{tasksById[s.taskId]?.title || 'Task'}</div>
                <div className="text-xs text-gray-500 dark:text-dark-400">
                  {new Date(s.startTime).toLocaleString()} → {new Date(s.endTime).toLocaleTimeString()}
                </div>
              </div>
              <div className="text-sm text-gray-700 dark:text-dark-300 font-medium flex-shrink-0">
                {formatDuration(s.duration)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FocusHistory;


