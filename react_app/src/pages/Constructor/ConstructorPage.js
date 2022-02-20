import React, { Component } from "react";
import './styles.css'
import SideBar from "../Common/SideBar"
import {CONSTRUCTOR_MENU} from "../Common/SideBarList";
import SplitterLayout from 'react-splitter-layout';
//import 'react-splitter-layout/lib/index.css';



export default function ConstructorPage(props) {

  const UnderConstruction = () =>{
    let i = 0;
    var rows = [];
    for (i = 0; i< 50; i++)
    {
      rows.push(<span key={i} style={{fontSize: "30px"}}>UNDER CONSTRUCTION </span>)
    }
    return rows
  }

  return (
    <SideBar menu_type = {CONSTRUCTOR_MENU} name = "Конструктор Анкет" width={300}>
      {
        UnderConstruction()
      }
    </SideBar>
  );
}
