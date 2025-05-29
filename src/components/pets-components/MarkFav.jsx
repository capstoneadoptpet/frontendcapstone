import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MarkFav = ({ pet, apiURL, favorites = [], updateFavorites }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        try {
            if (pet && favorites && Array.isArray(favorites)) {
                // Check if favorites is array of IDs or pet objects
                if (favorites.length > 0 && typeof favorites[0] === 'object') {
                    setIsFavorited(favorites.some(favPet => favPet.id === pet.id));
                } else {
                    setIsFavorited(favorites.includes(pet.id));
                }
            }
        } catch (error) {
            console.error("Error in MarkFav useEffect:", error);
            setHasError(true);
        }
    }, [favorites, pet]);

    const handleFavorite = async (event) => {
        event.stopPropagation();
        setIsLoading(true);
        const token = localStorage.getItem('auth_token');
        try {
            const response = await fetch(`${apiURL}/users/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ posts: [pet.id] }),
            });
            if (response.ok) {
                setIsFavorited(true);
                const data = await response.json();
                alert(data.message);
                if (updateFavorites) {
                    updateFavorites(pet.id, true);
                }
            }
        }
        catch (err) {
            alert("Failed to add favorite");
            console.error("Error adding favorite:", err);
        }
        setIsLoading(false);
    };

    const handleUnfavorite = async (event) => {
        event.stopPropagation();
        const token = localStorage.getItem('auth_token');
        setIsLoading(true);
        try {
            const response = await fetch(`${apiURL}/users/favorites/${pet.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setIsFavorited(false);
                const data = await response.json();
                alert(data.message);
                if (updateFavorites) {
                    updateFavorites(pet.id, false);
                }
            }
        }
        catch (err) {
            alert("Failed to remove favorite");
            console.error("Error removing favorite:", err);
        }
        setIsLoading(false);
    };

    if (hasError) {
        return <div>Error loading favorite toggle</div>;
    }

    if (!pet) {
        return null;
    }

    return (
        <div>
            <button
                type="button"
                onClick={isFavorited ? handleUnfavorite : handleFavorite}
                disabled={isLoading}
                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
                {isFavorited ? <FaHeart color="#ff0000" /> : <FaRegHeart color="#ff0000" />}
            </button>
        </div>
    );
};

export default MarkFav;