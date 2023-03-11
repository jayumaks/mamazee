import React from 'react'
import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-left">
                <h4>About us</h4>
                <p>Pre Order runs the world, Get your wears, clothings, bags and accessories at affordable and friendly price. What you see is what you get.</p>
                <p className="copyright">
                    copyright &copy; {new Date().getFullYear()} Ush stitches
                </p>
            </div>

            <div className="footer-middle">
                <h4>Newsletter</h4>
                <p>Stay Updated</p>
                <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
                    <div className="col pl-0">
                        <div className="input-group pr-5">
                            <input type="text" id="inlineFormInputGroupUsername2" placeholder="Email" />
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="footer-right">
                <h4>Follow Us</h4>
                <p>Let us be social</p>
                <div className="icons">
                    <FaWhatsapp />
                    <FaInstagram />
                    <FaFacebook />
                    <FaTwitter />
                </div>
                <small>copyright jayumaks</small>
            </div>
        </div>

    )
}

export default Footer