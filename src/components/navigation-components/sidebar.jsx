import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.webp";
import {
  Drawer, DrawerItems,
  Sidebar as FlowSidebar, SidebarItems,
  SidebarItemGroup, SidebarItem,
} from "flowbite-react";
import { FaRegClipboard, FaGrip, FaLinesLeaning , FaArrowRightFromBracket, FaAngleRight  } from "react-icons/fa6";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const Sidebar = ({ user, onClose, onOpen, isOpen }) => {
  const admin = user.is_admin;

  const customTheme = {
    root: {
      "inner": "px-0 ",
      "collapsed": {
        "on": "hidden",
        "off": "block"
      }
    },
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Anda yakin ingin logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("auth_token");
        window.location.href = "/login";
      }
    });
  };

  if (admin && !isOpen) {
    return (
      <div className="fixed top-0 left-0 h-full min-w-16 w-20 bg-white shadow flex flex-col items-center py-4 z-50">
      {/* Expand Button */}
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-center p-4 mb-2 hover:bg-yellow-50 rounded-none cursor-pointer"
        title="Expand Sidebar"
      >
        <FaGrip className="text-5xl" />
      </button>

      <Link
        to="/admin/dashboard"
        className={`w-full flex items-center justify-center p-4 mb-2 hover:bg-yellow-50 rounded-none  ${location.pathname === '/admin/dashboard' ? 'bg-yellow-50 border-blue-400 border-l-15' : ''}`}
      >
        <FaRegClipboard className="text-2xl" />
      </Link>

      <Link
        to="/admin/categories-post"
        className={`w-full flex items-center justify-center p-4 mb-2 hover:bg-yellow-50 rounded-none  ${location.pathname === '/admin/categories-post' ? 'bg-yellow-50 border-blue-400 border-l-15' : ''}`}
      >
        <FaLinesLeaning className="text-2xl" />
      </Link>

      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center p-4 mt-auto hover:text-red-400 rounded"
        title="Logout"
      >
      <FaArrowRightFromBracket className="inline-block text-2xl cursor-pointer" />
      </button>
    </div>

        );
  }

  if (admin && isOpen) {
  return (
    <Drawer open={isOpen} onClose={onClose} backdrop={false} position="right" className="p-0 m-0 bg-gray-50 w-70 h-screen" theme={{customTheme}}>
      <div className="flex flex-col h-full">
      <div className="bg-gray-50 p-4 flex min-h-[10%] h-[15%] items-center justify-center">
        <div className="flex items-center gap-5">
          <FaGrip className="text-5xl" />
          <span className="text-3xl font-bold">MENU</span>
        </div>
      </div>

      <DrawerItems className="p-0 m-0 px-0 bg-gray-50 h-[85%] flex flex-col ">
        <FlowSidebar theme={customTheme} className="p-0 mx-0 h-full w-70 bg-gray-50 rounded-none flex flex-col flex-grow">
          <SidebarItems className="px-0 mx-0 flex flex-col gap-2 bg-gray-50">
            <SidebarItemGroup className="p-0 mx-0 px-0 bg-gray-50">
              <SidebarItem
                as={Link}
                to="/admin/dashboard"
                onClick={onClose}
                className={`hover:bg-yellow-50 hover:border-blue-400 hover:border-l-15 pb-0 font-semibold rounded-none p-0 m-0 ${location.pathname === '/admin/dashboard' ? 'bg-yellow-50 border-blue-400 border-l-15' : ''}`}
              >
                <div className="flex items-center gap-4 py-4 px-0">
                  <FaRegClipboard className="text-2xl" />
                  <span className="text-xl">Dashboard</span>
                </div>
              </SidebarItem>

              <SidebarItem
                as={Link}
                to="/admin/categories-post"
                onClick={onClose}
                className={`hover:bg-yellow-50 hover:border-blue-400 hover:border-l-15 font-semibold rounded-none p-0 m-0 ${location.pathname === '/admin/categories-post' ? 'bg-yellow-50 border-blue-400 border-l-15' : ''}`}
              >
              <div className="flex items-center gap-4 py-4 px-0">
                <FaLinesLeaning className="text-2xl" />
                <span className="text-xl">Kategori</span>
              </div>
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </FlowSidebar>
           <div className="p-4 mt-auto bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full text-2xl font-semibold cursor-pointer hover:text-red-500"
            >
              <FaArrowRightFromBracket className="inline-block mr-2" />
              <span className="text-2xl">Logout</span> 
            </button>
          </div>
      </DrawerItems>
      </div>
    </Drawer>
  );
}


  // --- USER DRAWER ---
  return (
          <Drawer open={isOpen} onClose={onClose} position="right" className="p-0 m-0 h-full w-full sm:w-fit">
            <div className="bg-(--navy) text-(--white) p-4 flex items-center justify-between">
              <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-12 w-12" />
                <span className="text-white text-xl font-bold">Adopt House</span>
              </motion.div>
              <motion.button initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} onClick={onClose} className="text-white hover:text-gray-700 text-3xl font-bold cursor-pointer">&times;</motion.button>
            </div>
            <DrawerItems className="p-0 bg-white justify-items-center">
              <FlowSidebar className="h-full w-80 bg-white rounded-none">
                <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="bg-yellow-100 rounded-lg mx-4 mt-4 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{user.username}</div>
                  </div>
                  <img
                    src={user.picture}
                    alt={user.username}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover"
                  />
                </motion.div>
                <SidebarItems className="mt-6 px-4 flex flex-col gap-4">
                  <SidebarItemGroup>
                    <SidebarItem as={Link} to="/profile" onClick={onClose} className="bg-blue-400 hover:bg-blue-400 hover:border-2 rounded-lg p-4 mb-2 flex justify-between items-center font-semibold shadow">
                      <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex justify-between items-center">
                        <div>
                          Profil Saya
                          <div className="text-xs font-normal">Lihat Profil Anda</div>
                        </div>
                        <span className="text-2xl"><FaAngleRight /></span>
                      </motion.div>
                    </SidebarItem>
                    <SidebarItem as={Link} to="/favorites" onClick={onClose} className="bg-blue-400 hover:bg-blue-400 hover:border-2 rounded-lg p-4 mb-2 flex justify-between items-center font-semibold shadow">
                      <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex justify-between items-center">
                        <div>
                          Favorit Saya
                          <div className="text-xs font-normal">Lihat Hewan Yang Anda Sukai</div>
                        </div>
                        <span className="text-2xl"><FaAngleRight /></span>
                      </motion.div>
                    </SidebarItem>
                    <SidebarItem as={Link} to="/post" onClick={onClose} className="bg-white hover:border-2 rounded-lg p-4 mb-2 flex justify-between items-center font-semibold shadow">
                      <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex justify-between items-center">
                        <div className="text-black">
                          Buat Postingan Baru
                          <div className="text-xs font-normal text-gray-500">Postingan Hewan Anda</div>
                        </div>
                        <span className="text-2xl"><FaAngleRight /></span>
                      </motion.div>
                    </SidebarItem>
                    <SidebarItem as={Link} to="/my-posts" onClick={onClose} className="bg-white hover:border-2 rounded-lg p-4 mb-2 flex justify-between items-center font-semibold shadow">
                      <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex justify-between items-center">
                        <div className="text-black">
                          Postingan Saya
                          <div className="text-xs font-normal text-gray-500">Lihat Semua Postingan Anda</div>
                        </div>
                        <span className="text-2xl"><FaAngleRight /></span>
                      </motion.div>
                    </SidebarItem>
                  </SidebarItemGroup>
                </SidebarItems>
                <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="px-4 pb-6 mt-auto">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:border-2 font-semibold rounded-lg py-3 shadow cursor-pointer"
                  >
                    Logout
                  </button>
                </motion.div>
              </FlowSidebar>
            </DrawerItems>
          </Drawer>
  );
};

export default Sidebar;
