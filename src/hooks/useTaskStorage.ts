import { useLocalStorage } from "./useStorage";
import { Task } from "../models/task.model";

export const useTaskStorage = () => {
    const { getFromStorage, setToStorage } = useLocalStorage();

    return {
        getTaskFromStorage: (): Task[] | undefined => {
            const task = getFromStorage("TASKS");
            return task ? JSON.parse(task) : undefined;
        },
        setTaskToStorage: (value: Task[]) => setToStorage("TASKS", JSON.stringify(value)),
    };
};
