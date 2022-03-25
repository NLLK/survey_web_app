import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Fab, ListItemIcon, Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";

import { CONSTRUCTOR_SET_QUESTIONNAIRE, CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS } from "./Reducer/ConstructorReducerTypes";

import { Questionnaire } from "./Models/Models";

import RegisterViewer from './RegisterViewer/RegisterViewer'
import RegisterEditor from './RegisterEditor/RegisterEditor'
import AnswerEditor from './AnswerEditor/AnswerEditor'
import Notifier from "./Notifier/Notifier";

export default function ConstructorPage(props) {
	let params = useParams();

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [questionnaireInfo, setQuestionnaireInfo] = useState(QuestionnaireTemplate)
	const questionnaire = useSelector(state => state.constructor.questionnaire)
	const showAddButtons = useSelector(state => state.constructor.showAddButtons)

	useEffect(() => {
		let id = -1;
		if (params.id === undefined && props.id === undefined)
			navigate('/')//TODO: add error page
		else if (params.id !== undefined) {
			id = params.id
		}
		else {
			id = props.id
		}

		if (id > -1) {
			getQuestionnaire(id)
		}

	}, [navigate, params, props])

	const getQuestionnaire = async (id) => {

		const qInfo = await GetQuestionnaireById(setQuestionnaireInfo, id)//Questionnaire.test()//await GetQuestionnaireById(setQuestionnaireInfo, id)
		//console.log('or', await GetQuestionnaireById(setQuestionnaireInfo, id))
		console.log('or', qInfo)

		let qTest = {
			...qInfo,
			fields: qInfo.fields
		}

		dispatch({ type: CONSTRUCTOR_SET_QUESTIONNAIRE, payload: qTest })
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
					<Notifier/>
					<SideBarHandler page_name={"Конструктор анкет: " + questionnaire.name} width={300} menu_type={CONSTRUCTOR_MENU} />
					<div className="constructor">
						<div className="c-left-part">
							<div className="c-registerViewer" style={{ overflow: "auto" }} onContextMenu={handleContextMenu}>
								<div >
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
