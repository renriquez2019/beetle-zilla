import logo from '../img/bug.png'

export default function Title() {

    return (
        <form className="title-form">
            <h2 className="title-text">
                <img className='title-logo' src={logo} alt="Logo"/>
                Bug Tracker
            </h2>
        </form>
    );
}