import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { Task } from "./models/task.model";
import { List } from "./models/list.model";
import { Button } from "@mui/material";

function App() {
    const [newTaskFormDisplayed, setNewTaskFormDisplayed] = useState<boolean>(true);

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "task-example-1",
            title: "task 1",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-2",
            title: "task 2",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-3",
            title: "task 3",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-4",
            title: "task 4",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-5",
            title: "task 5",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-6",
            title: "task 1",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-7",
            title: "task 2",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-8",
            title: "task 3",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-9",
            title: "task 4",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-10",
            title: "task 5",
            listId: "list-example-2",
            completed: false,
        },
    ]);

    const [lists, setLists] = useState<List[]>([
        {
            id: "list-example-1",
            title: "Todo",
            color: "#edb8b8",
        },
        {
            id: "list-example-2",
            title: "Todo2",
            color: "#b0b0dd",
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

    const editList = (editedList: List) => {
        setLists((prevLists) =>
            prevLists.map((list) => {
                if (list.id === editedList.id) {
                    return { ...list, title: editedList.title, color: editedList.color };
                } else {
                    return list;
                }
            })
        );
    };

    const completeTask = (id: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                } else {
                    return task;
                }
            })
        );
    };

    return (
        <div className="App">
            <div className="w-full">
                <div>
                    <div className="flex">
                        <Button onClick={() => setNewTaskFormDisplayed(true)}>New task</Button>
                        <Button onClick={() => setNewTaskFormDisplayed(false)}>New list</Button>
                    </div>
                    <div className="flex h-64 border-2 m-2">
                        {newTaskFormDisplayed ? (
                            <NewTaskForm lists={lists} addNewTask={addNewTask} />
                        ) : (
                            <NewListForm addNewList={addNewList} />
                        )}
                    </div>
                </div>
                {lists.map((list) => (
                    <TaskList
                        key={list.id}
                        listData={list}
                        title={list.title}
                        tasks={tasks.filter((task) => task.listId === list.id)}
                        deleteTask={deleteTask}
                        deleteList={deleteList}
                        completeTask={completeTask}
                        editList={editList}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
