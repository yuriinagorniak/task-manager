import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import NewListForm from "./components/NewListForm";
import TaskList from "./components/TaskList";
import { useState } from "react";
import { Task } from "./models/task.model";
import { List } from "./models/list.model";
import { Snackbar } from "@mui/material";
import { FormTabButton } from "./shared/ui/FormTabButton";
import Masonry from "react-masonry-css";

function App() {
    const [newTaskFormDisplayed, setNewTaskFormDisplayed] = useState<boolean>(true);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);

    const breakpointColumnsObj = {
        default: 2,
        600: 1,
      };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpened(false);
    };

    const showMessage = (message: string): void => {
        setSnackbarMessage(message);
        setSnackbarOpened(true);
    };

    const [tasks, setTasks] = useState<Task[]>([
        {
            id: "task-example-1-1",
            title: "Milk",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-1-2",
            title: "Eggs",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-1-3",
            title: "Cheese",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-1-4",
            title: "Yogurt",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-1-5",
            title: "Sugar",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-1-6",
            title: "Bread",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-1-7",
            title: "Pasta",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "long-task-example-1-1",
            title: "Breakfast cereael",
            description: "Porridge oats or unsweetened granola",
            listId: "list-example-1",
            completed: false,
        },
        {
            id: "task-example-2-1",
            title: "Dentist Appointment",
            description: "June 5, 2024 10:00 AM at Smile Dental Clinic",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-2-2",
            title: "Meeting with Financial Advisor",
            description: "June 8, 2024 2:00 PM at ABC Financial Services",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-2-3",
            title: "Physiotherapy Session",
            description: "June 10, 2024 11:30 AM at Health Plus Physiotherapy",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-2-4",
            title: "Parent-Teacher Conference",
            description: "June 12, 2024 4:00 PM at Greenwood Elementary School",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-2-5",
            title: "Business Lunch with Client",
            description: "June 14, 2024 1:00 PM at The Gourmet Bistro",
            listId: "list-example-2",
            completed: false,
        },
        {
            id: "task-example-3-1",
            title: "Book a venue or plan at home",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-3-2",
            title: "Arrange for decorations and supplies",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-3-3",
            title: "Order invitations",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-3-4",
            title: "Finalise guest list",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-3-5",
            title: "Plan activities and games",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-3-6",
            title: "Order the birthday cake",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-3-7",
            title: "Prepare a playlist or hire entertainment",
            listId: "list-example-3",
            completed: false,
        },
        {
            id: "task-example-4-1",
            title: "Confirm hotel reservation",
            listId: "list-example-4",
            completed: false,
        },
        {
            id: "task-example-4-2",
            title: "Plan Activities",
            listId: "list-example-4",
            completed: false,
        },
        {
            id: "task-example-4-3",
            title: "Check weather forecast",
            listId: "list-example-4",
            completed: false,
        },
        {
            id: "task-example-4-4",
            title: "Confirm transportation",
            description: "car rental, bus, train, etc.",
            listId: "list-example-4",
            completed: false,
        },
        {
            id: "task-example-4-4",
            title: "Water Plants",
            listId: "list-example-4",
            completed: false,
        },
    ]);

    const [lists, setLists] = useState<List[]>([
        {
            id: "list-example-2",
            title: "Appointments",
            color: "#b0b0dd",
        },
        {
            id: "list-example-3",
            title: "Birthday Party",
            color: "#edb8d9",
        },
        {
            id: "list-example-1",
            title: "Shopping List",
            color: "#edb8b8",
        },
        {
            id: "list-example-4",
            title: "Weekend Getaway",
            color: "#e8d39d",
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
            alert("You cannot delete the only remaining list");
            return false;
        }
        const newLists = lists.filter((list) => list.id !== id);
        setLists(newLists);
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
            <main className="p-2">
                <div className="w-full min-w-64 md:w-[720px] m-auto">
                    <div className="m-2 overflow-hidden shadow-lg appearance-none border-[3px] rounded-md border-[#d8d9dd] bg-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="flex justify-between text-lg">
                            <FormTabButton
                                isNewTaskTab={true}
                                tabDisplayed={newTaskFormDisplayed}
                                setTabDisplayed={setNewTaskFormDisplayed}
                            />
                            <FormTabButton
                                isNewTaskTab={false}
                                tabDisplayed={!newTaskFormDisplayed}
                                setTabDisplayed={setNewTaskFormDisplayed}
                            />
                        </div>

                        <div className="flex items-center justify-center h-64">
                            {newTaskFormDisplayed ? (
                                <NewTaskForm lists={lists} addNewTask={addNewTask} />
                            ) : (
                                <NewListForm addNewList={addNewList} />
                            )}
                        </div>
                    </div>
                    <div>
                        <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="masonry-grid"
                            columnClassName="masonry-grid_column"
                        >
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
                        </Masonry>
                    </div>
                </div>
            </main>
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                key={"bottom center"}
            />
        </div>
    );
}

export default App;
