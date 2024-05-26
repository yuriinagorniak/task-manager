import { useState, useEffect } from "react";
import { List } from "../models/list.model";
import { getContrastColor } from "../utils/getContrastColor";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { DeleteListButton } from "../shared/ui/DeleteListButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../shared/ui/Input";

interface EditListProps {
    listData: List;
    listEmpty: boolean
    editList: (list: List) => void;
    deleteList: (id: string) => void;
}

export const EditList = ({ listData, editList, listEmpty, deleteList }: EditListProps) => {

    const { register, handleSubmit, formState, reset } = useForm<List>();

    const onSubmit: SubmitHandler<List> = (data) => {
        data.id = listData.id;
        if (data.color === "#ffffff") {
            data.color = "#e5e7eb";
        }

        if (!data.title) {
            data.title = listData.title;
        }

        editList(data);
    };

    const [editListAnchor, setEditListAnchor] = useState<HTMLButtonElement | null>(null);

    const editListHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditListAnchor(event.currentTarget);
    };

    const editListHandleClose = () => {
        setEditListAnchor(null);
    };

    const editListOpen = Boolean(editListAnchor);
    const editListId = editListOpen ? "edit-list-popover" : undefined;

    
    
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
            editListHandleClose();
        }
    }, [formState, reset]);

    return (
        <div className="absolute top-[50%] translate-y-[-50%] right-1">
            <button
                style={{ color: getContrastColor(listData.color) }}
                onClick={editListHandleClick}
                title="Options"
            >
                ⠇
            </button>
            <Popover
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                id={editListId}
                open={editListOpen}
                anchorEl={editListAnchor}
                onClose={editListHandleClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-36">
                                <Input
                                    type="text"
                                    placeholder="Text"
                                    id="title"
                                    defaultValue={listData.title}
                                    {...register("title")}
                                />
                            </div>
                            <div className="relative w-10 h-10 shadow rounded overflow-hidden">
                                <input
                                    type="color"
                                    defaultValue={listData.color}
                                    className="absolute top-[-20%] left-[-20%] w-[200%] h-[150%] appearance-none bg-transparent border-none outline-none cursor-pointer"
                                    {...register("color")}
                                />
                            </div>
                        </div>
                        <Button
                            style={{ width: "100%" }}
                            variant="contained"
                            color="success"
                            type="submit"
                        >
                            Change
                        </Button>
                        <hr className="my-3" />
                        <DeleteListButton
                            listData={listData}
                            listEmpty={listEmpty}
                            deleteList={deleteList}
                        />
                    </div>
                </form>
            </Popover>
        </div>
    );
};
