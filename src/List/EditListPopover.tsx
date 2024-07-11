import { getContrastColor } from "../utils/getContrastColor";
import { EditListAnchorType } from "./EditList";
import { Color } from "../models/color.model";
import Popover from "@mui/material/Popover";
import React from "react";

interface EditListPopoverProps extends React.PropsWithChildren {
    editListAnchor: EditListAnchorType;
    setEditListAnchor: (anchor: EditListAnchorType) => void;
    buttonColor: Color;
}

export const EditListPopover = ({
    children,
    editListAnchor,
    setEditListAnchor,
    buttonColor,
}: EditListPopoverProps): JSX.Element => {
    const editListHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditListAnchor(event.currentTarget);
    };

    const editListHandleClose = () => {
        setEditListAnchor(null);
    };

    const editListOpen = Boolean(editListAnchor);
    const editListId = editListOpen ? "edit-list-popover" : undefined;

    return (
        <>
            <button
                style={{ color: getContrastColor(buttonColor) }}
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
                {children}
            </Popover>
        </>
    );
};
