import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import {
  Drawer, DrawerItems,
  Sidebar as FlowSidebar, SidebarItems,
  SidebarItemGroup, SidebarItem,
} from "flowbite-react";
import getDriveImage from "../getDriveImage";

const Mobile_Sidebar = ({ user, onClose,isOpen }) => {

  return (
    <Drawer open={isOpen} onClose={onClose} position="right" className="p-0 m-0 fixedz h-screen">
      <div className="bg-(--navy) text-(--white) p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <span className="text-white text-xl font-bold">Adopt House</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-700 pr-2 text-3xl font-bold cursor-pointer">&times;</button>
      </div>
      <DrawerItems className="p-0 bg-white">
        <FlowSidebar className="h-full w-80 bg-white rounded-none">
          <div className="bg-yellow-100 rounded-lg mx-4 mt-4 p-4 flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">{user.username}</div>
            </div>
            <img
              src={getDriveImage(user.picture)}
              alt={user.username}
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
            />
          </div>
          <SidebarItems className="mt-6 px-4 flex flex-col gap-4">
            <SidebarItemGroup>
              <SidebarItem as={Link} to="/" onClick={onClose} className="bg-blue-400 hover:bg-blue-400 hover:border-2 rounded-lg p-4 mb-2 flex justify-between items-center font-semibold shadow">
                <div className="flex justify-between items-center">
                  <div>
                    Beranda
                    <div className="text-xs font-normal">Halaman Beranda</div>
                  </div>
                  <span className="text-2xl">&gt;</span>
                </div>
              </SidebarItem>
              <SidebarItem as={Link} to="/findpet" onClick={onClose} className="bg-blue-400 hover:bg-blue-400 hover:border-2 rounded-lg p-4 mb-2 flex justify-between items-center font-semibold shadow">
                <div className="flex justify-between items-center">
                  <div>
                    Temukan Hewan
                    <div className="text-xs font-normal">Halaman Temukan Hewan</div>
                  </div>
                  <span className="text-2xl">&gt;</span>
                </div>
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </FlowSidebar>
      </DrawerItems>
    </Drawer>
  );
};

export default Mobile_Sidebar;