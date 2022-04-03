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
import { useDispatch } from 'react-redux';
import { SaveQuestionnaireDispatch } from '../../Constructor/ConstructorSidebarActions';

export const SELECT_QUESTIONNAIRE_MENU = "SELECT_QUESTIONNAIRE_MENU"
export const CONSTRUCTOR_MENU = "CONSTRUCTOR_MENU"
export const QUESTIONNAIRE_VIEWER_MENU = "QUESTIONNAIRE_VIEWER_MENU"
export const ACCOUNT_MANAGE_MENU = "ACCOUNT_MANAGE_MENU"
export const BLANK_MENU = "BLANK_MENU"

export default function SideBarList(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    switch (props.menu_type) {
        case SELECT_QUESTIONNAIRE_MENU:
            return (
                <List>
                    <ListItem button onClick={() => navigate('/constructor/selectQuestionnaire/create/')}>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Создать" />
                    </ListItem>
                </List>
            );
        case CONSTRUCTOR_MENU:
            return (
                <List>
                    <ListItem button onClick={() => navigate('/constructor/selectQuestionnaire')}>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primary="Выбрать/Создать анкету" />
                    </ListItem>
                    <ListItem button onClick={()=>SaveQuestionnaireDispatch(dispatch)}>
                        <ListItemIcon>
                            <SaveIcon />
                        </ListItemIcon>
                        <ListItemText primary="Сохранить" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/constructor/description')}>
                        <ListItemIcon>
                            <InfoIcon  />
                        </ListItemIcon>
                        <ListItemText primary="Свойства анкеты" />
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
                <div></div>
            );
        case BLANK_MENU:
            return(
                <div></div>
            );
        default: return (<h1>Somesthing went wrong</h1>)
    }
}