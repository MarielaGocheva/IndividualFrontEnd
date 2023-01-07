import React from "react";
import NavBarClient from "../Components/NavBarClient";
import SearchBarClient from "../Components/SearchBarClient";

export default function ClientHomePage(){
    return (
        <>
         <div className="menu-grid">
    <div className="menu"> 
    <NavBarClient />
       </div>
      <div className="content"> 
        <h1>CLIENT</h1>
        <SearchBarClient />
        </div>
        </div>
        </>
    )
}