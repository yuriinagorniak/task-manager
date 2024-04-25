import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { PropsWithChildren } from "react";

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button = (props: PropsWithChildren<ButtonProps>) => {
    const { children, ...rest } = props;
    return (
        <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            {...rest}
        >
            {children}
        </button>
    );
};
