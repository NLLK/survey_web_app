import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Menu, MenuItem} from "@mui/material";

import ConstructorButtonBase from '../ConstructorButtonBase';

export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface Props {
    //parentRegister?: Question;
    parentRegister?: string;
    type?: string;
    children?: string;
}

export default function EditorButton({ parentRegister, type, children }: Props) {

    return (
        <div  >
            <ConstructorButtonBase parentRegister={parentRegister} type={type} sxProps={{ display: "block", width: "-webkit-fill-available", margin: "10px" }}>
                {children}
            </ConstructorButtonBase>
        </div>

    );
}