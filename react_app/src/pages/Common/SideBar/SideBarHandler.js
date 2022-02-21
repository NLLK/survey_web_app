import { useEffect } from "react";
import { useDispatch } from 'react-redux'

import { SIDEBAR_CHANGE_PAGE } from "./Reducer/SideBarReducerTypes";

export default function SideBarHandler(props){

    const dispatch = useDispatch()
    useEffect(() => {
        
        dispatch(
            {
                type: SIDEBAR_CHANGE_PAGE,
                payload: {
                    menu_type: props.menu_type,
                    width: props.width,
                    page_name: props.page_name
                }
            }
        )
    }, [props]);

    return(props.children);
}