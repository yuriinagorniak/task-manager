import { Task } from "../models/task.model";
import { List } from "../models/list.model";
import { Input } from "../shared/ui/Input";
import { TickButton } from "../shared/ui/TickButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { SubmitButton } from "../shared/ui/SubmitButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TaskDescriptionPopover } from "../shared/ui/TaskDescriptionPopover";

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

    const { register, handleSubmit, formState, reset } = useForm<List>();

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

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
            editListHandleClose();
        }
    }, [formState, reset]);

    // editList
    const [editListAnchor, setEditListAnchor] = useState<HTMLButtonElement | null>(null);

    const editListHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditListAnchor(event.currentTarget);
    };

    const editListHandleClose = () => {
        setEditListAnchor(null);
    };

    const editListOpen = Boolean(editListAnchor);
    const editListId = editListOpen ? "edit-list-popover" : undefined;

    // taskInfo
    const [taskInfoAnchor, setTaskInfoAnchor] = useState<HTMLButtonElement | null>(null);

    const taskInfoHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTaskInfoAnchor(event.currentTarget);
    };

    const taskInfoHandleClose = () => {
        setTaskInfoAnchor(null);
    };

    const taskInfoOpen = Boolean(taskInfoAnchor);
    const taskInfoId = taskInfoOpen ? "edit-list-popover" : undefined;

    return (
        <div
            className={`border-2 mx-2 my-4 text-center rounded-md shadow-lg overflow-hidden appearance-none leading-tight focus:outline-none focus:shadow-outline`}
            style={{ borderColor: listData.color, backgroundColor: listData.color + "30" }}
        >
            <div
                className="relative py-1 font-bold text-center"
                style={{ backgroundColor: listData.color }}
            >
                <h2 className="w-full" style={{ color: getContrastColor(listData.color) }}>
                    {listData.title}
                </h2>

                <div className="absolute top-[50%] translate-y-[-50%] right-1">
                    <button
                        style={{ color: getContrastColor(listData.color) }}
                        onClick={editListHandleClick}
                        title="Options"
                    >
                        ⠇
                    </button>
                    <Popover
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        id={editListId}
                        open={editListOpen}
                        anchorEl={editListAnchor}
                        onClose={editListHandleClose}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-36">
                                        <Input
                                            type="text"
                                            placeholder="Text"
                                            id="title"
                                            defaultValue={listData.title}
                                            {...register("title")}
                                        />
                                    </div>
                                    <div className="relative w-10 h-10 shadow rounded overflow-hidden">
                                        <input
                                            type="color"
                                            defaultValue={listData.color}
                                            className="absolute top-[-20%] left-[-20%] w-[200%] h-[150%] appearance-none bg-transparent border-none outline-none cursor-pointer"
                                            {...register("color")}
                                        />
                                    </div>
                                </div>
                                <Button
                                    style={{ width: "100%" }}
                                    variant="contained"
                                    color="success"
                                    type="submit"
                                >
                                    Change
                                </Button>
                                <hr className="my-3" />
                                <Button
                                    style={{ width: "100%" }}
                                    variant="outlined"
                                    color="error"
                                    onClick={deleteList.bind(null, listData.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </form>
                    </Popover>
                </div>

                {/* <div className="group/options">
                    <div onClick={() => setEditingDialogOpened(prevState => !prevState)} className="cursor-pointer">...</div>
                    <div className={`absolute right-[-40%] top-[-50%] w-24 ${editingDialogOpened ? "opacity-100 visible" : "opacity-0 invisible"}`}>
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
                                <button type="submit" onClick={() => setEditingDialogOpened(false)}>Change</button>
                            </div>
                        </form>
                        <button
                            // className="absolute right-[3%]"
                            onClick={deleteList.bind(null, listData.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div> */}
            </div>
            {/* <ul className="py-2 " style={{ backgroundColor: listData.color + "50" }}> */}
            <ul className="py-2 flex flex-col items-center">
                {uncompletedTasks.map((task) => (
                    <li
                        key={task.id}
                        // className="flex justify-around my-1 w-[90%]"
                        className="flex items-center my-1 justify-between w-[90%]"
                        style={{ color: task.completed ? "#6e6e6e" : "#000000" }}
                    >
                        <div className="flex items-center w-4/5 sm:w-full ">
                            <div className="w-5">
                                <TickButton
                                    onClick={completeTask.bind(null, task.id)}
                                    color={listData.color}
                                    completed={task.completed}
                                />
                            </div>
                            <h3 className="w-4/5 sm:w-[80%] text-left pl-2 truncate">
                                {task.title}
                            </h3>
                        </div>
                        <div className="flex items-center justify-end gap-2 w-1/5 sm:w-12 pr-2">
                            {/* {task.description && ( */}
                            <div className="flex items-center">
                                <TaskDescriptionPopover listColor={listData.color} taskTitle={task.title} taskDescription={task.description} />
                                {/* <button
                                    className="w-5 h-5"
                                    title="Task description"
                                    onClick={taskInfoHandleClick}
                                >
                                    <svg
                                        fill={listData.color}
                                        height="100%"
                                        width="100%"
                                        version="1.1"
                                        id="Capa_1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 330 330"
                                    >
                                        <g>
                                            <path
                                                d="M165,0C74.019,0,0,74.02,0,165.001C0,255.982,74.019,330,165,330s165-74.018,165-164.999C330,74.02,255.981,0,165,0z
		 M165,300c-74.44,0-135-60.56-135-134.999C30,90.562,90.56,30,165,30s135,60.562,135,135.001C300,239.44,239.439,300,165,300z"
                                            />
                                            <path
                                                d="M164.998,70c-11.026,0-19.996,8.976-19.996,20.009c0,11.023,8.97,19.991,19.996,19.991
		c11.026,0,19.996-8.968,19.996-19.991C184.994,78.976,176.024,70,164.998,70z"
                                            />
                                            <path
                                                d="M165,140c-8.284,0-15,6.716-15,15v90c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-90C180,146.716,173.284,140,165,140z
		"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <Popover
                                    id={taskInfoId}
                                    open={taskInfoOpen}
                                    anchorEl={taskInfoAnchor}
                                    onClose={taskInfoHandleClose}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    transformOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                >
                                    <div className="p-2 text-center">
                                        <p className="font-bold">{task.title}</p>
                                        {task.description}
                                    </div>
                                </Popover> */}
                            </div>
                            {/* )} */}
                            <div>
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
                                        <g fill={listData.color} fill-rule="nonzero">
                                            <path d="m12 22c5.5228475 0 10-4.4771525 10-10s-4.4771525-10-10-10-10 4.4771525-10 10 4.4771525 10 10 10zm0 2c-6.627417 0-12-5.372583-12-12s5.372583-12 12-12 12 5.372583 12 12-5.372583 12-12 12z" />
                                            <path d="m9.20710678 16.2071068c-.39052429.3905243-1.02368927.3905243-1.41421356 0s-.39052429-1.0236893 0-1.4142136l6.99999998-6.99999998c.3905243-.39052429 1.0236893-.39052429 1.4142136 0s.3905243 1.02368927 0 1.41421356z" />
                                            <path d="m7.79289322 9.20710678c-.39052429-.39052429-.39052429-1.02368927 0-1.41421356s1.02368927-.39052429 1.41421356 0l7.00000002 6.99999998c.3905243.3905243.3905243 1.0236893 0 1.4142136s-1.0236893.3905243-1.4142136 0z" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
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
                                className="flex items-center justify-around my-1"
                                style={{ color: task.completed ? "#6e6e6e" : "#000000" }}
                            >
                                <TickButton
                                    onClick={completeTask.bind(null, task.id)}
                                    color={listData.color}
                                    completed={task.completed}
                                />
                                <h3>{task.title}</h3>
                                {task.description && <span>{task.description}</span>}
                                <button>Info</button>
                                <button onClick={deleteTask.bind(null, task.id)}>Del</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskList;
