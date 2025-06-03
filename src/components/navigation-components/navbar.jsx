import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import Sidebar from './sidebar';
import Mobile_Sidebar from './mobile_sidebar';
import { FaBars } from 'react-icons/fa6';

const Navbar = () => {
  const token = localStorage.getItem('auth_token');
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (token) {
      fetch(`${apiURL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Admin Navbar
  if (user && user.is_admin) {
    return (
      <>
        <nav className="bg-(--navy) text-(--white) ml-20">
          <ul className="flex justify-between items-center p-(--header-height) lg:flex-row">
            <div className="flex items-center">
              <Link to="/admin/dashboard">
                <span className='text-2xl font-extrabold'>
                  <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
                  Adopt House
                </span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <span className="text-2xl">Hi, Adopt House Admin!</span>
            </div>
          </ul>
        </nav>
        <Sidebar user={user} onClose={() => setShowSidebar(false)} onOpen={() => setShowSidebar(true)} isOpen={showSidebar} />
      </>
    );
  }

  // Mobile Navbar
  if (isMobile) {
    return (
      <>
        <nav className="bg-(--navy) text-(--white)">
          <ul className="flex justify-between items-center p-(--header-height) lg:flex-row">
            <div className="flex items-center">
              <Link to="/">
                <span className='text-2xl font-extrabold'>
                  <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
                  Adopt House
                </span>
              </Link>
            </div>
            <div className="flex space-x-12">
              {token ? (
                <>
                  <li>
                    <button
                      type="button"
                      className={`flex items-center text-2xl cursor-pointer underline-offset-10 ${location.pathname === '/profile' ? 'underline' : ''}`}
                      onClick={() => setShowSidebar(true)}
                    >
                      {user && user.picture && (
                        <img
                          src={user.picture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full mr-2 border object-cover"
                        />
                      )}
                      Profile
                    </button>
                  </li>
                  <li className="flex items-center">
                    <button
                      type="button"
                      className='flex items-center'
                      onClick={() => setShowMobileSidebar(true)}
                    >
                      <FaBars className="text-3xl" />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/register"
                      className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/register' ? 'underline' : ''}`}>
                      Sign Up
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/login' ? 'underline' : ''}`}>
                      Sign In
                    </Link>
                  </li>
                </>
              )}
            </div>
          </ul>
        </nav>
        {user && showSidebar && (
          <Sidebar user={user} onClose={() => setShowSidebar(false)} isOpen={true} />
        )}
        {user && showMobileSidebar && (
          <Mobile_Sidebar user={user} onClose={() => setShowMobileSidebar(false)} isOpen={showMobileSidebar} />
        )}
      </>
    );
  }

  // Desktop Navbar (non-admin)
  return (
    <>
      <nav className="bg-(--navy) text-(--white)">
        <ul className="flex justify-between items-center p-(--header-height) lg:flex-row">
          <div className="flex items-center">
            <Link to="/" className="hover:underline">
              <span className='text-2xl font-extrabold'>
                <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
                Adopt House
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            {token ? (
              <>
                <li>
                  <Link
                    to="/"
                    className={`text-2xl underline-offset-10 ${location.pathname === '/' ? 'underline' : ''}`}>
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/findpet"
                    className={`text-2xl underline-offset-10 ${location.pathname === '/findpet' ? 'underline' : ''}`}>
                    Temukan Hewan
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className={`flex items-center text-2xl cursor-pointer underline-offset-10 ${location.pathname === '/profile' ? 'underline' : ''}`}
                    onClick={() => setShowSidebar(true)}
                  >
                    {user && user.picture && (
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 border object-cover"
                      />
                    )}
                    Profile
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/register"
                    className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/register' ? 'underline' : ''}`}>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/login' ? 'underline' : ''}`}>
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </div>
        </ul>
      </nav>
      {user && showSidebar && (
        <Sidebar user={user} onClose={() => setShowSidebar(false)} isOpen={true} />
      )}
      {user && showMobileSidebar && (
        <Mobile_Sidebar user={user} onClose={() => setShowMobileSidebar(false)} isOpen={showMobileSidebar} />
      )}
    </>
  );
};

export default Navbar;