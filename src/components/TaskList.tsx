import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { Input } from "../shared/ui/Input";
import { TickButton } from "../shared/ui/TickButton";
import { useForm, SubmitHandler } from "react-hook-form";

interface TaskListProps {
    title: string;
    tasks: Task[];
    listData: List;
    deleteTask: (id: string) => void;
    deleteList: (id: string) => void;
    completeTask: (id: string) => void;
    editList: (list: List) => void;
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
    editList,
}: TaskListProps): JSX.Element => {
    const completedTasks = tasks.filter((task) => task.completed);
    const uncompletedTasks = tasks.filter((task) => !task.completed);

    const { register, handleSubmit } = useForm<List>();

    const onSubmit: SubmitHandler<List> = (data) => {
        data.id = listData.id;
        if (data.color === "#ffffff") {
            data.color = "#e5e7eb";
        }

        if (!data.title) {
            data.title = listData.title;
        }

        editList(data);
    };

    return (
        <div
            className={`m-2 border-2 w-[50%] text-center rounded-md`}
            style={{ borderColor: listData.color, backgroundColor: listData.color + "30" }}
        >
            <div
                className="flex relative py-1 font-bold text-center"
                style={{ backgroundColor: listData.color }}
            >
                <h2 className="w-full" style={{ color: getContrastColor(listData.color) }}>
                    {listData.title}
                </h2>

                <div className="group/options">
                    <div>...</div>
                    <div className="absolute right-[-20%] top-[-50%] w-24 border-2 opacity-0 invisible group-hover/options:opacity-100 group-hover/options:visible">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <div className="flex">
                                    <Input
                                        type="text"
                                        placeholder="Text"
                                        id="title"
                                        {...register("title")}
                                    />
                                    <input
                                        type="color"
                                        defaultValue={listData.color}
                                        // className="absolute top-[-20%] left-[-20%] w-[200%] h-[150%] appearance-none bg-transparent border-none outline-none cursor-pointer"
                                        {...register("color")}
                                    />
                                </div>
                                <button type="submit">Change</button>
                            </div>
                        </form>
                        <button
                            // className="absolute right-[3%]"
                            onClick={deleteList.bind(null, listData.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            {/* <ul className="py-2 " style={{ backgroundColor: listData.color + "50" }}> */}
            <ul className="py-2 ">
                {uncompletedTasks.map((task) => (
                    <li key={task.id} className="flex justify-around">
                        <TickButton
                            onClick={completeTask.bind(null, task.id)}
                            color={listData.color}
                            completed={task.completed}
                        />
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
                                <TickButton
                                    onClick={completeTask.bind(null, task.id)}
                                    color={listData.color}
                                    completed={task.completed}
                                />
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
