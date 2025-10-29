import React, { useEffect, useMemo, useRef, useState } from 'react';

const pad = (n) => String(n).padStart(2, '0');

const FocusTimer = ({ tasks, onFinish }) => {
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [minutes, setMinutes] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(25 * 60); // seconds
  const [startTime, setStartTime] = useState(null);

  const intervalRef = useRef(null);

  const selectedTask = useMemo(() => tasks.find(t => t._id === selectedTaskId), [tasks, selectedTaskId]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);
          const end = new Date();
          if (startTime && selectedTaskId) {
            onFinish({
              taskId: selectedTaskId,
              startTime,
              endTime: end,
              duration: minutes * 60,
            });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, minutes, onFinish, selectedTaskId, startTime]);

  const handleStart = () => {
    if (!selectedTaskId || minutes <= 0 || isRunning) return;
    setRemaining(minutes * 60);
    setStartTime(new Date());
    setIsRunning(true);
  };

  const handleStop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const mm = Math.floor(remaining / 60);
  const ss = remaining % 60;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Focus Session</h3>
      <div className="space-y-3 mb-6">
        <select
          className="w-full border border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={selectedTaskId}
          disabled={isRunning}
          onChange={(e) => setSelectedTaskId(e.target.value)}
        >
          <option value="">Select a task...</option>
          {tasks.map(t => (
            <option key={t._id} value={t._id}>{t.title}</option>
          ))}
        </select>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1">
            <input
              type="number"
              min={1}
              max={240}
              className="w-24 sm:w-28 border border-gray-300 dark:border-dark-500 dark:bg-dark-700 dark:text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={minutes}
              disabled={isRunning}
              onChange={(e) => setMinutes(Math.max(1, Math.min(240, Number(e.target.value) || 0)))}
            />
            <span className="text-gray-500 dark:text-dark-300 text-sm">minutes</span>
          </div>
          
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!selectedTaskId || minutes <= 0}
              className={`px-6 py-2 rounded-md text-white transition-colors duration-200 ${(!selectedTaskId || minutes <= 0) ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              Start
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="px-6 py-2 rounded-md bg-gray-200 dark:bg-dark-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-dark-500 transition-colors duration-200"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      <div className="text-center">
        <div className="text-4xl sm:text-5xl lg:text-6xl font-mono mb-2 text-gray-900 dark:text-white">{pad(mm)}:{pad(ss)}</div>
        {selectedTask && (
          <div className="text-sm text-gray-600 dark:text-dark-300 truncate">Current task: {selectedTask.title}</div>
        )}
      </div>
    </div>
  );
};

export default FocusTimer;


