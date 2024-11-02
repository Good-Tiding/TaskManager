import React from "react";
import '../CSS/Footer.css';

const socialLinks = [
    { url: "https://github.com/Good-Tiding", iconClass: "fab fa-github" },
    { url: "https://www.linkedin.com/in/bushra-assadi/", iconClass: "fab fa-linkedin" },
];

const copyright = "© 2024 Task Manager";

const Footer = () => {
    return (
        <footer className="footer bg-dark text-white d-flex justify-content-between align-items-center py-3 px-4">
            <div className="social-links">
                {socialLinks.map((link, index) => (
                    <a key={index} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="mx-2"
                      aria-label={`Link to ${link.url}`}>
                        <i className={link.iconClass}></i>
                    </a>
                ))}
            </div>
            <div className="copyright text-end">
                <p className="mb-0">{copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
