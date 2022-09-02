import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Card} from 'react-bootstrap'
import bug from '../img/bug.png'

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

                <section className="profile-section">
                    <Card className="profile-body1">
                        <img src ={bug}/>
                        <h2>Current User</h2>
                        <h3>Role: CurentRole</h3>
                    </Card>

                    <Card className="profile-body2">
                        <div className="profile-header">
                            <h2>Overview</h2>
                        </div>
                        <div className="profile-content">
                            <h5>About</h5>
                            <p>Lorem ipsum dolor sit amet, mea id dicit sententiae, usu id civibus consequuntur, vero congue est no. 
                            Ad feugiat lobortis concludaturque his. 
                            Duo paulo affert voluptatibus at. Sed an quando maiorum definitionem, erant zril mel an.</p>
                            <h5>Profile Details</h5>

                            <div className="row">
                                <span>Display Name</span>
                                <span>Ryan Enriquez</span>
                            </div>

                            <div className="row">
                                <span>Role</span>
                                <span>Admin</span>
                            </div>

                            <div className="row">
                                <span>Company</span>
                                <span>UCF</span>
                            </div>

                            <div className="row">
                                <span>Phone</span>
                                <span>561-555-3232</span>
                            </div>

                            <div className="row">
                                <span>Email</span>
                                <span>ryrydddde@gmail.com</span>
                            </div>

                            <button>Edit Profile</button>
                        </div>
                    </Card>
                </section>
            </div>

        </div>
    );
}