import "../styles/content.css";
import { motion } from 'framer-motion';

const Content = ({
    lightBg,
    topLine,
    lightText,
    lightTextDesc,
    headline,
    description,
    img,
    imgStart,
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delay: 0.2,
                duration: 1
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <div
                className={
                    lightBg ? "home__content-section justify-items-center" : "home__content-section darkBg justify-items-center rounded-2xl"
                }
            >
                <div className="container items-center">
                    <motion.div
                        className="row home__content-row grid grid-rows-2 sm:grid-cols-2 xl:grid-cols-2 gap-10 sm:gap-[10rem] justify-center "
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                            display: "flex",
                            flexDirection: imgStart === "start" ? "row-reverse" : "row",
                        }}
                    >
                        <motion.div variants={itemVariants}>
                            <div className="home__content-text-wrapper">
                                <h1 className={lightText ? "heading" : "heading dark"}>
                                    {headline}
                                </h1>
                                <div className="top-line">{topLine}</div>
                                <p
                                    className={
                                        lightTextDesc
                                            ? "home__content-subtitle"
                                            : "home__content-subtitle dark"
                                    }
                                >
                                    {description}
                                </p>
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <div className="home__content-img-wrapper">
                                <img
                                    src={img}
                                    alt={headline}
                                    className="home__content-img"

                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div >
        </>
    );
}

export default Content;