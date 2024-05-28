import { useState } from "react";
import { Button, Dialog } from "@mui/material";
import { List } from "../../models/list.model";

interface DeleteListButtonProps {
    listData: List;
    listEmpty: boolean;
    deleteList: (id: string) => void;
}

export const DeleteListButton = ({
    listData,
    listEmpty,
    deleteList,
}: DeleteListButtonProps): JSX.Element => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                style={{ width: "100%" }}
                variant="outlined"
                color="error"
                onClick={() => {
                    if (!listEmpty) {
                        handleClickOpen();
                    } else {
                        deleteList(listData.id);
                    }
                }}
            >
                Delete
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <div className="px-8 py-6 text-center">
                    <h4 className="font-bold text-2xl">Delete the list {listData.title}?</h4>
                    <p className="mt-2">
                        The list is not empty. All information in the list will be deleted
                        permanently.
                    </p>
                    <div className="flex gap-4 mt-4">
                        <Button
                            style={{ width: "100%" }}
                            variant="outlined"
                            color="error"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{ width: "100%" }}
                            variant="contained"
                            color="error"
                            onClick={() => {
                                deleteList(listData.id);
                                handleClickOpen();
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
