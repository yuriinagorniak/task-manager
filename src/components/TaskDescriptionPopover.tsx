import { useState } from "react";
import { Popover } from "@mui/material";
import { Color } from "../models/color.model";
import { InfoIcon } from "../assets/InfoIcon";

interface TaskDescriptionPopoverProps {
    listColor: Color;
    taskTitle: string;
    taskDescription?: string;
}

export const TaskDescriptionPopover = ({
    listColor,
    taskTitle,
    taskDescription,
}: TaskDescriptionPopoverProps): JSX.Element => {
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
        <div className="flex items-center">
            <button className="w-5 h-5" title="Task description" onClick={taskInfoHandleClick}>
                <InfoIcon color={listColor} />
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
                    <p className="font-bold">{taskTitle}</p>
                    {taskDescription}
                </div>
            </Popover>
        </div>
    );
};
