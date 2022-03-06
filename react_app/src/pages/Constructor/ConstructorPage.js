import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";
import { GetQuestionnaireById, QuestionnaireTemplate } from "../SelectQuestionnaire/QuestionnaireActions";
// import ViewerButton from "./RegisterViewer/ViewerButton";
import TextBox from "./RegisterViewer/TextBox";

import RegisterViewer from './RegisterViewer/RegisterViewer'
import DivWithCoords from "./RegisterViewer/DivWithCoords";
import ViewerButton from "./RegisterViewer/ViewerButton";

export default function ConstructorPage(props) {
	let params = useParams();

	const navigate = useNavigate()

	//const [questionnaireEditingId, setQuestionnaireEditingId] = useState(-1)
	const [questionnaireInfo, setQuestionnaireInfo] = useState(QuestionnaireTemplate)

	useEffect(() => {
		let id = -1;
		if (params.id === undefined && props.id === undefined)
			navigate('/')//TODO: add error page
		else if (params.id !== undefined) {
			//setQuestionnaireEditingId(params.id)
			id = params.id
		}
		else {
			//setQuestionnaireEditingId(props.id)
			id = props.id
		}

		if (id > -1) GetQuestionnaireById(setQuestionnaireInfo, id)


		// let q = JSON.stringify(Question.test())
		// console.log(q)
		// setQuestionnaireInfo(prevState => ({
		//   ...prevState,
		//   fields: q,
		// }));



	}, [navigate, params, props])


	// const UnderConstruction = () => {
	//   let i = 0;
	//   var rows = [];
	//   for (i = 0; i < 50; i++) {
	//     rows.push(<span key={i} style={{ fontSize: "30px" }}>UNDER CONSTRUCTION</span>)
	//   }
	//   return rows
	// }

	return (
		<>
			{/* <UserPermissionsWrapper permission={2} /> */}
			<SideBarHandler page_name={"Конструктор анкет: " + questionnaireInfo.name} width={300} menu_type={CONSTRUCTOR_MENU} />
			<div className="constructor">
				<div className="c-left-part">
					<div className="c-registerViewer" style={{ overflow: "auto", position: "relative", paddingLeft: "10 px" }}>
						{/* <div style={{ position: "absolute", left: 10 + "px", top: 10 + "px" }}>
              {
                //RegisterViewer(questionnaireInfo.fields)
              }
            </div> */}
						<div>
							<div style={{ position: "relative" }}>
								<ViewerButton>
									1
								</ViewerButton>
								<div style={{ position: "relative", left: 100 + "px" }}>
									<ViewerButton>
										1.1
									</ViewerButton>
									<ViewerButton>
										1.2
									</ViewerButton>
									<div style={{ position: "relative" }}>
										<ViewerButton>
											1.3.1
										</ViewerButton>
										<div style={{ position: "relative", left: 100 + "px" }}>
											<ViewerButton>
												1.3.1.1
											</ViewerButton>
											<ViewerButton>
												1.3.1.2
											</ViewerButton>
										</div>
									</div>
									<ViewerButton>
										1.4
									</ViewerButton>
								</div>
							</div>
						</div>

						<div>
							<div style={{ position: "relative" }}>
								<ViewerButton>
									2
								</ViewerButton>
								<div style={{ position: "relative", left: 100 + "px" }}>
									<ViewerButton>
										2.1
									</ViewerButton>
									<ViewerButton>
										2.2
									</ViewerButton>
								</div>
							</div>
						</div>


					</div>



					<div className="c-registerEditor">

					</div>
				</div>
				<div className="c-registerPicker">

				</div>
			</div>
		</>

	);
}
