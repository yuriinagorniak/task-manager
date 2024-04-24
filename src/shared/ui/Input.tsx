import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;



export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
    return (
        <input
            // className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-xl ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ref={ref}
            {...props}
        />
    );
});
