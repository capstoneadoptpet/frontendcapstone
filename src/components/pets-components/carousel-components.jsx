import { useState, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa6";

export const Carousel = ({ Slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!Slides || Slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === Slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [Slides]);

  const goToNext = () => {
    if (!Slides) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === Slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    if (!Slides) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-56 sm:h-64 xl:h-80 2xl:h-96 overflow-hidden rounded-lg">
      {Slides && Slides.length > 0 && Slides.map((pic, index) => (
        <img
          key={pic}
          src={pic}
          alt={`Pet image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      {/* Prev Button */}
      <button
        onClick={goToPrev}
        className="absolute z-10 top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
        aria-label="Previous Slide"
      >
        <FaChevronRight className="rotate-180 text-gray-700" />
      </button>
      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute z-10 top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
        aria-label="Next Slide"
      >
        <FaChevronRight className="text-gray-700" />
      </button>
    </div>
  );
};
