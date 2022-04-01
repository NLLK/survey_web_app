import { List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import { Component, useState } from "react"

import ReactDragListView from "react-drag-listview"
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default class OrderScale extends Component {
    constructor(props) {
        super(props);

        const data = [];

        props.question.answersList.forEach(element => {
            data.push({
                title: element.text,
                id: element.id.string,
                type: element.type
            });
        });

        this.state = {
            data
        };
    }

    render() {
        const that = this;
        const dragProps = {
            onDragEnd(fromIndex, toIndex) {
                const data = [...that.state.data];
                const item = data.splice(fromIndex, 1)[0];
                data.splice(toIndex, 0, item);
                that.setState({ data });
            },
            nodeSelector: 'li',
            handleSelector: 'svg'
        };

        return (
            <>
            <Typography variant="subtitle1" sx={{color: "rgba(0, 0, 0, 0.6)"}}>Расположите в порядке убывания (выше - лучше)</Typography>
                <ReactDragListView {...dragProps}>
                    <List id = {this.props.question.id.string+' '+this.props.question.type}>
                        {this.state.data.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <DragIndicatorIcon />
                                </ListItemIcon>
                                <ListItemText id={item.id+' '+item.type}
                                    primary={item.title}
                                />
                            </ListItem>
                        ))}
                    </List>
                </ReactDragListView>
            </>
        );
    }
}
