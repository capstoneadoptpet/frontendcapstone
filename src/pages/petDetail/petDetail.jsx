import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "flowbite-react";
import { FaShare } from "react-icons/fa6";
import MarkFav from "../../components/pets-components/MarkFav";

const PetDetail = () => {
    const { id } = useParams();
    const apiURL = import.meta.env.VITE_API_URL;
    const [petDetails, setPetDetails] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    console.log(data.pictures)

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

    if (loading) {
        return <div>Loading pet details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!petDetails) {
        return <div>No pet details available</div>;
    }

    console.log("Rendering petDetails:", petDetails);
    return (
        <div>
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slideInterval={3000}>
                    <img src={`${apiURL}/${petDetails.data.pictures[0]}`} alt={`Pet image`} className="h-56 sm:h-64 xl:h-80 2xl:h-96 object-contain w-full" />
                    <img src={`${apiURL}/${petDetails.data.pictures[1]}`} alt={`Pet image`} className="h-56 sm:h-64 xl:h-80 2xl:h-96 object-contain w-full" />
                    <img src={`${apiURL}/${petDetails.data.pictures[2]}`} alt={`Pet image`} className="h-56 sm:h-64 xl:h-80 2xl:h-96 object-contain w-full" />
                    {/* {petDetails.data.pictures && petDetails.data.pictures.map((pic) => (
                        <div key={pic}>
                            <img src={`${apiURL}/${pic}`} alt={`Pet image`} className="h-56 sm:h-64 xl:h-80 2xl:h-96 object-contain w-full" />
                        </div>
                    ))} */}
                </Carousel>
            </div>
            <div className="grid lg:grid-flow-col lg:grid-rows-2 gap-4 p-[2rem]">
                <div className="lg:col-span-2 md:col-span-1 row-start-1 row-end-3 bg-(--white) rounded-2xl mt-4 p-[4rem]">

                    <h1 className="text-3xl font-bold mb-2"><strong>{petDetails.data.pet_name}</strong></h1>
                    <p className=" text-xl mb-1"><strong>{petDetails.data.category?.name} Jenis :</strong> {petDetails.data.breed?.name}</p>
                    <hr />
                    <div className="grid grid-flow-col gap-1 my-[1rem] ">
                        <p className="mb-1"><strong>Kelamin :</strong> {petDetails.data.gender}</p>
                        <p className="mb-1" title={petDetails.data.age?.description} ><strong>Umur :</strong> {petDetails.data.age?.category}</p>
                        <p className="mb-1"><strong>Berat :</strong> {petDetails.data.weight} Kg</p>
                        <p className="mb-1"><strong>Jumlah Warna :</strong> {petDetails.data.color_count}</p>
                    </div>
                    <hr />
                    <p className="my-[1rem]"><strong>Tentang {petDetails.data.pet_name} <br /> </strong> {petDetails.data.about_pet}</p>
                </div>
                <div className="lg:row-start-1 mt-4 p-[4rem] bg-(--white) rounded-2xl">
                    <h3 className="text-xl font-semibold mb-2">Informasi Owner</h3>
                    <hr />
                    <div>
                        <p className="my-[1rem]"><strong>Alamat :</strong> <br /> <hr /> <br />{petDetails.data.user?.alamat}, <br />{petDetails.data.user?.kelurahan}, {petDetails.data.user?.kecamatan}, {petDetails.data.user?.kota}, {petDetails.data.user?.provinsi}</p>
                        <p className="my-[1rem]"><strong>Email :</strong> <br /> <hr /> <br />{petDetails.data.user?.email}</p>
                        <p className="my-[1rem]"><strong>No Telephone :</strong> <br /> <hr /> <br />{petDetails.data.user?.phone}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                        <div className="grid grid-cols-2 gap-2 my-[1rem]">
                            {petDetails.data.user?.picture && (
                                <img
                                    src={`${apiURL}/${petDetails.data.user.picture}`}
                                    alt={petDetails.data.user.username}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                            )}
                            <p>{petDetails.data.user?.username}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 my-[1rem]">
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
