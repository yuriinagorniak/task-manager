import { Task } from "./task.model";
import { List } from "./list.model";

export interface AppData {
    tasks: Task;
    lists: List;
}