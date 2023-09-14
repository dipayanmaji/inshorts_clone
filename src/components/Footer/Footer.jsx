import React from "react";
import './Footer.scss';
import logo from '../../utilities/images/inshorts-logo-white.png';
import contact from '../../utilities/images/contact-us.png';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer">
                <div className="left-part">
                    <div className="container">
                        <img src={logo} alt="Inshorts Clone" />

                        <div className="copyright">
                            <b>Inshorts Clone</b>
                            <br />
                            ©COPYRIGHT 2023
                        </div>
                    </div>

                    <span className="divider"></span>

                    <div className="container">
                        <a href="mailto:dipayanmaji1112@gmail.com"><img src={contact} alt="Contact Us" /></a>

                        <div className="terms-condition">
                            <a href="https://inshorts.com/tnc" target="_blank">Terms & conditions</a>
                            <a href="https://inshorts.com/tnc" target="_blank">Privacy Policies</a>
                        </div>
                    </div>
                </div>

                <div className="right-part">
                    <a href="https://www.facebook.com/dip.ayan.716" target="_blank"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://twitter.com/dipayanmaji11" target="_blank"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="https://www.linkedin.com/in/dipayanmaji/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;