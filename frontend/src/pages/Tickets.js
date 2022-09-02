import { useState } from "react";
import { Card } from "react-bootstrap";
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

            <div className= {sidebar ? "main" : "main main-side"}>
                <div className="pagetitle">
                    <h1>Tickets</h1>
                </div>

                <section className= "tickets-section">
                    <Card className="tickets-body">
                        <h2>My Tickets</h2>
                    </Card>
                </section>

            </div>

        </div>
    );
}