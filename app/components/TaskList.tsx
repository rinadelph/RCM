import React, { useState, useEffect } from 'react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  console.log('Rendering TaskList');

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    console.log('TaskList mounted');
    // Fetch tasks from API or local storage here
    return () => console.log('TaskList unmounted');
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = { id: Date.now().toString(), title: newTask, completed: false };
      console.log('Adding new task:', newTaskItem);
      setTasks([...tasks, newTaskItem]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    console.log('Toggling task with id:', id);
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  console.log('Current tasks:', tasks);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Task List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTask()}
        className="w-full p-2 border rounded mb-2"
        placeholder="Add a new task"
      />
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mr-2"
              aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;