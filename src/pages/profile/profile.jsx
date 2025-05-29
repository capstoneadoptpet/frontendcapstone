import React, { useEffect, useState } from 'react';
import HeroSection from "../../components/profile-components/hero-section";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState('');
    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('auth_token');
            try {
                const response = await fetch(`${apiURL}/users/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                    setDescription(data.description);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUser();
    }, []);


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setIsEditing(false);
        setUser({ ...user, description });

        const token = localStorage.getItem('auth_token');
        try {
            const response = await fetch(`${apiURL}/users/changeprof`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ description }),
            });

            if (response.ok) {
                alert('Biodata updated successfully');
                console.log('Successfully updated description');
            } else {
                console.error('Failed to update description');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <HeroSection user={user} isEditing={isEditing} setUser={setUser} />
            <div className="section-Profile bg-gray-100 h-screen mx-10 py-5">
                <div className="profile-info bg-white rounded-md shadow-md p-10 my-10">
                    <p className="text-4xl font-bold">About Me</p>
                    <div className="border-t-2 mb-4"></div>
                    {isEditing ? (
                        <textarea
                            className="w-full p-2 border rounded-md"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    ) : (
                        <p className="text-m p-2 ">{user.description}</p>
                    )}
                </div>
                {isEditing ? (
                    <button
                        onClick={handleSaveClick}
                        className="px-10 py-2 border-3 border-sky-500 rounded-lg bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="px-10 py-2 rounded-lg border-3 border-sky-500 hover:bg-sky-500 hover:text-white cursor-pointer"
                    >
                        Edit Bio
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;