import { useEffect, useState } from "react";

import { styled } from '@mui/material/styles';
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

export default function TextBoxWithDots(props) {

    const [cuttedString, setCuttedString] = useState("")
    const [useToolTip, setUseToolTip] = useState(false);

    useEffect(() => {
        console.log(props.text.length, props.max_length)
        if (props.text.length > props.max_length) {
            setCuttedString(props.text.slice(0, props.max_length)+"...")
            setUseToolTip(true);
        }
        else setCuttedString(props.text)
    }, [props])

    return (
        useToolTip 
        ? 
        <HtmlTooltip title={props.text}>
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
