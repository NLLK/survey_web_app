import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Button, Menu, MenuItem, Typography } from "@mui/material";

import ConstructorButtonBase from '../ConstructorButtonBase';

export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface Props {
    //parentRegister?: Question;
    parentRegister?: string;
    type?: string;
    children?: string;
}

export default function ViewerButton({ parentRegister, type, children }: Props) {

    // const [contextMenu, setContextMenu] = React.useState(null);

    // const handleContextMenu = (event) => {
    //   event.preventDefault();
    //   setContextMenu(
    //     contextMenu === null
    //       ? {
    //           mouseX: event.clientX - 2,
    //           mouseY: event.clientY - 4,
    //         }
    //       : null,
    //   );
    //   event.stopPropagation();
    // };
  
    // const handleClose = () => {
    //   setContextMenu(null);
    // };

    const ButtonSizes = {
        width: "75px",
        height: "30px" 
    }

    return (
         <div /*onContextMenu={handleContextMenu}*/>
            <ConstructorButtonBase parentRegister={parentRegister} type={type} styling={ButtonSizes}>
                {children}
            </ConstructorButtonBase>
            {/* <Menu
                transitionDuration={100}
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>ViewBoba</MenuItem>
            </Menu> */}
        </div>

    );
}