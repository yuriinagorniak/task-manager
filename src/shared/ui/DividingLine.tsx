import { Color } from "../../models/color.model";

interface DividingLineProps {
    color: Color;
}

export const DividingLine = ({ color }: DividingLineProps): JSX.Element | null => {
    return (
        <hr
            className="bg-slate-300 w-11/12 h-[2px] m-auto my-2"
            style={{ backgroundColor: color }}
        />
    );
};
