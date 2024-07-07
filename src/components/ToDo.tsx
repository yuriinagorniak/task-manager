import { useState, useEffect } from "react";
import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { useTaskStorage } from "../hooks/useTaskStorage";
import { useListStorage } from "../hooks/useListStorage";
import Masonry from "react-masonry-css";
import { NewItemForm } from "./NewItemForm";
import ListElement from "./ListElement";

interface ToDoProps {
    initialTasks: Task[];
    initialLists: List[];
    showMessage: (message: string) => void;
}

export const ToDo = ({ initialLists, initialTasks, showMessage }: ToDoProps): JSX.Element => {
    const { getTaskFromStorage, setTaskToStorage } = useTaskStorage();
    const { getListFromStorage, setListToStorage } = useListStorage();

    const [tasks, setTasks] = useState<Task[]>(getTaskFromStorage() ?? initialTasks);
    const [lists, setLists] = useState<List[]>(getListFromStorage() ?? initialLists);

    const addNewTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        showMessage("Task added");
    };

    const deleteTask = (id: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        showMessage("Task deleted");
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

    useEffect(() => {
        setListToStorage(lists);
        setTaskToStorage(tasks);
        console.log("storage updated");
    }, [lists, tasks]);

    const breakpointColumnsObj = {
        default: 2,
        600: 1,
    };

    return (
        <div className="w-full min-w-64 md:w-[720px] m-auto">
            <NewItemForm
                tasks={tasks}
                lists={lists}
                addNewTask={addNewTask}
                addNewList={addNewList}
            />

            <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="masonry-grid"
                    columnClassName="masonry-grid_column"
                >
                    {lists.map((list) => (
                        <ListElement
                            key={list.id}
                            listData={list}
                            tasks={tasks}
                            deleteTask={deleteTask}
                            completeTask={completeTask}
                            editList={editList}
                            deleteList={deleteList}
                        />
                    ))}
                </Masonry>
            </div>
        </div>
    );
};
