import { Button } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import { BLANK_MENU } from "../Common/SideBar/SideBarList";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import QuestionnaireCard from "../SelectQuestionnaire/QuestionnaireCard";
import { getQuestionnaireList } from "../SelectQuestionnaire/SelectQuestionnaireActions";

function BrowserPage(props) {
    let params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        
    }, [dispatch])

    const questionnaires = props.questionnaires
    const buttonStyle = {
        margin: '5px'
    }
    return (
        <div>
            {/* <UserPermissionsWrapper permission={1} /> */}
            <SideBarHandler page_name="Анкетирование: " menu_type={BLANK_MENU} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        
    }
}

export default connect(mapStateToProps)(BrowserPage)