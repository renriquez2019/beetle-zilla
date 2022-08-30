import logo from '../img/bug.png'

export const Header = ({openSidebar}) => {

    return (
        <div className="header">
            
            {/* Top-left Logo*/}
            <div className="logo-container">
                <a href="/dashboard">
                    <img src={logo} alt="" />
                    <span class="d-none d-lg-block">BugTracker</span>
                </a>
                <button
                    className="toggle-sidebar"
                    onClick={openSidebar}
                    >Toggle
                </button>
            </div>
        </div>
    )
}

Header.defaultProps = {
    openSidebar: true
}

export default Header