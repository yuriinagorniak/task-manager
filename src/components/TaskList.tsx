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
import { TaskItem } from "../shared/ui/TaskItem";

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
            </div>
            <ul className="py-2 flex flex-col items-center">
                {uncompletedTasks.map((task) => (
                    <TaskItem task={task} listColor={listData.color} completeTask={completeTask} deleteTask={deleteTask} />
                ))}
            </ul>

            {completedTasks.length > 0 && (
                <div>
                    <hr
                        className="bg-slate-300 w-11/12 h-[2px] m-auto"
                        style={{ backgroundColor: listData.color }}
                    />
                    <ul className="py-2 flex flex-col items-center">
                        {completedTasks.map((task) => (
                            <TaskItem task={task} listColor={listData.color} completeTask={completeTask} deleteTask={deleteTask} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TaskList;
