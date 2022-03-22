import { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { SaveQuestionnaire } from "./NotifierActions"

function Notifier(props){

    const dispatch = useDispatch()

    useEffect(()=>{
        if(props)
        {
            if (props.saving){
                SaveQuestionnaire(props.questionnaire, dispatch)
            }

        }
    },[props.saving])
    
    return(<></>)
}

const mapStateToProps = (state) => {
    return{
        questionnaire: state.constructor.questionnaire,
        saving: state.constructor.saving
    }
}

export default connect(mapStateToProps)(Notifier)