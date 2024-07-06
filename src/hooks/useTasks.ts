import { useState, useEffect } from "react";
import { Task } from "../models/task.model";
import { TASK_URL } from "../urls";
import axios from "axios";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>();

    useEffect(() => {
        axios.get(TASK_URL).then((response) => setTasks(response.data)).catch((error) => console.log(error));
    }, []);

    return { tasks };
};
