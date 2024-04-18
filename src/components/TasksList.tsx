import { Task } from "../models/task.model";

interface TasksListProps {
    tasks: Task[];
}

const TasksList = ({ tasks }: TasksListProps): JSX.Element => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <span>{task.title}</span>
                    {task.description && <span>{task.description}</span>}
                </li>
            ))}
        </ul>
    );
};

export default TasksList;
