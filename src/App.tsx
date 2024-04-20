import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import { useState } from 'react';
import { Task } from './models/task.model';
import { List } from './models/list.model';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lists, setLists] = useState<List[]>([
    {
      id: 'list-default',
      title: "Todo",
      color: "red"
    }, 
    {
      id: 'list-default-2',
      title: "Todo2",
      color: "red"
    }, 
  ]);

  const addNewTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task])
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  return (
    <div className="App">
      <NewTaskForm lists={lists} addNewTask={addNewTask} />
      {lists.map(list => 
        <TaskList key={list.id} title={list.title} tasks={tasks.filter(task => task.listId === list.id)} deleteTask={deleteTask} />
      )}
    </div>
  );
}

export default App;
