import { useState } from "react";
import { Card } from "react-bootstrap";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    
    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Dashboard"/>

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Dashboard Home</h1>
                </div>

            </div>  
        </div>
    );
}