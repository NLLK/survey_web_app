import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Fab, ListItemIcon, Menu, MenuItem, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";

import { CONSTRUCTOR_EDIT_INTRO, CONSTRUCTOR_SET_QUESTIONNAIRE, CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS } from "./Reducer/ConstructorReducerTypes";

import { Questionnaire } from "./Models/Models";

import RegisterViewer from './RegisterViewer/RegisterViewer'
import RegisterEditor from './RegisterEditor/RegisterEditor'
import AnswerEditor from './AnswerEditor/AnswerEditor'
import Notifier from "./Notifier/Notifier";

export default function ConstructorPage(props) {
	let params = useParams();

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [intro, setIntro] = useState("")

	const questionnaire = useSelector(state => state.constructor.questionnaire)
	const showAddButtons = useSelector(state => state.constructor.showAddButtons)

	useEffect(() => {
		let id = params.id

		if (id > -1) {
			getQuestionnaire(id)
		}
		console.log('aaa')
	}, [params, props])

	const getQuestionnaire = async (id) => {
		const qInfo = await GetQuestionnaireById(id)
		dispatch({ type: CONSTRUCTOR_SET_QUESTIONNAIRE, payload: qInfo })
		setIntro(qInfo.introduction)
	}


	const [contextMenu, setContextMenu] = React.useState(null);

	const handleContextMenu = (event) => {

		setContextMenu(
			contextMenu === null
				? {
					mouseX: event.clientX - 2,
					mouseY: event.clientY - 4,
				}
				:
				null,
		);
		event.preventDefault();
	};

	const handleClose = () => {
		setContextMenu(null);
	};

	return (
		<>
			{/* <UserPermissionsWrapper permission={2} /> */}
			{
				questionnaire ? <>
					<Notifier />
					<SideBarHandler page_name={"Конструктор анкет: " + questionnaire.name} width={300} menu_type={CONSTRUCTOR_MENU} />
					<div className="constructor">
						<div className="c-left-part">
							<div className="c-registerViewer" style={{ overflow: "auto" }} onContextMenu={handleContextMenu}>
								<div >
									<TextField
										label="Вступление: "
										minRows={2}
										multiline
										value={intro}
										onChange={(e)=>{ 
											console.log('a')
											setIntro(e.target.value)
											dispatch({type: CONSTRUCTOR_EDIT_INTRO, payload: intro})
										}}
										sx={{ marginBottom: "15px", marginTop: "10px", width: "50%" }}>
										
									</TextField>
									<RegisterViewer>

									</RegisterViewer>
								</div>
								<Menu
									transitionDuration={100}
									open={contextMenu !== null}
									onClose={handleClose}
									anchorReference="anchorPosition"
									anchorPosition={
										contextMenu !== null
											? { top: contextMenu.mouseY, left: contextMenu.mouseX }
											: undefined
									}
								>
									<MenuItem onClick={() => {
										dispatch({ type: CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS })
										handleClose();
									}}>
										<ListItemIcon>
											{
												showAddButtons ?
													<VisibilityOffIcon fontSize="small" />
													: <VisibilityIcon fontSize="small" />
											}
										</ListItemIcon>
										{showAddButtons ? "Скрыть" : "Показать"} кнопки "+"
									</MenuItem>
								</Menu>
							</div>

							<div className="c-answerEditor">
								<AnswerEditor />
							</div>
						</div>
						<div className="c-registerEditor">
							<RegisterEditor />
						</div>
					</div>
				</>
					: <></>
			}

		</>

	);
}