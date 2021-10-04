import React, { useContext, useRef, useState } from 'react';
import API from '../../api/API'
import { IsLoggedContext } from '../../globalcontext/isLogged';
import './homepage.css'

const HomePage = () => {

    const { isLoggedState } = useContext(IsLoggedContext)
    const [isLogged, setIsLogged] = isLoggedState;
    const [fName, setFname] = useState("")
    const [lName, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Dob, setDob] = useState("")
    const sspinner = useRef(null);
    const lspinner = useRef(null);
    const lbtn = useRef(null);
    const sbtn = useRef(null);
    const salert = useRef(null);
    const logSuccess = useRef(null);
    const signSuccess = useRef(null);
    const signForm = useRef(null);
    const spassword = useRef(null);



    const handleLoginForm = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            try {
                lbtn.current.setAttribute('disabled', 'true')
                lspinner.current.classList.remove('d-none')
                const email = e.target.elements.lemail.value;
                const password = e.target.elements.lpassword.value;
                const body = {
                    email, password
                }
                const option = { headers: { "Content-Type": "application/json" } }
                const res = await API.post("/login", body, option);
                const token = res.data.token;
                // console.log(res);
                isLogged.push([
                    token
                ])
                setIsLogged([
                    ...isLogged
                ])
                localStorage.setItem('token', JSON.stringify(token))
                logSuccess.current.classList.remove('d-none');
                setTimeout(() => {
                    logSuccess.current.classList.add('d-none')
                }, 3000);

                window.location.reload();
            } catch (error) {
                console.log(error.response);
                const alert = document.getElementById('halert');
                lspinner.current.classList.add('d-none')
                lbtn.current.removeAttribute('disabled')
                alert.classList.remove('d-none')
                alert.innerText = `${error.response.data}`;
                setTimeout(() => {
                    alert.classList.add('d-none')
                }, 5000);
            }
        }
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!e.target.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            if (e.target.elements.spassword.classList.value.includes("is-invalid")) {
                alert("Password invalid")
            } else {
                e.target.classList.add("was-validated");
                try {
                    sbtn.current.setAttribute('disabled', 'true')
                    sspinner.current.classList.remove('d-none')
                    const body = {
                        fName, lName, email, password, Dob
                    }
                    const option = { headers: { "Content-Type": "application/json" } }
                    console.log("here too");
                    await API.post('/signup', body, option);
                    signSuccess.current.classList.remove('d-none')
                    signSuccess.current.innerHTML = `<span class="bi bi-check-circle-fill text-success flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></span>
                    <div>Registration successfull. You can log in now! </div>`
                    setTimeout(() => {
                        signSuccess.current.classList.add('d-none')
                    }, 5000);
                    setFname('');
                    setLname('');
                    setEmail('');
                    setPassword('');
                    setDob('');
                    sspinner.current.classList.add('d-none')
                    sbtn.current.removeAttribute('disabled')
                    signForm.current.classList.remove('was-validated')
                    spassword.current.classList.remove('is-valid')
                    signForm.current.classList.add('needs-validation')

                } catch (error) {
                    salert.current.classList.remove('d-none')
                    salert.current.innerText = `${error.response.data}`;
                    setTimeout(() => {
                        salert.current.classList.add('d-none')
                    }, 5000);
                    sspinner.current.classList.add('d-none')
                    sbtn.current.removeAttribute('disabled')
                }

            }

        }
       
    }


    const passvalidate = e => {
        const pattern = {
            capitalLtr: /[A-Z]/g,
            smallLtr: /[a-z]/g,
            nmbr: /[0-9]/g,
            length: 8
        };
        let con1 = '';
        let con2 = '';
        let con3 = '';
        let con4 = '';

        if (!e.target.value.match(pattern.capitalLtr)) {
            con1 = "one capital letter,";
            e.target.classList.add("is-invalid")
            e.target.classList.remove("is-valid")
        }
        if (!e.target.value.match(pattern.smallLtr)) {
            con2 = "one small letter,";
            e.target.classList.add("is-invalid")
            e.target.classList.remove("is-valid")
        }
        if (!e.target.value.match(pattern.nmbr)) {
            con3 = "one number,";
            e.target.classList.add("is-invalid")
            e.target.classList.remove("is-valid")
        }
        if (e.target.value.length < pattern.length) {
            con4 = "8 characters long";
            e.target.classList.add("is-invalid")
            e.target.classList.remove("is-valid")
        }
        if (con1.length > 0 || con2.length > 0 || con3.length > 0 || con4.length > 0) {
            document.getElementById('spassfeedback').innerText = "Password must have atleast " + con1 + ' ' + con2 + ' ' + con3 + ' ' + con4 + '!';
        } else if (!e.target.value) {
            document.getElementById('spassfeedback').innerText = "Password required";
        } else {
            e.target.classList.add("is-valid")
            e.target.classList.remove("is-invalid")

        }
    }


    return (
        <>
            <div className="bg-light d-flex justify-content-center align-items-center vh-100 homepage-container">
                <div className="alert alert-danger d-flex align-items-center homepage-alert d-none" id="halert" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlinkHref="#exclamation-triangle-fill" /></svg>
                    <div>
                        An example danger alert with an icon
                    </div>
                </div>
                <div class="alert alert-success d-flex align-items-center homepage-alert d-none" ref={logSuccess} role="alert">
                    <span class="bi bi-check-circle-fill text-success flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"></span>
                    <div>
                        Logged in ... 
                    </div>
                </div>
                <div className="row gx-2 gy-5 gy-md-0 gx-md-5 p-3 p-md-5">
                    <div className="col-12 col-md-6 col-lg-7 h-50 d-flex justify-content-center align-items-center flex-column p-4">
                        <div className="px-md-2 px-lg-5 ">
                            <h1 className="text-primary text-start">Lifebook</h1>
                            <h3>
                                Lifebook helps you connect and share with the people in your life
                            </h3>
                            <img src="" id="img" alt="" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 ">
                        <div className="login-form pt-2 border bg-white px-2 shadow rounded">
                            <form action="#" onSubmit={e => handleLoginForm(e)} >
                                <div className="row row-cols-1 gy-4 p-2">
                                    <div className="col">
                                        <input type="email" name="name" id="lemail" className="form-control" placeholder="Email address or Phone number" required/>
                                    </div>
                                    <div className="col">
                                        <input type="password" name="password" id="lpassword" className="form-control" placeholder="Password" required/>
                                    </div>
                                    <div className="col px-4">
                                        <button type="submit" ref={lbtn} className="btn btn-primary w-100" >
                                            <span class="spinner-border spinner-border-sm me-3 d-none" ref={lspinner} role="status" aria-hidden="true"></span>
                                            Login
                                        </button>
                                    </div>
                                    <div className="col">
                                        <a href="#" className="nav-link text-center"> Forgotten password? </a>
                                        <hr />
                                    </div>
                                    <div className="col px-5 d-flex justify-content-center">
                                        <button type="button" className="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#signup">Create Account</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="w-100 px-3 pt-3">
                            <p>
                                <a href="#" className="nav-link d-inline">Create a page</a> for a celebrity, band or business.
                            </p>
                        </div>
                    </div>


                    <div class="modal fade" id="signup" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="signupLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div className="modal-title">
                                        <h3 class="modal-title" id="staticBackdropLabel">Sign Up</h3>
                                        <h6 className="text-muted">It's quick and easy</h6>
                                    </div>
                                    <div className="alert alert-danger d-flex justify-content-center d-none" ref={salert}></div>
                                    <div className="alert alert-success d-flex justify-content-center d-none" ref={signSuccess}></div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="#" onSubmit={e => handleSubmit(e)} className="needs-validation" ref={signForm} id="signform">
                                        <div className="row gy-2 gx-2 px-3">
                                            <div className="col-6">
                                                <input type="text" className="form-control" placeholder="First name" value={fName} onChange={e => setFname(e.target.value)} required />
                                            </div>
                                            <div className="col-6">
                                                <input type="text" className="form-control" placeholder="last name" value={lName} onChange={e => setLname(e.target.value)} required />
                                            </div>
                                            <div className="col-12">
                                                <input type="email" className="form-control" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="col-12">
                                                <input type="password" form="signform" className="form-control" id="spassword" ref={spassword} placeholder="password" onKeyUp={e => passvalidate(e)} value={password} onChange={e => setPassword(e.target.value)} required />
                                                <div className="invalid-feedback" id="spassfeedback"> Password required! </div>
                                            </div>
                                            <div className="col-12">
                                                <p className="text-muted" >Date of Birth: </p>
                                                <input type="date" className="form-control" placeholder value={Dob} onChange={e => setDob(e.target.value)} required />
                                            </div>

                                            <div className="col-12">
                                                <p className="text-muted" >Gender: </p>
                                                <div className="d-flex justify-content-evenly w-lg-50 px-2">
                                                    <div class="input-group ">
                                                        <div class="input-group-text" id="btnGroupAddon">
                                                            <input type="radio" class="form-check-input" name="gender" id="male" aria-label="gender" aria-describedby="btnGroupAddon" required />
                                                            <label htmlFor="male" className="form-check-label ps-2">Male</label>
                                                        </div>
                                                    </div>
                                                    <div class="input-group">
                                                        <div class="input-group-text" id="btnGroupAddon">
                                                            <input type="radio" class="form-check-input" name="gender" id="female" aria-label="gender" aria-describedby="btnGroupAddon" required />
                                                            <label htmlFor="female" className="form-check-label ps-2">female</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <small className="text-muted text-start">
                                                    By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.
                                                </small>
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" ref={sbtn} className="btn btn-success w-100">
                                                    <span class="spinner-border spinner-border-sm me-3 d-none" ref={sspinner} role="status" aria-hidden="true"></span>
                                                    Sign Up
                                                </button>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
            <Footer />
        </>
    )
}


const Footer = () => {
    return (
        <div className="bg-white">
            <div className="container px-5">
                <div className="row row-cols-1">
                    <div className="col">
                        <ul className="nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">English</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">বাংলা</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">অসমীয়া</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">हिन्दी </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">नेपाली </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Bahasa Indonesia </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">العربية </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">中文(简体) </a>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <div className="col">
                        <ul className="nav">
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Log In</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Messenger</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Facebook Lite </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Watch </a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Places</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Games</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link footer-link">Marketplace</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HomePage
