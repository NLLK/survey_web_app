import React from "react";

//import SplitterLayout from 'react-splitter-layout';
//import 'react-splitter-layout/lib/index.css';

import './styles.css'
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SideBarHandler from "../Common/SideBar/SideBarHandler";
import UserPermissionsWrapper from "../Common/UserPermissionsWrapper";

export default function ConstructorPage(props) {

  const UnderConstruction = () => {
    let i = 0;
    var rows = [];
    for (i = 0; i < 50; i++) {
      rows.push(<span key={i} style={{ fontSize: "30px" }}>UNDER CONSTRUCTION </span>)
    }
    return rows
  }

  return (
    <>
      <UserPermissionsWrapper permission={2}/>
      <SideBarHandler page_name="Конструктор анкет" width={300} menu_type={CONSTRUCTOR_MENU} />
      {
        UnderConstruction()
      }
    </>

  );
}
