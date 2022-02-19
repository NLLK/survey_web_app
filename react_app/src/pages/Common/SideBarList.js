import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CreateIcon from '@mui/icons-material/Create';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export const SELECT_QUESTIONNAIRE_MENU = 0
export const CONSTRUCTOR_MENU = 1
export const QUESTIONNAIRE_VIEWER_MENU = 2



export default function SideBarList(props) {
    switch (props.menu_type) {
        case SELECT_QUESTIONNAIRE_MENU:
            return (
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <CreateIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Создать" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ImportExportIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Импорт" />
                    </ListItem>
                </List>
            );
        default: return(<h1>Somesthing went wrong</h1>)
    }
}