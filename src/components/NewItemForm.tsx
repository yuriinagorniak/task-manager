import { useState } from "react";
import NewTaskForm from "./Form/NewTaskForm";
import NewListForm from "./Form/NewListForm";
import { FormTabButton } from "../shared/ui/FormTabButton";
import { Task } from "../models/task.model";
import { List } from "../models/list.model";

interface newItemFormProps {
    tasks: Task[];
    lists: List[];
    addNewTask: (task: Task) => void;
    addNewList: (list: List) => void;
}

export const NewItemForm = ({ tasks, lists, addNewTask, addNewList }: newItemFormProps) => {
    const [newTaskFormDisplayed, setNewTaskFormDisplayed] = useState<boolean>(true);

    return (
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
    );
};
