import React, { Component } from "react";
import './styles.css'
import SideBar from "../Common/SideBar/SideBar"
import { CONSTRUCTOR_MENU } from "../Common/SideBar/SideBarList";
import SplitterLayout from 'react-splitter-layout';
//import 'react-splitter-layout/lib/index.css';
import SideBarHandler from "../Common/SideBar/SideBarHandler";


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
    <SideBarHandler page_name = "Конструктор анкет" width={300} menu_type = {CONSTRUCTOR_MENU}>
      {/*<SideBar menu_type = {CONSTRUCTOR_MENU} name = "Конструктор Анкет" width={300}> */}
      {
        UnderConstruction()
      }
    </SideBarHandler>
  );
}
