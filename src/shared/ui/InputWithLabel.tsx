import { Label } from "./Label";
import { PropsWithChildren } from "react";

interface InputWithLabelProps extends React.HTMLAttributes<HTMLDivElement> {
    htmlFor: string;
    label: string;
    className?: string;
}

export const InputWithLabel = (props: PropsWithChildren<InputWithLabelProps>): JSX.Element => {
    const { htmlFor, label, className, children } = props;

    return (
        <div className={className}>
            <Label htmlFor={htmlFor} label={label} />
            {children}
        </div>
    );
};
