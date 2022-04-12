import * as React from 'react'
import { useDispatch } from 'react-redux';

import { Button, Menu, MenuItem, Typography } from "@mui/material";

import ConstructorButtonBase from '../ConstructorButtonBase';

export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface Props {
    parentRegister?: string;
    type?: string;
    children?: string;
    colorIt?: boolean;
}

export default function ViewerButton({ parentRegister, type, children, colorIt }: Props) {
    return (
        <ConstructorButtonBase parentRegister={parentRegister} type={type} sxProps={{ width: "fit-content", backgroundColor: colorIt ? "#66bb6a": "" }}>
            {children}
        </ConstructorButtonBase>
    );
}