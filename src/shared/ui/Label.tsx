import { forwardRef } from "react";

interface LabelProps {
    label: string;
    htmlFor: string;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
    ({ label, htmlFor, ...rest }, ref): JSX.Element => {
        return (
            <label
                ref={ref}
                htmlFor={htmlFor}
                className="block text-gray-700 text-base font-bold mb-2"
                {...rest}
            >
                {label}
            </label>
        );
    }
);
