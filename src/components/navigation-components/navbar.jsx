import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.webp';
import Sidebar from './sidebar';
import Mobile_Sidebar from './mobile_sidebar';
import { FaBars  } from 'react-icons/fa6';
import { motion } from "motion/react"

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
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (user && user.is_admin){
    return (
      <>      
      <nav className="bg-(--navy)  text-(--white) ml-20">
        <ul className="flex justify-between items-center p-(--header-height) lg:flex-row">
          <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex items-center">
            <Link to="/admin/dashboard">
              <span className='text-2xl font-extrabold'>
                <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
                Adopt House
              </span>
            </Link>
          </motion.div>
            <div className="flex space-x-4">
              <span className="text-2xl">Hi, Adopt House Admin!</span>
            </div>
            </ul>
          </nav>
          {user && user.is_admin && (
        <Sidebar user={user} onClose={() => setShowSidebar(false)} onOpen={() => setShowSidebar(true)}  isOpen={showSidebar} />      
      )}
      </>
    )
  }

  else {
  if (isMobile) {
    return (
      <>
        <nav className="bg-(--navy)  text-(--white) w-full">
          {token ? (
            <ul className="flex justify-between items-center py-(--header-height) px-5 lg:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3, duration: 1.2 }}
                className="flex items-center"
              >
                <Link to="/">
                  <span className="text-l font-extrabold">
                    <img src={logo} alt="Logo" className="h-16 w-16 inline-block mr-2" />
                    Adopt House
                  </span>
                </Link>
              </motion.div>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="flex space-x-12 list-none p-0 m-0"
              >
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center"
                >
                  <button
                    type="button"
                    className={`flex items-center text-2xl cursor-pointer underline-offset-10 ${location.pathname === '/profile' ? 'underline' : ''}`}
                    onClick={() => {
                      setShowSidebar(true);
                    }}
                  >
                    {user && user.picture && (
                      <motion.img
                        src={user.picture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full mr-2 border object-cover"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    Profile
                  </button>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex items-center"
                >
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={() => setShowMobileSidebar(true)}
                  >
                    <FaBars className="text-3xl" />
                  </button>
                </motion.li>
              </motion.ul>
            </ul>
          ) : (
            <>
              <ul className="flex justify-between items-center p-(--header-height) px-5 lg:flex-row">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3, duration: 1.2 }}
                  className="flex items-center"
                >
                  <Link>
                    <span className="text-l font-extrabold">
                      <img src={logo} alt="Logo" className="h-16 w-16 inline-block mr-2" />
                      Adopt House
                    </span>
                  </Link>
                </motion.div>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="flex space-x-4 list-none p-0 m-0"
              >
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to="/register"
                    className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/register' ? 'underline' : ''}`}
                  >
                    Daftar
                  </Link>
                </motion.li>
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    to="/login"
                    className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/login' ? 'underline' : ''}`}
                  >
                    Masuk
                  </Link>
                </motion.li>
              </motion.ul>
              </ul>
            </>
          )}
        </nav>
        {user && showSidebar && (
          <Sidebar user={user} onClose={() => setShowSidebar(false)} isOpen={true} />
        )}
        {user && showMobileSidebar && (
          <Mobile_Sidebar user={user} onClose={() => setShowMobileSidebar(false)} isOpen={showMobileSidebar} />
        )}
      </>
    )
  } else {
      return (
        <>
          <nav className="bg-(--navy)  text-(--white)">
            <ul className="flex justify-between items-center p-(--header-height) lg:flex-row">
              <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex items-center">
                <Link to="/">
                  <span className='text-2xl font-extrabold'>
                    <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
                    Adopt House
                  </span>
                </Link>
              </motion.div>
              {token ? (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                  className="flex space-x-4 list-none p-0 m-0"
                >
                  {[
                    {
                      to: "/",
                      label: "Beranda",
                      isButton: false,
                    },
                    {
                      to: "/findpet",
                      label: "Temukan Hewan",
                      isButton: false,
                    },
                    {
                      to: "/profile",
                      label: "Profile",
                      isButton: true,
                      imgSrc: user?.picture,
                    },
                  ].map((item, index) => (
                    <motion.li
                      key={item.to}
                      variants={{
                        hidden: { opacity: 0, y: -20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="list-none"
                    >
                      {item.isButton ? (
                        <button
                          type="button"
                          className={`flex items-center text-2xl cursor-pointer underline-offset-10 ${
                            location.pathname === item.to ? "underline" : ""
                          }`}
                          onClick={() => setShowSidebar(true)}
                        >
                          {item.imgSrc && (
                            <img
                              src={item.imgSrc}
                              alt="Profile"
                              className="w-8 h-8 rounded-full mr-2 border object-cover"
                            />
                          )}
                          {item.label}
                        </button>
                      ) : (
                        <Link
                          to={item.to}
                          className={`text-2xl hover:underline underline-offset-10 ${
                            location.pathname === item.to ? "underline" : ""
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.2,
                      },
                    },
                  }}
                  className="flex space-x-4 list-none p-0 m-0"
                >
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      to="/register"
                      className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/register' ? 'underline' : ''}`}
                    >
                      Daftar
                    </Link>
                  </motion.li>
                  <motion.li
                    variants={{
                      hidden: { opacity: 0, y: -20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link
                      to="/login"
                      className={`text-2xl hover:underline underline-offset-10 ${location.pathname === '/login' ? 'underline' : ''}`}
                    >
                      Masuk
                    </Link>
                  </motion.li>
                </motion.ul>
              )}
            </ul>
          </nav>
          {user && showSidebar && (
            <Sidebar user={user} onClose={() => setShowSidebar(false)} isOpen={true} />
          )}
        </>
      );
    }
  }
};

export default Navbar;
