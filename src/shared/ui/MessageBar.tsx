import { useState } from "react";
import { Snackbar } from "@mui/material";

interface StatusSnackbarProps {
    message: string;
    open: boolean;
}

export const MessageBar = ({ message, open }: StatusSnackbarProps): JSX.Element => {
    const [opened, setOpened] = useState(open);

    const handleClick = () => {
        setOpened(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpened(false);
    };

    return (
        <div>
            <Snackbar
                open={opened}
                autoHideDuration={2000}
                onClose={handleClose}
                message="This Snackbar will be dismissed in 5 seconds."
            />
        </div>
    );
};
