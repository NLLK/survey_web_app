import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import CreateIcon from '@mui/icons-material/Create';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useNavigate } from 'react-router-dom';

export const SELECT_QUESTIONNAIRE_MENU = 0
export const CONSTRUCTOR_MENU = 1
export const QUESTIONNAIRE_VIEWER_MENU = 2
export const ACCOUNT_MANAGE_MENU = 3


export default function SideBarList(props) {
    const navigate = useNavigate()
    switch (props.menu_type) {
        case SELECT_QUESTIONNAIRE_MENU:
            return (
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Создать" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ImportExportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Импорт" />
                    </ListItem>
                </List>
            );
        case CONSTRUCTOR_MENU:
            return (
                <List>
                    <ListItem button onClick={() => navigate('selectQuestionnaire')}>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Выбрать/Создать анкету" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <InfoIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Свойства анкеты" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SaveIcon />
                        </ListItemIcon>
                        <ListItemText primary="Сохранить" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SaveAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="Экспорт в файл" />
                    </ListItem>
                </List>
            );
        case ACCOUNT_MANAGE_MENU:
            return (
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Создать" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ImportExportIcon />
                        </ListItemIcon>
                        <ListItemText primary="Импорт" />
                    </ListItem>
                </List>
            );
        default: return (<h1>Somesthing went wrong</h1>)
    }
}