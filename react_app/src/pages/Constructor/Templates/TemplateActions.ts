import {TemplateTypes} from "./TemplateTypes"
import {CONSTRUCTOR_ADD_WITH_TEMPLATE} from "../Reducer/ConstructorReducerTypes"

export function addRegisterWithTemplate(template: TemplateTypes, dispatch): void{
    dispatch({type: CONSTRUCTOR_ADD_WITH_TEMPLATE, payload: template})
}