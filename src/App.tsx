import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TasksList from './components/TasksList';
import { useState } from 'react';
import { Task } from './models/task.model';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, ])
  }

  return (
    <div className="App">
      <NewTaskForm />
      <TasksList tasks={tasks} />
    </div>
  );
}

export default App;
