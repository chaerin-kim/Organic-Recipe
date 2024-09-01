import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserAllInto } from '../store/userStore';
import { url } from '../store/ref';
import '../styles/Header.scss';
import signInIcon from '../assets/icons/SingIn.svg';
import logo from '../assets/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); 
  const userID = user ? user.userID : null;

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${url}/profile`, {
          credentials: 'include',
        });
        if (response.ok) {
          const userInfo = await response.json();
          dispatch(setUserAllInto(userInfo));
        } else {
          console.error('Failed to fetch profile:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    if (!userID) {
      fetchProfile();
    }
  }, [dispatch, userID]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        dispatch(setUserAllInto(null));
        closeMenu();
      } else {
        console.error('Failed to logout:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <header>
      <nav>
        <h1>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </h1>

        <button className="ham" onClick={toggleMenu}>
          <i className="fa-solid fa-bars" />
        </button>

        <ul className={menuOpen ? 'open' : 'mw'}>
          <div className="menu">
            <li onClick={closeMenu}>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li onClick={closeMenu}>
              <Link to="/create">Share your recipe</Link>
            </li>
          </div>

          {userID ? (
            <div className="afterLogin">
              
              <li onClick={closeMenu}>
                <Link to="/mypage">{userID}님 입장</Link>
              </li>
              <li onClick={logout}>
                Logout
              </li>
            </div>
          ) : (
            <li className="signIn" onClick={closeMenu}>
              <img src={signInIcon} alt="Sign In" />
              <Link to="/login">Sign in</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default React.memo(Header);
