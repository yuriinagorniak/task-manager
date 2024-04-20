import './App.css';
import NewTaskForm from './components/NewTaskForm';
import NewListForm from './components/NewListForm';
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
      color: "#000000",
    }, 
    {
      id: 'list-default-2',
      title: "Todo2",
      color: "#000000",
    }, 
  ]);

  const addNewTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task])
  }

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
  }

  const addNewList = (list: List) => {
    setLists((prevLists) => [...prevLists, list]);
  }

  return (
    <div className="App">
      <NewTaskForm lists={lists} addNewTask={addNewTask} />
      <NewListForm addNewList={addNewList} />
      {lists.map(list => 
        <TaskList key={list.id} title={list.title} tasks={tasks.filter(task => task.listId === list.id)} deleteTask={deleteTask} />
      )}
    </div>
  );
}

export default App;
