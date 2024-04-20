import { Task } from "../models/task.model";

interface TaskListProps {
    title: string;
    tasks: Task[];
    deleteTask: (id: string) => void;
}

const TaskList = ({ title, tasks, deleteTask }: TaskListProps): JSX.Element => {
    return (
        <div>
            <ul>
                <h1>{title}</h1>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        {task.description && <span>{task.description}</span>}
                        <button onClick={deleteTask.bind(null, task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
