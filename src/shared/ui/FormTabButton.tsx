interface FormTabButtonProps {
    tabDisplayed: boolean;
    setTabDisplayed: (value: boolean) => void;
    isNewTaskTab: boolean;
}

export const FormTabButton = ({
    tabDisplayed,
    setTabDisplayed,
    isNewTaskTab,
}: FormTabButtonProps): JSX.Element => {
    return (
        <button
            className={`w-[50%] p-2 ${isNewTaskTab ? "rounded-br" : "rounded-bl"}`} 
            style={{
                backgroundColor: tabDisplayed ? "transparent" : "#e5e7eb",
                fontWeight: tabDisplayed ? "bold" : "normal",
            }}
            onClick={() => setTabDisplayed(isNewTaskTab)}
        >
            New {isNewTaskTab ? "task" : "list"}
        </button>
    );
};
