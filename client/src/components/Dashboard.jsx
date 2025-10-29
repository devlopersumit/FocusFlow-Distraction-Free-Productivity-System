import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { taskAPI, focusAPI, insightsAPI } from '../services/api';
import AddTask from './AddTask';
import TaskList from './TaskList';
import FocusTimer from './FocusTimer';
import FocusHistory from './FocusHistory';
import ThemeToggle from './ThemeToggle';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [sessions, setSessions] = useState([]);
  const [insights, setInsights] = useState(null);
  

  
  useEffect(() => {
    const fetchTasks = async () => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        setError('');
        const res = await taskAPI.getTasks();
        if (res.success) {
          setTasks(res.tasks);
        }
        const hist = await focusAPI.getSessions({ limit: 20 });
        if (hist.success) {
          setSessions(hist.sessions);
        }
        // insights
        const ins = await insightsAPI.getInsights();
        if (ins.success) {
          setInsights(ins.data);
        }
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [isAuthenticated]);

  const handleAddTask = async (data) => {
    try {
      setAdding(true);
      const res = await taskAPI.createTask(data);
      if (res.success) {
        setTasks(prev => [res.task, ...prev]);
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to add task');
    } finally {
      setAdding(false);
    }
  };
  const handleFinishSession = async ({ taskId, startTime, endTime, duration }) => {
    try {
      const res = await focusAPI.createSession({ taskId, startTime, endTime, duration });
      if (res.success) {
        setSessions(prev => [res.session, ...prev].slice(0, 20));
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to save focus session');
    }
  };

  const tasksById = Object.fromEntries(tasks.map(t => [t._id, t]));


  const handleToggleTask = async (task) => {
    try {
      const res = await taskAPI.updateTask(task._id, { isCompleted: !task.isCompleted });
      if (res.success) {
        setTasks(prev => prev.map(t => t._id === task._id ? res.task : t));
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to update task');
    }
  };

  const handleMarkDone = async (task) => {
    try {
      if (task.isCompleted) return;
      const res = await taskAPI.updateTask(task._id, { isCompleted: true });
      if (res.success) {
        setTasks(prev => prev.map(t => t._id === task._id ? res.task : t));
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to mark task done');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const res = await taskAPI.updateTask(id, updates);
      if (res.success) {
        setTasks(prev => prev.map(t => t._id === id ? res.task : t));
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to edit task');
    }
  };

  const handleDeleteTask = async (task) => {
    try {
      const res = await taskAPI.deleteTask(task._id);
      if (res.success) {
        setTasks(prev => prev.filter(t => t._id !== task._id));
      }
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  // Calculate stats
  const completedTasks = tasks.filter(task => task.isCompleted).length;
  const totalTasks = tasks.length;
  const todaySessions = sessions.filter(session => {
    const sessionDate = new Date(session.startTime);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Minimal Top Bar */}
      <nav className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-4 sm:px-6">
        <div className="h-14 flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <img src="/favicon.svg" alt="FocusFlow" className="h-6 w-6" />
            <span className="text-base font-semibold text-gray-900 dark:text-white">FocusFlow</span>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="ml-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Let's make today productive.
            </p>
          </div>

          {/* Minimal KPI row */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white dark:bg-dark-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-dark-700 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{completedTasks}</div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-dark-700 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Today sessions</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{todaySessions}</div>
            </div>
            <div className="bg-white dark:bg-dark-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-dark-700 text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400">Today focus</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{insights?.totals?.todaySeconds ? Math.round(insights.totals.todaySeconds/3600*10)/10 : 0}h</div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Progress</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">Last 7 days</span>
            </div>
            
            {insights ? (
              <>
                {insights.aiSummary ? (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{insights.aiSummary}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">No insights available yet. Start focusing to see your progress!</div>
                )}
                
                <div className="grid grid-cols-1 gap-6">
                  {/* Bar chart: Last 7 days */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Focus Time Trend</h3>
                    <div className="h-64">
                      <Bar
                        data={{
                          labels: (insights.last7Days || []).map(d => {
                            const date = new Date(d.date);
                            return date.toLocaleDateString('en-US', { weekday: 'short' });
                          }),
                          datasets: [{
                            label: 'Hours',
                            data: (insights.last7Days || []).map(d => (d.seconds/3600).toFixed(1)),
                            backgroundColor: 'rgba(59, 130, 246, 0.8)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1,
                            borderRadius: 4
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { 
                            legend: { display: false },
                            tooltip: {
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                              titleColor: 'white',
                              bodyColor: 'white'
                            }
                          },
                          scales: {
                            x: { 
                              ticks: { color: '#6B7280' },
                              grid: { color: '#E5E7EB' }
                            },
                            y: { 
                              ticks: { color: '#6B7280' },
                              grid: { color: '#E5E7EB' }
                            }
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Only one chart to keep it minimal */}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading insights...</p>
              </div>
            )}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tasks */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Tasks</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{tasks.length} total</span>
              </div>
              
              <AddTask onAdd={handleAddTask} isSubmitting={adding} />
              
              {error && (
                <div className="mt-4 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
                  {error}
                </div>
              )}
              
              <div className="mt-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                    <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
                  </div>
                ) : (
                  <TaskList
                    tasks={tasks}
                    onToggle={handleToggleTask}
                    onDelete={handleDeleteTask}
                    onUpdate={handleUpdateTask}
                    onMarkDone={handleMarkDone}
                  />
                )}
              </div>
            </div>

            {/* Focus Timer & History */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
                <FocusTimer tasks={tasks} onFinish={handleFinishSession} />
              </div>
              
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
                <FocusHistory sessions={sessions} tasksById={tasksById} />
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default Dashboard;