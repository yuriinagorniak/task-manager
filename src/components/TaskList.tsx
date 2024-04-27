import { Task } from "../models/task.model";
import { List } from "../models/list.model";

interface TaskListProps {
    title: string;
    tasks: Task[];
    listData: List;
    deleteTask: (id: string) => void;
    deleteList: (id: string) => void;
    completeTask: (id: string) => void;
}

const TaskList = ({
    title,
    tasks,
    listData,
    deleteTask,
    deleteList,
    completeTask
}: TaskListProps): JSX.Element => {

    const completedTasks = tasks.filter(task => task.completed);
    const uncompletedTasks = tasks.filter(task => !task.completed);

    return (
        <div
            className={`m-2 border-2 w-[50%] text-center rounded-md`}
            style={{ borderColor: listData.color }}
        >
            <div className="flex relative py-1 font-bold" style={{ backgroundColor: listData.color }}>
                <h1 className="w-full">{listData.title}</h1>
                <button className="absolute right-[3%]" onClick={deleteList.bind(null, listData.id)}>Delete</button>
            </div>
            <ul className="py-2 " style={{ backgroundColor: listData.color + "50" }}>
                {tasks.map((task) => (
                    <li key={task.id} className="flex justify-around">
                        <button onClick={completeTask.bind(null, task.id)}>Complete</button>
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
