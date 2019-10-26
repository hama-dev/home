import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Logout from "./Logout";
//create a component
// in the component we Use Link amash way le aka ka reaload nakat
// to="" la jyary href="" bakar ahein
// exact bo away ka pewysta link aka rek wak to="" bet boy run bet
// NavLink har Link a balam la NavLink a ema activeClassName haya ka way le aka style y bkain

const Header = props => {
  return (
    <header >
      <div className="header">
      <div className='btn-nav-res'>
        <div className='more-btn-nav' onClick={headerNav}><ion-icon id='moreIcon' name="more"></ion-icon></div>
      </div>
        <div onClick={rmNav}>
          <NavLink to='/'>
            <img 
              src="https://web.getmonero.org/press-kit/symbols/monero-symbol-800.png"
              alt="Dragon Logo"
              className="header-logo"
            />
            </NavLink>
        </div>
        <div onClick={rmNav} id='header' className='header-group-ul-and-auth'>
        <div className="header-group">
          <ul className='header-group-ul'>
            <li>
              {" "}
              <NavLink className="header-tab" to="/" exact>
                {" "}
                HOME{" "}
              </NavLink>{" "}
            </li>
            <li>
              {" "}
              <NavLink className="header-tab" to="/player">
                {" "}
                PLAYER{" "}
              </NavLink>{" "}
            </li>
            <li>
              <NavLink className="header-tab" to="/shop">
                SHOP
              </NavLink>
            </li>
            <li>
              <a className="header-tab" href="https://discord.gg/U68DaQF ">
                DISCORD
              </a>
            </li>
          </ul>
        </div>

        {props.isAuth && (
          <div className='profile1'>
            <div className="authHeader">
              <div className="logout-profile-btn">
              <ul className="">
                <li>
                  <NavLink className="profile-btn-a" to={`/user/${props.authUid}`}>
                  <img
                  className="profile-btn"
                  src="https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png"
                />
                  </NavLink>
                </li>
                <li>
                <span className="logout-btn">
                  <Logout />
                </span>
                </li>
                
                </ul>
              </div>
            </div>
          </div>
        )}
        {props.isAdmin && (
          <div className='profile2'>
            <div className="">
              <div className="header-group">
              <ul className='header-group-ul'>
                <li>
                  <NavLink className="profile-btn-b header-tab" to={`/admin`}>
                    <img
                      className="profile-btn"
                      src="https://cdn4.iconfinder.com/data/icons/web-ui-color/128/Settings-512.png"
                    />
                  </NavLink>
                </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {props.isAuth || (
          <div className='login-signup-js'>
            <div className="authHeader">
              <div className="login-singub-btn">
                <ul  className="login-singub-ul">
                  <li >
                    <NavLink to="/login" className="login-btn">
                      {" "}
                      Login{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register" className="singUp-btn">
                      {" "}
                      SingUp{" "}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
};


function reportWindowSize() {
  const loginSignupJs=document.querySelector('.login-signup-js');

  if(innerWidth>=768){
    if(document.querySelector('.login-signup-js')){
      document.getElementById('header').className='header-group-ul-and-auth';
          loginSignupJs.children[0].className='authHeader';
          loginSignupJs.children[0].children[0].className='login-singub-btn';
          loginSignupJs.children[0].children[0].children[0].className='login-singub-ul';
          loginSignupJs.children[0].children[0].children[0].children[0].children[0].className='login-btn';
          loginSignupJs.children[0].children[0].children[0].children[1].children[0].className='singUp-btn';
    }
    const profile1=document.querySelector('.profile1')
    if(profile1){
      document.getElementById('header').className='header-group-ul-and-auth';
      profile1.children[0].className='authHeader';
      profile1.children[0].children[0].className='logout-profile-btn';
      profile1.children[0].children[0].children[0].classList=('');
      profile1.children[0].children[0].children[0].children[0].children[0].classList=('profile-btn-a');
    profile1.children[0].children[0].children[0].children[0].children[0].innerHTML=`<img
    class="profile-btn"
    src="https://cdn0.iconfinder.com/data/icons/user-collection-4/512/user-512.png"
  />`;
  profile1.children[0].children[0].children[0].children[1].children[0].className='logout-btn';
    }
    document.querySelector('.header').classList.remove('newHeader');
    document.querySelector('#moreIcon').setAttribute('name','more')
  }
}

window.onresize = reportWindowSize;
window.addEventListener('resize', reportWindowSize);

const headerNav=()=>{
  const a=document.getElementById('header');
  const icon=document.querySelector('#moreIcon');
  const loginSignupJs=document.querySelector('.login-signup-js');
  const profile1=document.querySelector('.profile1');

  if(a.classList.contains('header-ul-res')){
    icon.setAttribute('name','more')
    a.classList.remove('header-ul-res');
    document.querySelector('.header').classList.remove('newHeader');
  }else{
    icon.setAttribute('name','close')
    a.classList.add('header-ul-res');
    document.querySelector('.header').classList.add('newHeader');

    /////loginSignupJs
    if(loginSignupJs){
      loginSignupJs.children[0].className='';
      loginSignupJs.children[0].children[0].classList='header-group';
      loginSignupJs.children[0].children[0].children[0].classList='header-group-ul';
      loginSignupJs.children[0].children[0].children[0].children[0].children[0].classList='header-tab';
      loginSignupJs.children[0].children[0].children[0].children[1].children[0].classList='header-tab';
    }
    ///////////profile1
    if(profile1){
      profile1.children[0].className='';
      profile1.children[0].children[0].classList=('header-group');
      profile1.children[0].children[0].children[0].classList.add('header-group-ul');
      profile1.children[0].children[0].children[0].children[0].children[0].classList.add('header-tab');
      profile1.children[0].children[0].children[0].children[0].children[0].innerHTML='View Profile';
      profile1.children[0].children[0].children[0].children[1].children[0].classList.add('header-tab');
    }
  }
}
const rmNav=()=>{
  if(document.getElementById('header').classList.contains('header-ul-res')){
      document.getElementById('header').classList.remove('header-ul-res');
      document.querySelector('.header').classList.remove('newHeader');
      document.querySelector('#moreIcon').setAttribute('name','more')
  }
}

const mapStateToProps = state => ({
  isAuth: !!state.auth.uid,
  authUid: state.auth.uid,
  isAdmin: !!state.auth.adminProperty
});

const connectToRedux = connect(mapStateToProps)(Header);

export default connectToRedux;