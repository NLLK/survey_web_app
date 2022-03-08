import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";

import { CONSTRUCTOR_SET_QUESTIONNAIRE } from "./Reducer/ConstructorReducerTypes";

import TextBox from "./RegisterViewer/TextBox";
import RegisterViewer from './RegisterViewer/RegisterViewer'
import DivWithCoords from "./RegisterViewer/DivWithCoords";
import ViewerButton from "./RegisterViewer/ViewerButton";
import { Question, Questionnaire } from "./Models/Models";

import {ButtonTypes} from './RegisterViewer/ViewerButton'

export default function ConstructorPage(props) {
	let params = useParams();

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [questionnaireInfo, setQuestionnaireInfo] = useState(QuestionnaireTemplate)
	const questionnaire = useSelector(state => state.constructor.questionnaire)


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

	return (
		<>
			{/* <UserPermissionsWrapper permission={2} /> */}
			{
				questionnaire ? <>
					<SideBarHandler page_name={"Конструктор анкет: " + questionnaire.name} width={300} menu_type={CONSTRUCTOR_MENU} />
					<div className="constructor">
						<div className="c-left-part">
							<div className="c-registerViewer" style={{ overflow: "auto"}}>
								<div style={{ position: "relative", paddingLeft: "10 px" }}>
									{
										RegisterViewer(questionnaire.fields)
									}

									<ViewerButton type={ButtonTypes.addParent}>+</ViewerButton>
								</div>


							</div>

							<div className="c-answerEditor">

							</div>
						</div>
						<div className="c-registerEditor">

						</div>
					</div>
				</>
					: <></>
			}

		</>

	);
}
