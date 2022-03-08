import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { HtmlTooltip } from "./HtmlTooltip";

export default function TextBoxWithDots(props) {

    const [cuttedString, setCuttedString] = useState("")
    const [useToolTip, setUseToolTip] = useState(false);

    useEffect(() => {
        if (props.text.length > props.max_length) {
            setCuttedString(props.text.slice(0, props.max_length)+"...")
            setUseToolTip(true);
        }
        else setCuttedString(props.text)
    }, [props])

    return (
        useToolTip 
        ? 
        <HtmlTooltip title={props.text} enterTouchDelay={10000} disableInteractive>
            <Typography variant={props.variant}>
                {cuttedString}
            </Typography>
        </HtmlTooltip>
        :
        <Typography variant={props.variant}>
            {cuttedString}
        </Typography>

    )
}
