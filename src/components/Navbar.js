import React from 'react'
import './Navbar.css';
// import { Link } from 'react-router-dom'

const Navbar = (props) => {
    // render() {
    // let title=props;
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark nav1">
                <div className="container-fluid">
                    {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" aria-current="page" href="/">{props.title}</a> </li>
                    </ul> */}
                    <div className="navbar-brand d-flex align-items-center">
                        <a className="navbar-brand-title" href="/">{props.title}</a>
                    </div>
                </div>
            </nav>
        </div>
    )
    // }
}
export default Navbar
