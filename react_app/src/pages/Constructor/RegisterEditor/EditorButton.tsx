import * as React from 'react'

import ConstructorButtonBase from '../ConstructorButtonBase';

export enum ButtonTypes { add = "add", content = "content", addParent = "addParent" }

interface Props {
    parentRegister?: string;
    type?: string;
    children?: string;
}

export default function EditorButton({ parentRegister, type, children }: Props) {
    return (
        <ConstructorButtonBase parentRegister={parentRegister} type={type} sxProps={{ display: "block", width: "-webkit-fill-available", margin: "10px" }}>
            {
                children[2].length < 50 ? children : children[0]+children[1]+children[2].slice(0,50)+"..."
            }
        </ConstructorButtonBase>

    );
}