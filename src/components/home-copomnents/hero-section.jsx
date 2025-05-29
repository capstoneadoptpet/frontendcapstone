import { Link } from 'react-router-dom';
import HeroBG from '../../assets/img/HeroBG.png';
import IcTermsPolicy from '../../assets/img/TermsPolicy.png';
import AboutUs from '../../assets/img/aboutUs.png';
import animals from '../../assets/img/animals.png';

const HeroSection = () => {
    return (
        <div className="section-Hero bg-(--grey) h-1vh w-[100%]">
            <img src={HeroBG} alt="Hero Background" className='w-[100%]' />
            <div className="flex items-center justify-center sm:h-5 md:h-6 w-full my-10 bg-(--blue-sky) z-10">
                <div className="cards_page grid grid-cols-3 gap-4 px-5 md:px-7 -m-[8rem] md:-m-[2rem] lg:m-1 z-8">
                    <Link to="/terms-policy" className="card_terms-policy rounded-xl h-[7rem] w-[7rem] md:h-[14rem] md:w-[14rem] grid grid-rows-2 gap-2 justify-items-center p-2 bg-(--white) border-0 border-(--white) transition hover:-translate-y-1 hover:border-(--blue-sky) hover:border-3 motion-reduce:transition-none motion-reduce:hover:transform-none ease-in-out" >
                        <img src={IcTermsPolicy} alt="Icon Terms&Policy" className=' w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] p-[10px]' />
                        <p className="text-(--black) text-sm md:text-xl font-regular text-center flex items-center-safe">Syarat & Kebijakan</p>
                    </Link>
                    <Link to="/animals" className="card_terms-policy rounded-xl h-[7rem] w-[7rem] md:h-[14rem] md:w-[14rem] grid grid-rows-2 gap-2 justify-items-center p-2 bg-(--white) border-0 border-(--white) transition hover:-translate-y-1 hover:border-(--blue-sky) hover:border-3 motion-reduce:transition-none motion-reduce:hover:transform-none ease-in-out" >
                        <img src={animals} alt="Icon Animals" className=' w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] p-[10px]' />
                        <p className="text-(--black) text-sm md:text-xl font-regular text-center flex items-center-safe ">Hewan Peliharaan</p>
                    </Link>
                    <Link to="/about-us" className="card_terms-policy rounded-xl h-[7rem] w-[7rem] md:h-[14rem] md:w-[14rem] grid grid-rows-2 gap-2 justify-items-center p-2 bg-(--white) border-0 border-(--white) transition hover:-translate-y-1 hover:border-(--blue-sky) hover:border-3 motion-reduce:transition-none motion-reduce:hover:transform-none ease-in-out" >
                        <img src={AboutUs} alt="Icon About Us" className=' w-[5rem] h-[5rem] md:w-[10rem] md:h-[10rem] p-[10px]' />
                        <p className="text-(--black) text-sm md:text-xl font-regular text-center flex items-center-safe ">Tentang Kami</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default HeroSection;
