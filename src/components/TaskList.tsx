import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { TickButton } from "../shared/ui/TickButton";

interface TaskListProps {
    title: string;
    tasks: Task[];
    listData: List;
    deleteTask: (id: string) => void;
    deleteList: (id: string) => void;
    completeTask: (id: string) => void;
}

interface hexToRgbReturnProps {
    R: number;
    G: number;
    B: number;
}

function hexToRgb(hex: string): hexToRgbReturnProps | null {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16),
          }
        : null;
}

function getContrastColor(hex: string) {
    const rgbColor = hexToRgb(hex);
    let brightness: number | null = null;
    if (rgbColor) {
        const { R, G, B } = rgbColor;
        brightness = R * 0.299 + G * 0.587 + B * 0.114;
    }

    console.log(hex, rgbColor, brightness);
    return brightness ? (brightness > 150 ? "#000000" : "#FFFFFF") : "#ffffff";
}

const TaskList = ({
    title,
    tasks,
    listData,
    deleteTask,
    deleteList,
    completeTask,
}: TaskListProps): JSX.Element => {
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);
    console.log(listData.color);

    return (
        <div
            className={`m-2 border-2 w-[50%] text-center rounded-md`}
            style={{ borderColor: listData.color, backgroundColor: listData.color + "30" }}
        >
            <div
                className="flex relative py-1 font-bold"
                style={{ backgroundColor: listData.color }}
            >
                <div className="">
                    <h1 className="w-full " style={{ color: getContrastColor(listData.color) }}>
                        {listData.title}
                    </h1>
                </div>
                <button
                    className="absolute right-[3%]"
                    onClick={deleteList.bind(null, listData.id)}
                >
                    Delete
                </button>
            </div>
            {/* <ul className="py-2 " style={{ backgroundColor: listData.color + "50" }}> */}
            <ul className="py-2 ">
                {uncompletedTasks.map((task) => (
                    <li key={task.id} className="flex justify-around">
                        <TickButton onClick={completeTask.bind(null, task.id)} color={listData.color} completed={task.completed} />
                        <h3>
                            {task.title} - {task.completed ? "Y" : "N"}
                        </h3>
                        {task.description && <span>{task.description}</span>}
                        <button onClick={deleteTask.bind(null, task.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {completedTasks.length > 0 && (
                <div>
                    <hr
                        className="bg-slate-300 w-11/12 h-[2px] m-auto"
                        style={{ backgroundColor: listData.color }}
                    />
                    <ul className="py-2 ">
                        {completedTasks.map((task) => (
                            <li
                                key={task.id}
                                className="flex items-center justify-around text-[#6e6e6e]"
                            >
                                <TickButton onClick={completeTask.bind(null, task.id)} color={listData.color} completed={task.completed} />
                                <h3>
                                    {task.title} - {task.completed ? "Y" : "N"}
                                </h3>
                                {task.description && <span>{task.description}</span>}
                                <button onClick={deleteTask.bind(null, task.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskList;
