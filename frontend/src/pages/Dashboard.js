import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

    const [sidebar, setSidebar] = useState(true)
    const toggleSidebar = () => setSidebar(!sidebar)

    return (
        <div className="dashboard">
            <Header openSidebar={toggleSidebar}/>
            <Sidebar Sidebar={sidebar} />
        </div>
    );
}