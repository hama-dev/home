import React from "react";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="span-1-of-3 col">
        <div className="footer-about">
          <h1> About Us </h1>
          <p>
            Scanfcode focuses on providing the most efficient code or snippets ks
            as the code wants to be simple. We will help programmers build up
            concepts in different programming languages that include C, C++,
            Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and
            Algorithm.{" "}
          </p>
        </div>
      </div>
      <div className="span-1-of-3 col">
        <div className="footer-ul">
          <ul>
            <NavLink to="/">
              <li> Home </li>
            </NavLink>
            <NavLink to="/player">
              <li> Player </li>
            </NavLink>
            <NavLink to="/shop">
              <li> Shop </li>
            </NavLink>
            <a href="https://discordapp.com/invite/U68DaQF">
              <li> Discord </li>
            </a>
          </ul>
        </div>
      </div>

      <div className="span-1-of-3 col">
        <div className="footer-social">
        
          <a className="footer-social-fb" target='new' href="https://www.facebook.com/kurdsquads/">
            <ion-icon name="logo-facebook"></ion-icon>
          </a>

          <a className="footer-social-insta" href="#">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>

          <a  className="footer-social-yt" href="#">
            <ion-icon name="logo-youtube"></ion-icon>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
