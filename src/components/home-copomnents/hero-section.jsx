import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBG from '../../assets/img/HeroBG.webp';
import IcTermsPolicy from '../../assets/img/TermsPolicy.png';
import AboutUs from '../../assets/img/aboutUs.png';
import animals from '../../assets/img/animals.png';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            duration: 1.2
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const HeroSection = () => {
    return (
        <div className="section-Hero bg-(--grey) h-[15vh] sm:h-screen w-full">
            <img src={HeroBG} alt="Hero Background" className='w-full' />
            <div className="flex items-center justify-center max-sm:h-5 md:h-10 w-full my-10 bg-(--blue-sky)">
                <motion.div
                    className="cards_page flex flex-row sm:flex-row justify-center items-center gap-2 sm:gap-4 px-4 sm:px-7 m-0 sm:m-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants}>
                        <Link to="/terms-policy" className="card_terms-policy rounded-xl h-20 w-20 sm:h-56 sm:w-56 grid grid-rows-2 gap-2 justify-items-center p-2 bg-(--white) border-0 border-(--white) transition hover:-translate-y-1 hover:border-(--blue-sky) hover:border-3 motion-reduce:transition-none motion-reduce:hover:transform-none ease-in-out" >
                            <img src={IcTermsPolicy} alt="Icon Terms&Policy" className=' w-10 h-10 sm:w-40 sm:h-40 p-2' />
                            <p className="text-(--black) text-xs sm:text-xl font-regular text-center flex items-center-safe">Syarat & Kebijakan</p>
                        </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Link to="/animals" className="card_terms-policy rounded-xl h-20 w-20 sm:h-56 sm:w-56 grid grid-rows-2 gap-2 justify-items-center p-2 bg-(--white) border-0 border-(--white) transition hover:-translate-y-1 hover:border-(--blue-sky) hover:border-3 motion-reduce:transition-none motion-reduce:hover:transform-none ease-in-out" >
                            <img src={animals} alt="Icon Animals" className=' w-10 h-10 sm:w-40 sm:h-40 p-2' />
                            <p className="text-(--black) text-xs sm:text-xl font-regular text-center flex items-center-safe ">Hewan Peliharaan</p>
                        </Link>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Link to="/about-us" className="card_terms-policy rounded-xl h-20 w-20 sm:h-56 sm:w-56 grid grid-rows-2 gap-2 justify-items-center p-2 bg-(--white) border-0 border-(--white) transition hover:-translate-y-1 hover:border-(--blue-sky) hover:border-3 motion-reduce:transition-none motion-reduce:hover:transform-none ease-in-out" >
                            <img src={AboutUs} alt="Icon About Us" className=' w-10 h-10 sm:w-40 sm:h-40 p-2' />
                            <p className="text-(--black) text-xs sm:text-xl font-regular text-center flex items-center-safe ">Tentang Kami</p>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}


export default HeroSection;
