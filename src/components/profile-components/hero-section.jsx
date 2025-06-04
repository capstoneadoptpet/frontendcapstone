import React, { useRef } from 'react';
import ProfBG from '../../assets/img/ProfBG.png';
import Swal from 'sweetalert2';


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
        <div className="section-Hero bg-(--grey) h-screen mx-10 py-5 relative">
            <img
                src={ProfBG}
                alt="Hero Background"
                className="object-cover filter opacity-80 rounded-md relative top-0 left-0 w-full h-full "
            />

            <div className="absolute bottom-32 left-12 flex items-center gap-x-4 z-10">
                {isEditing ? (
                    <>
                        <img
                            src={user.picture}
                            alt="Profile"
                            className="w-36 h-36 rounded-full border-4 p-1 border-green-400 shadow-lg cursor-pointer object-cover"
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
                        className="w-36 h-36 rounded-full p-2 shadow-lg object-cover"
                    />
                )}
                <h1 className="text-4xl font-bold px-4 py-2 rounded">{user.username}</h1>
            </div>
        </div>
    );
};

export default HeroSection;
