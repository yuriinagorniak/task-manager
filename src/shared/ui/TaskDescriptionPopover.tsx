import { useState } from "react";
import { Popover } from "@mui/material"
import { Color } from "../../models/color.model";

interface TaskDescriptionPopoverProps {
    listColor: Color;
    taskTitle: string;
    taskDescription?: string;

}

export const TaskDescriptionPopover = ({ listColor, taskTitle, taskDescription }: TaskDescriptionPopoverProps): JSX.Element => {

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
        <div>
            <button
                                    className="w-5 h-5"
                                    title="Task description"
                                    onClick={taskInfoHandleClick}
                                >
                                    <svg
                                        fill={listColor}
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
                                        <p className="font-bold">{taskTitle}</p>
                                        {taskDescription}
                                    </div>
                                </Popover>
        </div>
    )
}