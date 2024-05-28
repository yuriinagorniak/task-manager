import { TaskElement } from "./TaskElement";
import { Task } from "../models/task.model";
import { Color } from "../models/color.model";

interface TaskListItemProps {
    tasks: Task[];
    listColor: Color;
    completeTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const TaskListItem = ({ tasks, listColor, completeTask, deleteTask }: TaskListItemProps) => {
    return (
        <ul className="my-2 flex flex-col items-center">
            {tasks.map((task) => (
                <TaskElement
                    task={task}
                    listColor={listColor}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                />
            ))}
        </ul>
    );
};
