import logo from '../img/bug.png'

export default function Header() {

    return (
        <div className="header-container">
            <div className="logo-container">
                <a href="/dashboard" className="title-text">
                    <img src={logo} height="58px" alt="Logo" />
                    Bug Tracker
                </a>
            </div>
        </div>
    );
}