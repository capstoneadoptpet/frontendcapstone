import { useState, useEffect } from "react";
import CardItem from "../../components/pets-components/card-item";
import { Spinner } from "flowbite-react";

const Favorites = () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoritesAndPets = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setError("User not authenticated");
                setIsLoading(false);
                return;
            }
            try {
                // Fetch favorite IDs
                const favResponse = await fetch(`${apiURL}/users/favorites`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!favResponse.ok) {
                    const text = await favResponse.text();
                    console.error('Failed to fetch favorites:', favResponse.status, text);
                    throw new Error(`Failed to fetch favorites: ${favResponse.status} ${text}`);
                }
                const favData = await favResponse.json();
                console.log('Fetched favorites IDs:', favData);

                // Fetch all pets
                const petsResponse = await fetch(`${apiURL}/pets`);
                if (!petsResponse.ok) {
                    const text = await petsResponse.text();
                    console.error('Failed to fetch pets:', petsResponse.status, text);
                    throw new Error(`Failed to fetch pets: ${petsResponse.status} ${text}`);
                }
                const petsData = await petsResponse.json();
                console.log('Fetched all pets:', petsData);

                const favoriteIds = favData.favorites || [];
                console.log('Favorite IDs:', favoriteIds);
                const petsList = petsData.data || [];
                console.log('Pets List:', petsList);

                // Filter pets to only favorites
                const favoritePets = petsList.filter(pet => favoriteIds.includes(pet.id));
                console.log('Filtered Favorite Pets:', favoritePets);

                setFavorites(favoritePets);
            } catch (err) {
                console.error('Error fetching favorites or pets:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavoritesAndPets();
    }, [apiURL]);

    // Function to update favorites state when a pet is favorited or unfavorited
    const updateFavorites = async (petId, isFavorited) => {
        if (isFavorited) {
            // Fetch full pet data for the new favorite
            try {
                const response = await fetch(`${apiURL}/pets/${petId}`);
                if (!response.ok) {
                    console.error('Failed to fetch pet data for favorite update:', response.status);
                    return;
                }
                const petData = await response.json();
                setFavorites(prevFavorites => {
                    if (!prevFavorites.some(pet => pet.id === petId)) {
                        return [...prevFavorites, petData.data || petData];
                    }
                    return prevFavorites;
                });
            } catch (error) {
                console.error('Error fetching pet data for favorite update:', error);
            }
        } else {
            setFavorites(prevFavorites => prevFavorites.filter(pet => pet.id !== petId));
        }
    };

    if (isLoading) {
        return <Spinner aria-label="Default status example" />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!favorites.length) {
        return (
            <div className="flex justify-center items-center my-[2rem] h-[20rem]">
                <h1 className="text-3xl font-bold mb-6">Tidak Ada Hewan Favorite Kamu</h1>
            </div>
        );
    }

    return (
        <div className=" mx-auto md:mx-[3rem] p-4">
            <div className="justify-items-center border-b-2 my-[2rem]">

                <h1 className="text-3xl font-semibold mb-6">My Favorites</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {favorites.map((pet, index) => (
                    <div key={pet.id || index} className="">
                        <CardItem pet={pet} apiURL={apiURL} favorites={favorites} updateFavorites={updateFavorites} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
