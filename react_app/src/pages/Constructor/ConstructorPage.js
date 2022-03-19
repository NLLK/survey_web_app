import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Fab, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";

import { CONSTRUCTOR_SET_QUESTIONNAIRE, CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS } from "./Reducer/ConstructorReducerTypes";

import RegisterViewer from './RegisterViewer/RegisterViewer'
import ViewerButton from "./RegisterViewer/ViewerButton";
import { Questionnaire } from "./Models/Models";

import { ButtonTypes } from './RegisterViewer/ViewerButton'

import RegisterEditor from './RegisterEditor/RegisterEditor'

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

		const qInfo = Questionnaire.test()//await GetQuestionnaireById(setQuestionnaireInfo, id)
		console.log('or', await GetQuestionnaireById(setQuestionnaireInfo, id))
		console.log('test', qInfo)

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
				: // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
				// Other native context menus might behave different.
				// With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
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
					<SideBarHandler page_name={"Конструктор анкет: " + questionnaire.name} width={300} menu_type={CONSTRUCTOR_MENU} />
					<div className="constructor">
						<div className="c-left-part">
							<div className="c-registerViewer" style={{ overflow: "auto" }} onContextMenu={handleContextMenu}>

								<div >
									{
										RegisterViewer(questionnaire.fields, showAddButtons)
									}
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
									<MenuItem onClick={()=>{
										dispatch({ type: CONSTRUCTOR_TOOGLE_SHOW_ADD_BUTTONS })
										handleClose();
									}}>Скрыть кнопки "+"</MenuItem>
								</Menu>
								{/* <div style={{ justifyContent: "end", alignItems: "start" }}>
									<Fab color="primary" aria-label="add">
										<AddIcon />
									</Fab>
								</div> */}

							</div>

							<div className="c-answerEditor">

							</div>
						</div>
						<div className="c-registerEditor">
							<RegisterEditor>

							</RegisterEditor>
						</div>
					</div>
				</>
					: <></>
			}

		</>

	);
}
