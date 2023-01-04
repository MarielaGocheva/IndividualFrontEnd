import React from "react";
import NavBar from "../Components/NavBar";
import SearchBarClient from "../Components/SearchBarClient";

export default function ClientHomePage(){
    return (
        <>
         <div className="menu-grid">
    <div className="menu"> 
    <ul>    
        {/* <CustomLink to="/"><img src={logo} className="logo" alt="logo"/></CustomLink> */}
      </ul> 
    <NavBar />
       </div>
      <div className="content"> 
        <h1>CLIENT</h1>
        <SearchBarClient />
        </div>
        </div>
        </>
    )
}