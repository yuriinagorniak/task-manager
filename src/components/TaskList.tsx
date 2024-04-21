import { Task } from "../models/task.model";
import { List } from "../models/list.model";

interface TaskListProps {
    title: string;
    tasks: Task[];
    deleteTask: (id: string) => void;
    listData: List;
    deleteList: (id: string) => void;
}

const TaskList = ({ title, tasks, deleteTask, listData, deleteList }: TaskListProps): JSX.Element => {
    return (
        <div>
            <ul>
                <h1 style={{ color: listData.color }}>{listData.title}</h1>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        {task.description && <span>{task.description}</span>}
                        <button onClick={deleteTask.bind(null, task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={deleteList.bind(null, listData.id)}>Delete</button>
        </div>
    );
};

export default TaskList;
