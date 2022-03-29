import { Button } from "@mui/material";
import { useEffect } from "react";
import { connect, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import { BLANK_MENU } from "../Common/SideBar/SideBarList";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import QuestionnaireCard, { QuestionCardTypes } from "../SelectQuestionnaire/QuestionnaireCard";
import { getQuestionnaireList } from "../SelectQuestionnaire/SelectQuestionnaireActions";

function SelectQForBrowser(props) {
    let params = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getQuestionnaireList(dispatch);
    }, [dispatch])

    const questionnaires = props.questionnaires
    const buttonStyle = {
        margin: '5px'
    }
    return (
        <div>
            {/* <UserPermissionsWrapper permission={1} /> */}
            <SideBarHandler page_name="Анкетирование: Выбор анкеты" menu_type={BLANK_MENU} />

            <div style={{ display: "inline" }}> {
                questionnaires.map((item, index) =>
                    <div key={index} style={{ display: 'inline-block', marginRight: 15 + "px" }}>
                        <QuestionnaireCard cardInfo={item} type={QuestionCardTypes.Browser}/>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        questionnaires: state.selectQuestionnaire.questionnaires,
    }
}

export default connect(mapStateToProps)(SelectQForBrowser)