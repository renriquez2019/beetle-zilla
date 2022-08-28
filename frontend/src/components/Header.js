import logo from '../img/bug.png'

export default function Header() {

    return (
        <form className="header-form">
            <h2 className="header-title">
                <img className='header-logo' src={logo} alt="Logo"/>
                Bug Tracker
            </h2>
        </form>
    );
}