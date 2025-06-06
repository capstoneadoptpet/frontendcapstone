import { useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin  } from "react-icons/fa6";
import { motion } from "motion/react"

const Footer = () => {
  const location = useLocation();
  const authFooter = location.pathname === '/login' || location.pathname === '/register';

  if (!authFooter) return (
    <footer className="bg-white text-black py-16 px-10 overflow-x-hidden w-full">
      <div className="mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div>
          <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex items-center mb-6">
            <img src={logo} alt="Logo" className="h-16 w-16 mr-2" />
            <span className="text-xl font-bold">Adopt House</span>
          </motion.div>
          <motion.div className="sosmed flex space-x-4 mb-4" variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              }
            }
          }} initial="hidden" animate="visible">
            <motion.a href="#" aria-label="X" variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}>
             <FaXTwitter className="text-[32px]"/>
            </motion.a>
            <motion.a href="#" aria-label="Instagram" variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}>
              <FaInstagram className="text-[32px]"/>
            </motion.a>
            <motion.a href="#" aria-label="YouTube" variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}>
              <FaYoutube className="text-[32px]"/>
            </motion.a>
            <motion.a href="#" aria-label="LinkedIn" variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 }
            }}>
              <FaLinkedin className="text-[32px]"/>
            </motion.a>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 flex-1">
          <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }}>
            <h3 className="font-semibold mb-2">Halaman</h3>
            <motion.ul className="space-y-1" variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 1.2
                }
              }
            }} initial="hidden" animate="visible">
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/" className="hover:border-b-2">Beranda</a></motion.li>
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/findpet" className="hover:border-b-2">Temukan Hewan</a></motion.li>
            </motion.ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }}>
            <h3 className="font-semibold mb-2">Pengguna</h3>
            <motion.ul className="space-y-1" variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 1.2
                }
              }
            }} initial="hidden" animate="visible">
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/profile" className="hover:border-b-2">Profil</a></motion.li>
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/favorites" className="hover:border-b-2">Favotite Hewan</a></motion.li>
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/my-posts" className="hover:border-b-2">Postingan</a></motion.li>
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/post" className="hover:border-b-2">Membuat Postingan</a></motion.li>
            </motion.ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }}>
            <h3 className="font-semibold mb-2">Lainnya</h3>
            <motion.ul className="space-y-1" variants={{
              hidden: { opacity: 1 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 1.2
                }
              }
            }} initial="hidden" animate="visible">
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/terms-policy" className="hover:border-b-2">Syarat &amp; Kebijakan</a></motion.li>
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/animals" className="hover:border-b-2">Hewan</a></motion.li>
              <motion.li variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}><a href="/about-us" className="hover:border-b-2">Tentang Kami</a></motion.li>
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </footer>
  );

  return (
    <footer className="bg-white text-(--black) overflow-x-hidden w-full">
      <div className="border-t-2 mx-10"></div>
      <div className="flex flex-col md:flex-row md:gap-10 justify-between px-10 py-20 ">
        <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex items-center">
          <span className="text-2xl font-bold flex items-center">
            <img src={logo} alt="Logo" className="h-24 w-24 inline-block mr-2" />
            Adopt House
          </span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -50}} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 100, damping:25, delay:0.3, duration: 1.2 }} className="flex items-center space-x-4">
          <p className="text-sm">@2025 adopthouse.com All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;