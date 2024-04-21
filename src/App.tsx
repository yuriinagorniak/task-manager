import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { Task } from "./models/task.model";
import { List } from "./models/list.model";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [lists, setLists] = useState<List[]>([
        {
            id: "list-default",
            title: "Todo",
            color: "#000000",
        },
        {
            id: "list-default-2",
            title: "Todo2",
            color: "#000090",
        },
    ]);
    const addNewTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const addNewList = (list: List) => {
        setLists((prevLists) => [...prevLists, list]);
    };

    const deleteList = (id: string) => {
        if (lists.length === 1) {
            alert("you cannot delete the only remaining list");
            return false;
        }
        const newLists = lists.filter((list) => list.id !== id);
        setLists(newLists);
        // setLists(prevLists => prevLists.filter((list) => list.id !== id));
        console.log(lists.length);
    };

    return (
        <div className="App">
            <NewTaskForm lists={lists} addNewTask={addNewTask} />
            <NewListForm addNewList={addNewList} />
            {lists.map((list) => (
                <TaskList
                    key={list.id}
                    listData={list}
                    title={list.title}
                    tasks={tasks.filter((task) => task.listId === list.id)}
                    deleteTask={deleteTask}
                    deleteList={deleteList}
                />
            ))}
        </div>
    );
}

export default App;
