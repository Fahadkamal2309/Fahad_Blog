import React from "react";

const Logo = () => {
    return (
        <div className="logo-container">
            
            <svg
                className="logo-icon"
                width="50"
                height="50"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Circle Background */}
                <circle cx="32" cy="32" r="30" className="logo-bg" />

                {/* Pen Icon */}
                <path
                    d="M20 44L24 34L42 16C43.5 14.5 46 14.5 47.5 16C49 17.5 49 20 47.5 21.5L29 40L20 44Z"
                    className="logo-pen"
                />
                <path
                    d="M18 46L22 42"
                    className="logo-pen-line"
                />
            </svg>

            <div className="logo-text">
                <h2>FAHAD</h2>
                <p>BLOG</p>
            </div>
        </div>
    );
};

export default Logo;