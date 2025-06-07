import React, { useRef } from 'react';
import ProfBG from '../../assets/img/HeroBG.webp';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';


const HeroSection = ({ user, isEditing, setUser }) => {
    const fileInputRef = useRef(null);
    const apiURL = import.meta.env.VITE_API_URL;

    console.log(`${apiURL}/${user.picture}`);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const token = localStorage.getItem('auth_token');
            const formData = new FormData();
            formData.append('picture', file);

            console.log('FormData:', formData);

            try {
                const response = await fetch(`${apiURL}/users/update-picture`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Profile picture berhasil di update! 🥳',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    setUser(data.user);
                } else {
                    const errorData = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errorData.message || 'Gagal mengupdate Profile Picture',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Terjadi kesalahan dalam menggunggah foto 🥲',
                    timer: 2000,
                    showConfirmButton: false,
                });
                console.error(error);
            }
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.3 }} className="section-Hero bg-(--grey) h-screen mx-4 md:mx-10 py-5 relative">
            <img
                src={ProfBG}
                alt="Hero Background"
                className="object-cover filter opacity-80 rounded-md relative top-0 left-0 w-full h-full"
            />

            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3, duration: 1.2 }}
                className="absolute bottom-20 md:bottom-32 left-4 md:left-12 flex items-center gap-x-4 z-10">
                {isEditing ? (
                    <>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-24 md:w-36 h-24 md:h-36 rounded-full border-4 p-1 border-green-400 shadow-lg cursor-pointer object-cover"
                            onClick={handleImageClick}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </>
                ) : (
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="w-24 md:w-36 h-24 md:h-36 rounded-full p-2 shadow-lg object-cover"
                    />
                )}
                <h1 className="text-2xl md:text-4xl font-bold px-4 py-2 rounded">{user.username}</h1>
            </motion.div>
        </motion.div>
    );
};

export default HeroSection;
