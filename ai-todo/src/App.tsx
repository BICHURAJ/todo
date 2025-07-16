import React, { useState, useEffect } from 'react';
import { apiService, Todo } from './services/api';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await apiService.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to load todos. Please check if the backend server is running.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;
    
    try {
      setIsAdding(true);
      setError(null);
      const newTodo = await apiService.createTodo({ text: input });
      setTodos([newTodo, ...todos]);
      setInput('');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      setError(null);
      const updatedTodo = await apiService.toggleTodo(id);
      setTodos(todos.map(todo => 
        todo._id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error toggling todo:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await apiService.deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500 bg-red-500/10';
      case 'medium': return 'border-l-4 border-l-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-l-4 border-l-green-500 bg-green-500/10';
      default: return 'border-l-4 border-l-blue-500 bg-blue-500/10';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔥';
      case 'medium': return '⚡';
      case 'low': return '🌱';
      default: return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col items-center py-8 px-4">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Header with animation */}
        <div className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <span className="animate-bounce">🧠</span>
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              AI Todo
            </span>
            <span className="animate-pulse">✨</span>
          </h1>
          <p className="text-purple-200 text-lg">Organize your life with AI-powered insights</p>
        </div>

        {/* Main card with glassmorphism effect */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 animate-fade-in-up">
          {/* Error message with animation */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/50 text-red-100 rounded-xl animate-shake">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Input section with enhanced styling */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 relative group">
              <input
                className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 text-white placeholder-purple-200 focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                type="text"
                placeholder="What needs to be done?"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addTodo()}
                disabled={loading}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <button
              className={`px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                isAdding 
                  ? 'bg-purple-600 animate-pulse' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
              }`}
              onClick={addTodo}
              disabled={loading || !input.trim() || isAdding}
            >
              {isAdding ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner size="sm" color="white" />
                  <span>Adding...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <span>+</span>
                  <span>Add</span>
                </span>
              )}
            </button>
          </div>

          {/* Loading state with skeleton animation */}
          {loading && todos.length === 0 ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-16 bg-white/10 rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            /* Todos list with enhanced animations */
            <div className="space-y-4">
              {todos.length === 0 && !loading && <EmptyState />}
              
              {todos.map((todo, index) => (
                <div
                  key={todo._id}
                  className={`group transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:border-white/40 ${getPriorityColor(todo.priority)} ${todo.completed ? 'opacity-60' : ''}`}>
                    {/* Priority indicator */}
                    <div className="absolute top-3 left-3 text-sm opacity-60">
                      {getPriorityIcon(todo.priority)}
                    </div>
                    
                    <div className="flex items-center justify-between p-6 pl-12">
                      <div className="flex-1">
                        <div 
                          className={`cursor-pointer transition-all duration-300 hover:text-purple-200 ${
                            todo.completed ? 'line-through text-purple-300' : 'text-white'
                          }`}
                          onClick={() => toggleTodo(todo._id)}
                        >
                          <span className="text-lg">{todo.text}</span>
                        </div>
                        {todo.priority !== 'medium' && (
                          <span className="text-xs text-purple-300 mt-1 block capitalize">
                            {todo.priority} priority
                          </span>
                        )}
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className={`p-2 rounded-lg transition-all duration-200 hover:bg-white/20 ${
                            todo.completed ? 'text-green-400' : 'text-purple-300'
                          }`}
                          onClick={() => toggleTodo(todo._id)}
                          disabled={loading}
                          title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {todo.completed ? '✅' : '⭕'}
                        </button>
                        <button
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-200 hover:scale-110"
                          onClick={() => deleteTodo(todo._id)}
                          disabled={loading}
                          title="Delete todo"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    {/* Completion animation overlay */}
                    {todo.completed && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 pointer-events-none"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats and info section */}
          {todos.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex justify-between items-center text-sm text-purple-200">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span>📊</span>
                    <span>{todos.length} total tasks</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>✅</span>
                    <span>{todos.filter(t => t.completed).length} completed</span>
                  </span>
                </div>
                <div className="text-xs text-purple-300">
                  {/* ✨ AI insights coming soon */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
