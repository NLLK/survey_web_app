import { Outlet, Link } from "react-router-dom";

import SideBar from "../pages/Common/SideBar/SideBar";



export default function () {
    return (
        <SideBar>
            <Outlet />
        </SideBar>
    )
}