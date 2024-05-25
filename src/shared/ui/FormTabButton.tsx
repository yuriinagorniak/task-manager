import { ReactNode } from "react";

interface FormTabButtonProps {
    tabDisplayed: boolean;
    setTabDisplayed: (value: boolean) => void;
    isNewFormTab: boolean;
}

export const FormTabButton = ({
    tabDisplayed,
    setTabDisplayed,
    isNewFormTab
}: FormTabButtonProps): JSX.Element => {
    return (
        <button
            className="w-[50%] p-2 rounded-br"
            style={{
                backgroundColor: tabDisplayed ? "transparent" : "#e5e7eb",
                fontWeight: tabDisplayed ? "bold" : "normal",
            }}
            onClick={() => setTabDisplayed(isNewFormTab)}
        >
            New {isNewFormTab ? "task" : "list"}
        </button>
    );
};
