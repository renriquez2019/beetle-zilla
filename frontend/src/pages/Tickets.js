import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Tickets() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    return (
        <div>
            <Header 
                openSidebar={toggleSidebar} />
            <Sidebar
                toggle={sidebar}
                navCurrent = "Ticket"/>
        </div>
    );
}