import React from "react";
import { NavLink } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div>
      <header className="body-header">
        <div className="logo-box"></div>

        <div className="text-box">
          <div className="heading-primary">
            <h1>
              <span className="heading-primary-main"> #KSUP</span>
              <span className="heading-primary-sub">Kurd Squad</span>
            </h1>
            <a href="#" className="btn btn-white btn-animated">
              Teams
            </a>
          </div>
        </div>
      </header>

      <div className="teamPart teamPart-text-box" id='teamPart'>
        <div>
          <h1>
            <span className="teamPart-primary-main"> MEET OUR ARMY </span>
            <span className="teamPart-primary-sub fir">
              {" "}
              2 <br /> <span className="firr"> TEAM </span>{" "}
            </span>
            <span className="teamPart-primary-sub sec">
              10 <br /> <span className="firr"> PLAYER </span>{" "}
            </span>

            <NavLink to="/player" className="btn btn-red showTeam-btn">
              Show Team{" "}
            </NavLink>
          </h1>
        </div>
      </div>
      <section id='shop'>
      <div className="shop-container shop-text-box">
        <div className="shopRight"></div>
        <div className="shopLeft"></div>
        <h1>
          <NavLink to="/shop" className="btn btn-blue ">
            {" "}
            Buy Now{" "}
          </NavLink>
        </h1>
      </div>
      </section>
    </div>
  );
};
export default DashboardPage;
