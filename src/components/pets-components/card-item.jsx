import { useNavigate } from "react-router-dom";
import MarkFav from "./MarkFav";

const CardItem = ({ pet, apiURL, favorites, updateFavorites }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!pet || !pet.id) return;
        navigate(`/pet-detail/${pet.id}`);
    };

    if (!pet) {
        return <div className="w-48 h-56 bg-gray-200 rounded-xl animate-pulse"></div>;
    }

    return (
        <div onClick={handleClick} className="relative bg-white rounded-xl border border-gray-400 shadow w-48 overflow-hidden flex flex-col items-center cursor-pointer hover:border-2 hover:border-[var(--black)]">
            <img
                src={pet.pictures && pet.pictures.length > 0 ? `${apiURL}/${pet.pictures[0]}` : "/placeholder.png"}
                alt={pet.pet_name || "Pet Image"}
                className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="flex w-full px-4 pb-4 pt-2 items-center justify-between">
                <span className="text-lg font-poppins">{pet.pet_name || "Unknown"}</span>
                <span className="text-5xl">|</span>
                <span className="text-black text-lg text-right">
                    {pet.breed?.name || "Unknown"}
                </span>
            </div>
            <div className="absolute top-3 right-3 text-2xl select-none focus:outline-none cursor-pointer">
                <MarkFav pet={pet} apiURL={apiURL} favorites={favorites} updateFavorites={updateFavorites} />
            </div>
        </div>
    );
};

export default CardItem;
