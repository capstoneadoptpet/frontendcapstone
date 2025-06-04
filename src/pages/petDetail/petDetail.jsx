import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { FaChevronRight, FaShare } from "react-icons/fa6";
import MarkFav from "../../components/pets-components/MarkFav";

const PetDetail = () => {
    const { id } = useParams();
    const apiURL = import.meta.env.VITE_API_URL;
    const [petDetails, setPetDetails] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (id && apiURL) {
            const fetchPetDetails = async () => {
                try {
                    const response = await fetch(`${apiURL}/pet/details/${id}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch pet details");
                    }
                    let data;
                    try {
                        data = await response.json();
                    } catch (jsonErr) {
                        const text = await response.text();
                        console.error("Failed to parse JSON. Response text:", text);
                        throw jsonErr;
                    }
                    console.log("Fetched pet details:", data);
                    setPetDetails(data);
                    console.log("gambar ", data.data.pictures)

                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchPetDetails();
        } else {
            setError("Pet ID or API URL is missing");
            setLoading(false);
        }
    }, [id, apiURL]);

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

    const handleShareClick = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href)
                .then(() => {
                    alert("Link copied to clipboard!");
                })
                .catch((err) => {
                    alert("Failed to copy link: " + err);
                });
        } else {
            alert("Clipboard API not supported");
        }
    };

    // New effect for auto sliding every 3000ms
    useEffect(() => {
        try {
            if (!petDetails || !petDetails.data.pictures || petDetails.data.pictures.length === 0) return;
        } catch (err) {
            console.error("Error accessing pictures length:", err, petDetails?.data?.pictures);
            return;
        }
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === petDetails.data.pictures.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);
        return () => clearInterval(interval);
    }, [petDetails]);

    const goToNext = () => {
        if (!petDetails || !petDetails.data.pictures) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === petDetails.data.pictures.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        if (!petDetails || !petDetails.data.pictures) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? petDetails.data.pictures.length - 1 : prevIndex - 1
        );
    };

    if (loading) {
        return <div>Loading pet details...</div>;
    }

    if (error) {
        alert ("Error fetching pet details: " + error);
    }

    if (!petDetails) {
        return <div>No pet details available</div>;
    }

    return (
        <div className="max-w-full grid grid-rows-1 gap-2 mt-10 overflow-x-hidden">
            <div className="flex h-56 sm:h-64 xl:h-80 2xl:h-96 mt-10 max-sm:w-full max-sm:flex max-sm:flex-col">
                <Carousel>
                    {petDetails.data.pictures && petDetails.data.pictures.length > 0 && petDetails.data.pictures.map((pic, index) => (
                        <img
                            key={pic}
                            src={`${apiURL}/${pic}`}
                            alt={`Pet image ${index + 1}`}
                            className={` h-56 sm:h-64 xl:h-80 2xl:h-96 object-contain transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        />
                    ))}
                    {/* Prev Button */}
                    <button
                        onClick={goToPrev}
                        className="absolute sm:top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
                        aria-label="Previous Slide"
                    >
                        <FaChevronRight className="rotate-180 text-gray-700" />
                    </button>
                    {/* Next Button */}
                    <button
                        onClick={goToNext}
                        className="absolute sm:top-1/2 -right-25 sm:right-2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md"
                        aria-label="Next Slide"
                    >
                        <FaChevronRight className="text-gray-700" />
                    </button>
                </Carousel>
            </div>
            <div className="grid lg:grid-flow-col-2 lg:grid-rows-2 gap-4 py-8 px-4 max-sm:grid max-sm:grid-cols-1 max-sm:gap-4">
                <div className="md:col-span-2 sm:col-span-1 row-start-1 row-end-3 bg-(--white) rounded-2xl mt-4 p-8 max-sm:w-full md:max-w-full">
                    <h1 className="text-3xl font-bold mb-2"><strong>{petDetails.data.pet_name}</strong></h1>
                    <p className=" text-xl mb-1"><strong>{petDetails.data.category?.name} Jenis :</strong> {petDetails.data.breed?.name}</p>
                    <hr />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
                        <p className="mb-1"><strong>Kelamin :</strong> {petDetails.data.gender}</p>
                        <p className="mb-1" title={petDetails.data.age?.description} ><strong>Umur :</strong> {petDetails.data.age?.category}</p>
                        <p className="mb-1"><strong>Berat :</strong> {petDetails.data.weight} Kg</p>
                        <p className="mb-1"><strong>Jumlah Warna :</strong> {petDetails.data.color_count}</p>
                    </div>
                    <hr />
                    <p className="my-4"><strong>Tentang {petDetails.data.pet_name} <br /> </strong> {petDetails.data.about_pet}</p>
                </div>
                <div className="md:row-start-1 mt-4 p-8 bg-(--white) rounded-2xl max-sm:w-full">
                    <h3 className="text-xl font-semibold mb-2">Informasi Owner</h3>
                    <hr />
                    <div>
                        <p className="my-4"><strong>Alamat :</strong> <br /> <hr /> <br />{petDetails.data.user?.alamat}, <br />{petDetails.data.user?.kelurahan}, {petDetails.data.user?.kecamatan}, {petDetails.data.user?.kota}, {petDetails.data.user?.provinsi}</p>
                        <p className="my-4"><strong>Email :</strong> <br /> <hr /> <br />{petDetails.data.user?.email}</p>
                        <p className="my-4"><strong>No Telephone :</strong> <br /> <hr /> <br />{petDetails.data.user?.phone}</p>
                    </div>
                    <div className="max-sm:grid max-sm:grid-rows-2 sm:flex sm:justify-between mb-2">
                        <div className="flex gap-2 my-4">
                            {petDetails.data.user?.picture && (
                                <img
                                    src={`${apiURL}/${petDetails.data.user.picture}`}
                                    alt={petDetails.data.user.username}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                            )}
                            <p>{petDetails.data.user?.username}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 my-4">
                            <div
                                className="favorite bg-(--blue-sky) justify-items-center h-10 w-10 rounded-4xl cursor-pointer flex items-center justify-center text-xl "
                            >
                                <MarkFav pet={petDetails.data} apiURL={apiURL} favorites={favorites} />
                            </div>
                            <div
                                className="share bg-(--blue-sky) justify-items-center h-10 w-10 rounded-4xl flex items-center justify-center cursor-pointer"
                                onClick={handleShareClick}
                                aria-label="Share link"
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleShareClick(); }}
                            >
                                <FaShare />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetail;
