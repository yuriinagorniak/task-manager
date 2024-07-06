import { useState } from "react";
import { Snackbar } from "@mui/material";
import { useTasks } from "../hooks/useTasks";
import { useLists } from "../hooks/useLists";
import { ToDo } from "./ToDo";

const MainPage = () => {
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarOpened, setSnackbarOpened] = useState<boolean>(false);

    const { tasks } = useTasks();
    const { lists } = useLists();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpened(false);
    };

    const showMessage = (message: string): void => {
        setSnackbarMessage(message);
        setSnackbarOpened(true);
    };

    return (
        <div>
            <main className="p-2">
                {tasks && lists ? (
                    <ToDo initialLists={lists} initialTasks={tasks} showMessage={showMessage} />
                ) : (
                    <h1>Loading...</h1>
                )}
            </main>
            <Snackbar
                open={snackbarOpened}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                key={"bottom center"}
            />
        </div>
    );
};

export default MainPage;
