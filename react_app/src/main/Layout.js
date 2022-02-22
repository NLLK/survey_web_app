import { Outlet } from "react-router-dom";

import SideBar from "../pages/Common/SideBar/SideBar";



export default function Layout () {
    return (
        <SideBar>
            <Outlet />
        </SideBar>
    )
}