import CardItem from "../pets-components/card-item";
import { useState, useEffect } from "react";
import Paw from '../../assets/img/PawBlack.png';
import { useNavigate } from "react-router-dom";

const CardList = ({ user }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setIsLoading(true);
            fetch(`${apiURL}/results/${user}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`Failed to fetch posts: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    if (data.result) setPosts(data.result);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError(err.message);
                    setIsLoading(false);
                });
        }
    }, [apiURL, user]);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            fetch(`${apiURL}/users/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(async res => {
                    if (!res.ok) {
                        const text = await res.text();
                        console.error('Error fetching favorites:', res.status, text);
                        return;
                    }
                    return res.json();
                })
                .then(data => {
                    if (data) {
                        setFavorites(data.favorites || []);
                    }
                })
                .catch(err => console.error('Error fetching favorites:', err));
        }
    }, [apiURL]);

    const updateFavorites = (petId, isFavorited) => {
        setFavorites(prevFavorites => {
            if (isFavorited) {
                if (!prevFavorites.includes(petId)) {
                    return [...prevFavorites, petId];
                }
            } else {
                return prevFavorites.filter(id => id !== petId);
            }
            return prevFavorites;
        });
    };

    const handleNavigate = () => {
        navigate('/findpet');
    };

    if (isLoading) {
        return <div className="text-center my-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center my-4 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="card-list grid grid-rows-1 md:grid-rows-1 gap-2 w-full my-[10rem] py-[2rem] bg-[var(--white)] justify-items-center">
            <div>
                <h1 className="text-xl md:text-3xl font-semibold text-center my-[2rem]" >Rekomendasi Hewan Untuk Anda</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

                {posts.map(post => (
                    <CardItem key={post.id} post_id={post.id} pet={post} apiURL={apiURL} favorites={favorites} updateFavorites={updateFavorites} />
                ))}
                <div
                    className="Card_Routes group relative flex flex-col items-center w-48 h-56 bg-[var(--blue-sky)] rounded-xl cursor-pointer"
                    onClick={handleNavigate}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNavigate(); }}
                >
                    <div className="grid grid-rows-2 gap-0 justify-items-center p-2">
                        <img src={Paw} alt="Paw" className="h-[5rem] w-[5rem]" />
                        <p className=" text-sm text-[var(--black)] text-center">Lihat Hewan lainnya yang memerlukan rumah</p>
                    </div>
                    <div
                        className="flex text-l font-semibold justify-center items-center p-2 border-t-2 h-full w-full rounded-b-xl group-hover:bg-[var(--navy)]"
                    >
                        <p>
                            Temui Mereka
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CardList;
