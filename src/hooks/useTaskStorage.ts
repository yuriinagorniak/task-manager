import { useLocalStorage } from "./useStorage";
import { Task } from "../models/task.model";

export const useTaskStorage = () => {
    const { getFromStorage, setToStorage } = useLocalStorage();
  
    return {
      getTaskFromStorage: (): Task[] | undefined => {
        const course = getFromStorage("TASKS");
        return course ? JSON.parse(course) : undefined;
      },
      setTaskToStorage: (value: Task[]) =>
        setToStorage("TASKS", JSON.stringify(value)),
    };
  };