import { TickIcon } from "../../assets/TickIcon";
import { Color } from "../../models/color.model";

interface TickButtonProps {
    onClick: () => void;
    color: Color;
    completed: boolean;
}

export const TickButton = ({ onClick, color, completed }: TickButtonProps) => {
    return (
        <button
            style={{ borderColor: color }}
            className={`group/button w-5 h-5 flex items-center justify-center ${
                !completed && "border-2 rounded-full"
            }`}
            onClick={onClick}
            title={`Mark as ${completed ? "uncompleted" : "completed"}`}
        >
            <TickIcon completed={completed} color={color} />
        </button>
    );
};
