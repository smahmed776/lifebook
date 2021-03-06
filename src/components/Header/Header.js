import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import API from '../../api/API';
import { NotificationContext } from '../../globalcontext/isLogged';
import './Header.css'
import Notification from './Notification';
import mainLogo from './mainLogo.jpg'

const Header = ({ currentUser }) => {


    const logout = async () => {

        try {
            await API.delete("/logout", { headers: { "Content-Type": "application/json" } });
            localStorage.setItem('token', '');
            window.location.replace("/")
        } catch (error) {
            console.log(error);
        }
    }
   
   

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-white sticky-top vw-100 border-bottom" id="navbar">
            <div className="container-fluid d-flex justify-content-between align-items-center px-3">
                <div className="navbrand">
                    <a className="navbar-brand me-1" href="/" > <img src={mainLogo} className="rounded-pill border" height="50px" width="50px" alt="" /> </a>
                    <button className="btn rounded-pill bg-light navsearch border">
                        <form action="">
                            <button type="submit" className="bg-light bi bi-search navsearchbtn"></button>
                            <input type="search" className="form-control d-none d-xl-inline w-auto ms-2 bg-light navsearchinp" name="search" placeholder="Search lifebook..." />
                        </form>
                    </button>
                </div>


                {/* middle navbar  */}


                <ul className="navbar-nav mid-nav justify-content-between d-flex">
                    <li className="nav-item d-none d-md-block">
                        <Link to="/" className="nav-link "><span className="bi bi-house-door"></span></Link>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link d-none d-md-block"><span className="bi bi-collection-play"></span></a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link d-none d-md-block"><span className="bi bi-shop"></span></a>
                    </li>
                    <li className="nav-item">
                        <a href="" className="nav-link d-none d-md-block"><span className="bi bi-people"></span></a>
                    </li>
                    <li className="nav-item d-flex align-items-center">
                        <Notification currentUser={currentUser}/>
                    </li>
                </ul>



                {/* mobile off canvas  */}


                <button className="btn navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav" aria-controls="offcanvasNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="offcanvas offcanvas-start d-sm-none bg-light" tabindex="-1" id="offcanvasNav" aria-labelledby="offcanvasNavLabel">
                    <div className="offcanvas-header justify-content-center">
                        <button type="button" className="btn-close text-reset text-center" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body justify-content-center align-items-center">

                        <ul className="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn" data-bs-dismiss="offcanvas" aria-label="Close">

                                        <Link className="nav-link" to={`/profile?id=${currentUser._id}`}>
                                <div className="row m-0">
                                    <div className="col-2 m-0 ">
                                            <img src={currentUser.image} className="d-inline rounded-pill" height="35px" width="35px" alt={currentUser.name} />
                                    </div>
                                    <div className="col-10 m-0">

                                    <p className="d-inline text-dark ps-2">{currentUser.name}</p>
                                    <p className="text-muted">See your profile</p>
                                    </div>
                                </div>
                                        </Link>
                                </button>
                            </li>
                            <hr />
                            <div className="row row-cols-2 gx-3 gy-3 my-2 px-3">
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-bookmark"></span>
                                        <p>Saved</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-collection"></span>
                                        <p>Videos</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-flag"></span>
                                        <p>Pages</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-shop"></span>
                                        <p>Marketplace</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-people"></span>
                                        <p>Groups</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-person"></span>
                                        <p>Friends</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-calendar"></span>
                                        <p>Events</p>
                                    </div>
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link to="#" className="text-dark" style={{textDecoration: "none"}}>
                                    <div className="d-flex flex-column align-items-center bg-white border p-2">
                                        <span className="bi bi-gear"></span>
                                        <p>Settings</p>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            {/* <li className="nav-item rounded-pill border bg-light me-2 px-2">
                                <a className="nav-link active" href="#" aria-current="page" ><span className="bi bi-plus"></span></a>
                            </li>
                            <li className="nav-item rounded-pill border bg-light me-2 px-2">
                                <a className="nav-link" href="#about-me" ><span className="bi bi-chat-fill"></span></a>
                            </li>
                            <li className="nav-item rounded-pill border bg-light me-2 px-2">
                                <a className="nav-link" href="#my-skills" > <span className="bi bi-bell"></span></a>
                            </li>
                            <li className="nav-item rounded-pill border bg-light me-2 px-2 dropstart">
                                <a className="nav-link" href="#my-works" role="button" id="profiledrop" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="bi bi-caret-down-fill"></span>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="profiledrop">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                </ul>
                            </li> */}
                            <button type="button" className="btn btn-secondary w-100 " onClick={logout}> Log Out </button>
                        </ul>

                    </div>
                </div>


                {/* right side navbar  */}


                <div className="d-none d-sm-block" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                        <li className="nav-item navuname d-none d-xl-block">
                            <Link className="nav-link " to={`/profile?id=${currentUser._id}`}>
                                {currentUser.image ? <img src={currentUser.image} className="d-inline rounded-pill" height="35px" width="35px" alt={currentUser.name} />
                                    : <span className="bi bi-person-circle" style={{ fontSize: "1.5rem" }}></span>}
                                <p className="d-inline text-dark ps-2">{currentUser.name}</p>
                            </Link>
                        </li>
                        <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2">
                            <a className="nav-link active" href="#" aria-current="page" ><span className="bi bi-plus"></span></a>
                        </li>
                        <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2">
                            <a className="nav-link" href="#about-me" ><span className="bi bi-chat-fill"></span></a>
                        </li>
                        <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2">
                            <a className="nav-link" href="#my-skills" > <span className="bi bi-bell"></span></a>
                        </li>
                        <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2 dropdown">
                            <a className="nav-link" href="#my-works" role="button" id="profiledrop" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="bi bi-caret-down-fill"></span>
                            </a>
                            <ul class="dropdown-menu nav-drop-down" aria-labelledby="profiledrop">
                                <li>
                                    <Link className="row w-100" to={`/profile?id=${currentUser._id}`}>
                                        <div className="col-3">

                                            <img src={currentUser.image} className="rounded-pill mt-1" height="56px" width="56px" alt={currentUser.name} />
                                        </div>
                                        <div className="col-8 pt-2">

                                            <h6 className="text-dark">{currentUser.name}</h6>
                                            <small className="text-muted">See your profile</small>
                                        </div>
                                    </Link>
                                </li>
                                <hr />
                                <li>
                                    <a class="row w-100 text-dark ps-1" href="#">
                                        <div className="col-3 p-2">
                                            <div className="icon-drop-down rounded-pill bg-light">
                                                <span className="bi bi-chat-left-quote-fill ps-2"></span>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <h6 className="text-dark">Give FeedBack</h6>
                                            <small className="text-muted">help us improve new lifebook</small>
                                        </div>
                                    </a>
                                </li>
                                <hr />
                                <li>
                                    <a class="row w-100 text-dark ps-1" href="#">
                                        <div className="col-3 p-2">
                                            <div className="icon-drop-down bg-light rounded-pill">
                                                <span className="bi bi-gear ps-2"></span>
                                            </div>
                                        </div>
                                        <div className="col-8 d-flex align-items-center">
                                            <h6 className="text-dark">Settings & Privacy</h6>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a class="row w-100 text-dark ps-1" href="#">
                                        <div className="col-3 p-2">
                                            <div className="icon-drop-down bg-light rounded-pill">
                                                <span className="bi bi-question-circle ps-2"></span>
                                            </div>
                                        </div>
                                        <div className="col-8 d-flex align-items-center">
                                            <h6 className="text-dark">Help & Support</h6>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a class="row w-100 text-dark ps-1" href="#">
                                        <div className="col-3 p-2 ">
                                            <div className="icon-drop-down bg-light rounded-pill">
                                                <span className="bi bi-moon-fill ps-2"></span>
                                            </div>
                                        </div>
                                        <div className="col-8 d-flex align-items-center">
                                            <h6 className="text-dark">Display & Accessibility</h6>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a onClick={logout} class="row w-100 text-dark ps-1" href="#">
                                        <div className="col-3 p-2">
                                            <div className="icon-drop-down bg-light rounded-pill">
                                                <span className="bi bi-box-arrow-left ps-2"></span>
                                            </div>
                                        </div>
                                        <div className="col-8 d-flex align-items-center">
                                            <h6 className="text-dark">Log Out</h6>
                                        </div>
                                    </a>
                                </li>
                                <hr />
                                <li>
                                    <div className="row w-100 text-muted ps-1" href="#">
                                        <div className="col-12 p-2" style={{ fontSize: "1rem" }}>
                                            <a className="px-2" href="">Privacy</a>.
                                            <a className="px-2" href="">Terms</a>.
                                            <a className="px-2" href="">Advertising</a>.
                                            <a className="px-2" href="">Ad Choices</a>.
                                            <a className="px-2" href="">Cookies</a>.
                                            <a className="px-2" href="">More</a>.
                                            @lifebook 2021
                                        </div>
                                    </div>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
