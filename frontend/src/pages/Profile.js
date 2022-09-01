import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from 'react-bootstrap/Card';

export default function Profile() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Profile"/>
            
            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>User Profile</h1>
                </div>
            </div>

        </div>
    );
}