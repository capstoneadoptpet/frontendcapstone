import CardItem from "../pets-components/card-item";
import { useState, useEffect } from "react";
import Paw from '../../assets/img/PawBlack.png';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const CardList = ({ user }) => {
    const apiURL = import.meta.env.VITE_API_URL;
    // console.log("api : ", apiURL);
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
        <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.7 + posts.length * 0.2 }} className="card-list_section grid grid-rows-1 md:grid-rows-1 gap-2 w-full my-[16rem] md:my-5 lg:my-[12rem] py-8 bg-[var(--white)] justify-items-center">
            <div>
                <h1 className="text-xl md:text-3xl font-semibold text-center my-8" >Rekomendasi Hewan Untuk Anda</h1>
            </div>
            <div className="card-list grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 sm:px-8 justify-center justify-items-center">
                <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.7 + posts.length * 0.2 }}>
                    {posts.length > 0 && posts.map(post => (
                        <CardItem key={post.id} post_id={post.id} pet={post} apiURL={apiURL} favorites={favorites} updateFavorites={updateFavorites} />
                    ))}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -20}}
                    animate={{ opacity: 1, y: 0}}
                    transition={{type: "spring", stiffness: 100, damping: 20, delay:0.7 + (posts.length + 1) * 0.2}}
                    className="Card_Routes group relative flex flex-col items-center w-48 bg-[var(--blue-sky)] rounded-xl cursor-pointer hover:border-2 border-[var(--navy)]"
                    onClick={handleNavigate}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleNavigate(); }}
                >
                    <div className="grid grid-rows-2 gap-0 justify-items-center p-2">
                        <img src={Paw} alt="Paw" className="h-20 w-20" />
                        <p className=" text-sm text-[var(--black)] text-center">Lihat Hewan lainnya yang memerlukan rumah</p>
                    </div>
                    <div
                        className="flex text-l font-semibold justify-center items-center p-2 border-t-2 h-full w-full rounded-b-xl group-hover:bg-[var(--navy)]"
                    >
                        <p>
                            Temui Mereka
                        </p>
                    </div>

                </motion.div>
            </div>
        </motion.div>
    )
}

export default CardList;
