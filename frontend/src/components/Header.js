import logo from '../img/bug.png'
import {BsList} from 'react-icons/bs'

export const Header = ({openSidebar}) => {

    return (
        <div className="header">
        
            {/* Top-left Logo*/}
            <div className="logo-container">
                <a href="/dashboard">
                    <img src={logo} alt="" />
                    <span class="d-none d-lg-block">BugTracker</span>
                </a>
                <BsList
                    className='toggle-sidebar'
                    type='button'
                    onClick={openSidebar}
                />
            </div>
        </div>
    )
}

Header.defaultProps = {
    openSidebar: true
}

export default Header