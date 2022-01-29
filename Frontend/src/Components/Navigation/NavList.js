import React, { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { createAuthContext } from '../../Auth/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiDashboard2Fill } from 'react-icons/ri';
import { BiLogInCircle } from 'react-icons/bi';

const NavList = () => {
  const [cookie] = useCookies();
  let { logout } = useContext(createAuthContext);
  let { pathname } = useLocation();


  const ContactMe = () => {
    document.getElementById('contact-sect').scrollIntoView({ behavior: 'smooth' });
  };
  const AboutMe = () => {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
  };
  const Project = () => {
    document.getElementById('project-sect').scrollIntoView({ behavior: "smooth" });
  };
  const Home = () => {
    document.getElementById('home-sect').scrollIntoView({ behavior: "smooth" });
  };


  return <ul className="navbar-nav">
    {
      cookie.user_data && pathname === '/dashboard' ?
        <li className='mt-1'>
          <Link to="/auth">
            <button onClick={() => logout()} className='logout--button btn'>Logout <FaSignOutAlt /></button>
          </Link>
        </li>
        : <>
          <li className="nav-item">
            <NavLink onClick={Home} activeclassName='menu_active' className="nav--text nav-link" to="/"> Home </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={AboutMe} className="nav--text nav-link" to="/about-section"> About </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={Project} className="nav--text nav-link" to="/project"> Services </NavLink>
          </li>
          <li className="nav-item">
            <NavLink onClick={ContactMe} className="nav--text nav-link" to="/contact"> Contact </NavLink>
          </li>
          <li className='mt-1'>
            <Link to={!cookie.user_data ? '/dashboard' : '/auth'}>
              <button className='signin--button btn'>{!cookie.user_data ? <>  SignIn <BiLogInCircle /> </>
                : <> DashBoard <RiDashboard2Fill fontSize={18} /> </>}</button>
            </Link>
          </li>
        </>
    }
  </ul>
};

export default NavList;