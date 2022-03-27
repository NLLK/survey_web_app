import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CommitIcon from '@mui/icons-material/Commit';

import * as React from 'react'
import { connect, useDispatch } from "react-redux";

import EditorButton from "./EditorButton"
import { ButtonTypes } from '../ConstructorButtonBase';
import { TemplateTypes } from "../Templates/TemplateTypes"
import { addRegisterWithTemplate } from "../Templates/TemplateActions"
import { CONSTRUCTOR_DELETE_QUESTION } from '../Reducer/ConstructorReducerTypes';
import {toogle} from "../../Common/Utils"
function RegisterEditor(props) {

    //const register = useSelector(state => state.constructor.register)

    const dispatch = useDispatch()
    const [showDeleteButtons, setShowDeleteButtons] = React.useState(false)

    React.useEffect(() => {

    }, [props])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleTemplateButtons = (e) => {
        console.log(e.target.id)

        switch (e.target.id) {
            case "template_button_yes_no":
                addRegisterWithTemplate(TemplateTypes.yes_no, dispatch)
                break;
            case "template_button_rate":
                addRegisterWithTemplate(TemplateTypes.rate, dispatch)
                break;
            case "template_button_segments":
                addRegisterWithTemplate(TemplateTypes.segments, dispatch)
                break;
            default: break;
        }

        setAnchorEl(null);
    };

    return (
        <>
            {
                !props.register ?
                    <></> :
                    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ padding: "10px" }}>
                                <Typography>
                                    {props.register.id.string} : {props.register.text} {(props.register.subText ? "- " + props.register.subText : "")}
                                </Typography>
                            </div>

                            <div>
                                {
                                    props.register.answersList.map((item, index) => (
                                        <EditorButton key={index} parentRegister={JSON.stringify(item)} type={ButtonTypes.content}>
                                            {item.id.string}: {item.text}
                                        </EditorButton>
                                    ))
                                }
                            </div>

                            <div style={{ marginTop: props.register.answersList.length === 0 ? "0px" : "40px" }}>
                                <EditorButton parentRegister={JSON.stringify(props.register)} type={ButtonTypes.add}>
                                    *Добавить*
                                </EditorButton>
                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    variant="contained"
                                    style={{ margin: "15px", display: "block", width: "-webkit-fill-available" }}
                                >
                                    *Добавить по шаблону*
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    sx={{ width: "-webkit-fill-available" }}
                                    open={open}
                                    onClose={handleTemplateButtons}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}

                                >
                                    <MenuItem onClick={handleTemplateButtons} id="template_button_yes_no">
                                        <ListItemIcon>
                                            <ThumbsUpDownIcon fontSize="small" />
                                        </ListItemIcon>
                                        Да / Нет
                                    </MenuItem>
                                    <MenuItem onClick={handleTemplateButtons} id="template_button_rate">
                                        <ListItemIcon>
                                            <StarHalfIcon fontSize="small" />
                                        </ListItemIcon>
                                        Оцените 1..5
                                    </MenuItem>
                                    <MenuItem onClick={handleTemplateButtons} id="template_button_segments">
                                        <ListItemIcon>
                                            <CommitIcon fontSize="small" />
                                        </ListItemIcon>
                                        Возраст
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ width: "-webkit-fill-available", margin: "15px" }}
                                onClick={() => {
                                    toogle(setShowDeleteButtons)
                                }}
                            >
                                *Удалить*
                            </Button>

                            <div style={{ display: showDeleteButtons? "flex": "none", direction: "row", columnGap: "5px", justifyContent: "space-between", marginLeft: "15px", marginRight: "15px", marginBottom: "15px" }}>
                                <Button
                                    variant="contained" color="error"
                                    onClick={() => {
                                        dispatch({ type: CONSTRUCTOR_DELETE_QUESTION })
                                        toogle(setShowDeleteButtons)
                                    }}
                                    sx={{ flexGrow: 1 }}
                                >
                                    *Удалить*
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        toogle(setShowDeleteButtons)
                                    }}
                                    sx={{ flexGrow: 1 }}
                                >
                                    *Отмена*
                                </Button>
                            </div>
                        </div>


                    </div>
            }
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        register: state.constructor.register
    }
}

export default connect(mapStateToProps)(RegisterEditor)