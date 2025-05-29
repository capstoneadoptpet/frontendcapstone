import { useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin  } from "react-icons/fa6";

const Footer = () => {
  const location = useLocation();
  const authFooter = location.pathname === '/login' || location.pathname === '/register';

  if (!authFooter) return (
    <footer className="bg-white text-black py-16 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div>
          <div className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-16 w-16 mr-2" />
            <span className="text-xl font-bold">Adopt House</span>
          </div>
          <div className="flex space-x-4 mb-4">
            <a href="#" aria-label="X">
             <FaXTwitter className="text-[32px]"/>
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram className="text-[32px]"/>
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className="text-[32px]"/>
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin className="text-[32px]"/>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 flex-1">
          <div>
            <h3 className="font-semibold mb-2">Halaman</h3>
            <ul className="space-y-1">
              <li><a href="/" className="hover:border-b-2">Beranda</a></li>
              <li><a href="/findpet" className="hover:border-b-2">Temukan Hewan</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Pengguna</h3>
            <ul className="space-y-1">
              <li><a href="/profile" className="hover:border-b-2">Profil</a></li>
              <li><a href="/favorites" className="hover:border-b-2">Favotite Hewan</a></li>
              <li><a href="/my-posts" className="hover:border-b-2">Postingan</a></li>
              <li><a href="/post" className="hover:border-b-2">Membuat Postingan</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Lainnya</h3>
            <ul className="space-y-1">
              <li><a href="/terms-policy" className="hover:border-b-2">Syarat &amp; Kebijakan</a></li>
              <li><a href="/animals" className="hover:border-b-2">Hewan</a></li>
              <li><a href="/about-us" className="hover:border-b-2">Tentang Kami</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <footer className="bg-white text-(--black)">
      <div className="border-t-2 mx-10"></div>
      <div className="flex justify-between items-center px-10 py-20 ">
        <div className="flex items-center">
          <span className="text-2xl font-bold flex items-center">
            <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
            Adopt House
          </span>
        </div>
        <div>
          <p className="text-sm">@2025 adopthouse.com All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;