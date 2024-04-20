import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TasksList from './components/TasksList';
import { useState } from 'react';
import { Task } from './models/task.model';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addNewTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task])
  }

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  return (
    <div className="App">
      <NewTaskForm addNewTask={addNewTask} />
      <TasksList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
