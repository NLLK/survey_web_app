import { Button, Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react'
import { connect } from "react-redux";


import EditorButton from "./EditorButton"
import { ButtonTypes } from '../ConstructorButtonBase';

function RegisterEditor(props) {

    //const register = useSelector(state => state.constructor.register)

    React.useEffect(() => {

    }, [props])

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
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
                                    style = {{margin: "15px",display: "block", width: "-webkit-fill-available"}}
                                >
                                    Dashboard
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                      }}
                                    sx = {{width: "-webkit-fill-available"}}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                    
                                >
                                    <MenuItem onClick={handleClose}>Да / Нет</MenuItem>
                                    <MenuItem onClick={handleClose}>Оцените 0..10</MenuItem>
                                    <MenuItem onClick={handleClose}>Интервалы</MenuItem>
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