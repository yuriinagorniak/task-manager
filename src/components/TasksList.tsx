import { Task } from "../models/task.model";

interface TasksListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
}

const TasksList = ({ tasks, deleteTask }: TasksListProps): JSX.Element => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <h3>{task.title}</h3>
                    {task.description && <span>{task.description}</span>}
                    <button onClick={deleteTask.bind(null, task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default TasksList;
