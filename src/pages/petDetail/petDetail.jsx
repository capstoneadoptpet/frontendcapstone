import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Carousel } from "../../components/pets-components/carousel-components";
import { FaShare } from "react-icons/fa6";
import MarkFav from "../../components/pets-components/MarkFav";
import { motion } from "motion/react"
im

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
          console.log("gambar ", data.data.pictures);
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
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetch(`${apiURL}/users/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text();
            console.error("Error fetching favorites:", res.status, text);
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setFavorites(data.favorites || []);
          }
        })
        .catch((err) => console.error("Error fetching favorites:", err));
    }
  }, [apiURL]);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Link copied to clipboard!',
            timer: 2000,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          alert("Failed to copy link: " + err);
        });
    } else {
      alert("Clipboard API not supported");
    }
  };

  const handleProfileClick = () => {
    if (!petDetails?.data?.user?.user_id) return;
    navigate(`/profile-detail/${petDetails.data.user.user_id}`);
  };

  if (loading) {
    return <div>Loading pet details...</div>;
  }

  if (error) {
    alert("Error fetching pet details: " + error);
  }

  if (!petDetails) {
    return <div>No pet details available</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            duration: 1.2
        },
    },
  };

  const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-full grid grid-rows-1 gap-2 overflow-x-hidden">
      <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.3 }} className="flex bg-[#222831] h-56 sm:h-64 xl:h-80 2xl:h-96 max-sm:w-full max-sm:flex max-sm:flex-col">
        <Carousel Slides={petDetails.data.pictures} />
      </motion.div>
      <div className="grid lg:grid-flow-col-2 lg:grid-rows-2 gap-4 py-8 px-4 max-sm:grid max-sm:grid-cols-1 max-sm:gap-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="md:col-span-2 sm:col-span-1 row-start-1 row-end-3 bg-(--white) rounded-2xl mt-4 p-8 max-sm:w-full md:max-w-full">
          <motion.h1 variants={itemVariants} className="text-3xl font-bold mb-2">
            <strong>{petDetails.data.pet_name}</strong>
          </motion.h1>
          <motion.p variants={itemVariants} className=" text-xl mb-1">
            <strong>{petDetails.data.category?.name} Jenis :</strong>{" "}
            {petDetails.data.breed?.name}
          </motion.p>
          <motion.hr variants={itemVariants}/>
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-2 my-4">
              <motion.p variants={itemVariants} className="mb-1">
                <strong>Kelamin :</strong> {petDetails.data.gender}
              </motion.p>
              <motion.p className="mb-1" title={petDetails.data.age?.description}>
                <strong>Umur :</strong> {petDetails.data.age?.category}
              </motion.p>
              <motion.p className="mb-1">
                <strong>Berat :</strong> {petDetails.data.weight} Kg
              </motion.p>
              <motion.p className="mb-1">
                <strong>Jumlah Warna :</strong> {petDetails.data.color_count}
              </motion.p>
            </motion.div>
          <motion.hr variants={itemVariants}/>
          <motion.p variants={itemVariants} className="my-4">
            <strong>
              Tentang {petDetails.data.pet_name} <br />
            </strong>{" "}
            {petDetails.data.about_pet}
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="md:row-start-1 mt-4 p-8 bg-(--white) rounded-2xl max-sm:w-full">
          <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-2">Informasi Owner</motion.h3>
          <motion.hr variants={itemVariants}/>
          <motion.div variants={itemVariants}>
            <p className="my-4">
              <strong>Alamat :</strong> <br /> <hr /> <br />
              {petDetails.data.user?.alamat}, <br />
              {petDetails.data.user?.kelurahan}, {petDetails.data.user?.kecamatan},{" "}
              {petDetails.data.user?.kota}, {petDetails.data.user?.provinsi}
            </p>
            <p className="my-4">
              <strong>Email :</strong> <br /> <hr /> <br />
              {petDetails.data.user?.email}
            </p>
            <p className="my-4">
              <strong>No Telephone :</strong> <br /> <hr /> <br />
              {petDetails.data.user?.phone}
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="max-sm:grid max-sm:grid-rows-2 sm:flex sm:justify-between mb-2">
            <div
              className="user-profile flex gap-2 my-4 cursor-pointer"
              onClick={handleProfileClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleProfileClick();
              }}
            >
              {petDetails.data.user?.picture && (
                <img
                  src={`${petDetails.data.user.picture}`}
                  alt={petDetails.data.user.username}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
              )}
              <p>{petDetails.data.user?.username}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 my-4">
              <motion.div whileHover={{ scale: 1.07}} whileTap={{scale: 0.97}} className="favorite bg-(--blue-sky) justify-items-center h-10 w-10 rounded-4xl cursor-pointer flex items-center justify-center text-xl ">
                <MarkFav
                  pet={petDetails.data}
                  apiURL={apiURL}
                  favorites={favorites}
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.07}} 
                whileTap={{scale: 0.97}}
                className="share bg-(--blue-sky) justify-items-center h-10 w-10 rounded-4xl flex items-center justify-center cursor-pointer"
                onClick={handleShareClick}
                aria-label="Share link"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleShareClick();
                }}
              >
                <FaShare />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PetDetail;
