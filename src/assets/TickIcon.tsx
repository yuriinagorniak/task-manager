import { Color } from "../models/color.model";

interface TickIconProps {
    completed: boolean;
    color: Color;
}

export const TickIcon = ({ completed, color }: TickIconProps) => {
    return (
        <svg
            className={`w-full h-full ${!completed && "invisible group-hover/button:visible"}`}
            viewBox=".5 .5 15 15"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="m901-250a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm3.48 3.783c.912-.026 1.381 1.081.727 1.717l-5.207 5.207-2.907-2.907c-.982-.942.472-2.396 1.414-1.414l1.493 1.493 3.793-3.793a1 1 0 0 1 .688-.303z"
                fill={color}
                transform="translate(-893 251)"
            />
        </svg>
    );
};
