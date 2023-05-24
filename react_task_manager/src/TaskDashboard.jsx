import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Navigate } from 'react-router-dom';

const TaskDashboard = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTasks(response.data.data);
        }
      } catch (error) {
        console.log('Error occurred while fetching tasks');
      }
    };

    fetchTasks();
  }, [token]);

  const createTask = async () => {
    try {
      const response = await axios.post(
        'https://reqres.in/api/tasks',
        { task: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        let task = {
            name: response.data.task,
            id: response.data.id
        }
        setTasks([...tasks, task]);
        setNewTask('');
      }
    } catch (error) {
      console.log('Error occurred while creating task');
    }
  };

  return (
    <div className="task-dashboard">
        {
            token === '' && <Navigate to="/" />
        }
      <h2>Task Dashboard</h2>
      <div className="task-input">
        <input
          type="text"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={createTask}>Create Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li className='task-item' key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
