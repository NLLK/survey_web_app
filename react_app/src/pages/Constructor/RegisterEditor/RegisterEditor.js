import { Button, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CommitIcon from '@mui/icons-material/Commit';

import * as React from 'react'
import { connect, useDispatch } from "react-redux";

import EditorButton from "./EditorButton"
import { ButtonTypes } from '../ConstructorButtonBase';
import {TemplateTypes} from "../Templates/TemplateTypes"
import {addRegisterWithTemplate} from "../Templates/TemplateActions"

function RegisterEditor(props) {

    //const register = useSelector(state => state.constructor.register)

    const dispatch = useDispatch()

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

        }

        setAnchorEl(null);
    };

    return (
        <>
            {
                !props.register ?
                    <></> :
                    <>
                        <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                            <div style={{ padding: "10px" }}>
                                <Typography>
                                    {props.register.id.string} : {props.register.text} {(props.register.subText ? "- " + props.register.subText : "")}
                                </Typography>
                            </div>

                            <div style={{ display: "block", alignItems: "flex-start", justifyItems: "center" }}>
                                {
                                    props.register.answersList.map((item, index) => (
                                        <EditorButton key={index} parentRegister={JSON.stringify(item)} type={ButtonTypes.content}>
                                            {item.id.string}: {item.text}
                                        </EditorButton>
                                    ))
                                }
                            </div>

                            <div style={{ marginTop: "40px" }}>
                                <EditorButton parentRegister={JSON.stringify(props.register)} type={ButtonTypes.add}>
                                    *Добавить*
                                </EditorButton>
                                {/* <EditorButton parentRegister={JSON.stringify(props.register)} type={ButtonTypes.addTemplate}>
                                    *Добавить по шаблону*
                                </EditorButton> */}
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
                                        Оцените 0..10
                                    </MenuItem>
                                    <MenuItem onClick={handleTemplateButtons} id="template_button_segments">
                                        <ListItemIcon>
                                            <CommitIcon fontSize="small" />
                                        </ListItemIcon>
                                        Интервалы
                                    </MenuItem>
                                </Menu>
                            </div>


                        </div>

                    </>
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