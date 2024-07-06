import { TickButton } from "../shared/ui/TickButton";
import { Task } from "../models/task.model";
import { Color } from "../models/color.model";
import { TaskDescriptionPopover } from "./TaskDescriptionPopover";

interface TaskElementProps {
    task: Task;
    listColor: Color;
    completeTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export const TaskElement = ({
    task,
    listColor,
    completeTask,
    deleteTask,
}: TaskElementProps): JSX.Element => {
    return (
        <li
            key={task.id}
            className="flex items-center my-1 justify-between w-[90%]"
            style={{ color: task.completed ? "#6e6e6e" : "#000000" }}
        >
            <div className="flex items-center w-4/5">
                <div className="w-5">
                    <TickButton
                        onClick={completeTask.bind(null, task.id)}
                        color={listColor}
                        completed={task.completed}
                    />
                </div>
                <p className="text-md py-[1px] w-4/5 sm:w-[80%] text-left pl-2 truncate">{task.title}</p>
            </div>
            <div className="flex items-center justify-end gap-2 w-1/5 sm:w-12 pr-2">
                <TaskDescriptionPopover
                    listColor={listColor}
                    taskTitle={task.title}
                    taskDescription={task.description}
                />

                <div className="flex items-center">
                    <button
                        className="w-5 h-5 flex items-center"
                        title="Delete the task"
                        onClick={deleteTask.bind(null, task.id)}
                    >
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g fill={listColor} fillRule="nonzero">
                                <path d="m12 22c5.5228475 0 10-4.4771525 10-10s-4.4771525-10-10-10-10 4.4771525-10 10 4.4771525 10 10 10zm0 2c-6.627417 0-12-5.372583-12-12s5.372583-12 12-12 12 5.372583 12 12-5.372583 12-12 12z" />
                                <path d="m9.20710678 16.2071068c-.39052429.3905243-1.02368927.3905243-1.41421356 0s-.39052429-1.0236893 0-1.4142136l6.99999998-6.99999998c.3905243-.39052429 1.0236893-.39052429 1.4142136 0s.3905243 1.02368927 0 1.41421356z" />
                                <path d="m7.79289322 9.20710678c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l7.00000002 6.99999998c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0z" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </li>
    );
};
