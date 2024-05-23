import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { Task } from "./models/task.model";
import { List } from "./models/list.model";
import { Snackbar } from "@mui/material";

function App() {
    const [newTaskFormDisplayed, setNewTaskFormDisplayed] = useState<boolean>(true);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpened(false);
    };

    const showMessage = (message: string): void => {
        setSnackbarMessage(message);
        setSnackbarOpened(true);
    }

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
            id: "long-task-example-1",
            title: "Very very very very very very long title",
            description: "Very very very very very very long description",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "long-task-example-1",
            title: "Very very very very very very long title",
            description: "Very very very very very very long description",
            listId: "list-example-2",
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
        showMessage("Task added");
    };
    
    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        showMessage("Task deleted");
    };
    
    const addNewList = (list: List) => {
        setLists((prevLists) => [...prevLists, list]);
        showMessage("New list created");
    };
    
    const deleteList = (id: string) => {
        if (lists.length === 1) {
            alert("you cannot delete the only remaining list");
            return false;
        }
        const newLists = lists.filter((list) => list.id !== id);
        setLists(newLists);
        console.log(lists.length);
        showMessage(`List deleted`);
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
            <main>
                <div className="w-full min-w-64">
                    <div className="m-2 overflow-hidden shadow-lg appearance-none border-[3px] rounded-md border-[#d8d9dd] text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="flex justify-between text-lg">
                            {/* TabButton */}
                            <button
                                className="w-[50%] p-2 rounded-br"
                                style={{
                                    backgroundColor: newTaskFormDisplayed ? "transparent" : "#e5e7eb",
                                    fontWeight: newTaskFormDisplayed ? "bold" : "normal",
                                }}
                                onClick={() => setNewTaskFormDisplayed(true)}
                            >
                                New task
                            </button>
                            <button
                                className="w-[50%] p-2 rounded-bl"
                                style={{
                                    backgroundColor: !newTaskFormDisplayed ? "transparent" : "#e5e7eb",
                                    fontWeight: !newTaskFormDisplayed ? "bold" : "normal",
                                }}
                                onClick={() => setNewTaskFormDisplayed(false)}
                            >
                                New list
                            </button>
                        </div>

                        {/* alternative border color: #030369 */}
                        <div className="flex items-center justify-center h-64">
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
            </main>
            {/* <MessageBar message={snackbarMessage} open={snackbarOpened}/> */}
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                key={"bottom center"}
            />
        </div>
    );
}

export default App;
