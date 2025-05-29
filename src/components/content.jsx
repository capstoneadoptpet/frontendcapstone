import "../styles/content.css";

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
    return (
        <>
            <div
                className={
                    lightBg ? "home__content-section justify-items-center" : "home__content-section darkBg justify-items-center rounded-2xl"
                }
            >
                <div className="container items-center">
                    <div
                        className="row home__content-row grid grid-rows-2 md:grid-cols-2 xl:grid-cols-2 justify-center "
                        style={{
                            display: "flex",
                            flexDirection: imgStart === "start" ? "row-reverse" : "row",
                        }}
                    >
                        <div className="">
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
                        </div>
                        <div className="">
                            <div className="home__content-img-wrapper">
                                <img
                                    src={img}
                                    alt={headline}
                                    className="home__content-img"

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Content;