// Node modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Constants
import logo from "../assets/images/logo.png";
import navImage from "../assets/images/navImage.jpg";

// Actions
import { user } from "../actions/index";

// Components
class Header extends Component {
  render() {
    const {isSignedIn, username, avatar} = this.props.user;
    const {cookies, dispatch} = this.props;
    return(
      <header className="header-wrapper">
        <UserNav 
          signedIn={isSignedIn} 
          username={username} 
          avatar={avatar} 
          cookies={cookies}
          dispatch={dispatch}
        />
          <Logo />
          <NavMenu />
      </header>
    );
  }
}

class UserNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.signout = this.signout.bind(this);
  }

  signout() {
    const {cookies, dispatch} = this.props;
    cookies.remove('user',{path: '/'});
    dispatch(user({isSignedIn: false}));
  }

  render() {
    const {signedIn, username, avatar} = this.props;
    if(signedIn){
      return (
        <nav className="user-nav-wrapper">
          <div className="user-avatar">
            <Link to={`/users/${username}`}>
              <img src={avatar} alt={`${username}-avatar`}/>
            </Link>
          </div>
          <div className="signout-button" onClick={this.signout}>
            <span>خروج</span>
          </div>
        </nav>
      );
    } else {
      return(
        <nav className="user-nav-wrapper">
          <div className="register-button">
            <Link to="/users/register">ثبت‌نام</Link>
          </div>
          <div className="signin-button">
            <Link to="/users/signin">ورود</Link>
          </div>
        </nav>
      );
    }
  }
}

UserNav.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  avatar: PropTypes.string,
  cookies: PropTypes.object.isRequired
};

function Logo() {
  return(
    <div className="logo-wrapper">
      <Link to="/search">
        <img src={logo} alt="Red Tent Logo"/>
      </Link>
    </div>
  );
}

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
    this.open = this.open.bind(this);
  }

  open() {
    const {isOpen} = this.state;
    this.setState({isOpen: !isOpen});
  }

  render() {
    const {isOpen} = this.state;
    const rightCrossBarStyle = {
      position: isOpen ? 'absolute' : 'initial',
      transform: isOpen ? 'rotate(-45deg)' : 'rotate(180deg)',
      bottom: '50%'
    }
    const leftCrossBarStyle = {
      position: isOpen ? 'absolute' : 'initial',
      transform: isOpen ? 'rotate(45deg)' : 'rotate(180deg)',
      bottom: '50%'
    }
    const straightBarStyle = {
      display: isOpen ? 'none' : 'inline-block'
    }
    const panelStyle = {
      top: 50,
      height: `calc(100vh - 80px)` ,
      width: isOpen ? '100vw' : 0
    }
    return(
      <div className="navigation-wrapper">
        <div className="icon-wrapper" onClick={this.open}>
          <div className="bar-icon" style={rightCrossBarStyle}/>          
          <div className="bar-icon" style={straightBarStyle}/>          
          <div className="bar-icon" style={leftCrossBarStyle}/>
        </div>
        <div 
          className="panel-wrapper"
          style={panelStyle}  
        >
          <img src={navImage} alt="Red Tent"/>
          <div className="nav-link-container">
            <div className="about-us">
              <p>وقتی شک دارید، قرمز بپوشید.</p>
              <p style={{textAlign: "ltr"}}>بیل بلاس</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Header);
