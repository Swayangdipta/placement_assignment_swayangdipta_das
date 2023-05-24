import React, { useReducer, useState } from 'react';
import './App.css';

const initialState = {
  tasks: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

const App = () => {
  const [taskText, setTaskText] = useState('');
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        text: taskText,
      };
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setTaskText('');
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h1 className="todo-app__title">Todo App</h1>
        <div className="todo-app__input-container">
          <input
            type="text"
            className="todo-app__input"
            placeholder="Enter a task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button className="todo-app__button" onClick={handleAddTask}>
            Add Task
          </button>
        </div>
        <ul className="todo-app__task-list">
          {state.tasks.map((task) => (
            <li key={task.id} className="todo-app__task-item">
              <span>{task.text}</span>
              <button
                className="todo-app__delete-button"
                onClick={() => handleDeleteTask(task.id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
