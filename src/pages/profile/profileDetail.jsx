import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroSection from "../../components/profile-components/hero-section";

const ProfileDetailPage = () => {
  const { id } = useParams();
  const apiURL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id && apiURL) {
      const fetchUserDetail = async () => {
        try {
          const response = await fetch(`${apiURL}/users/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const data = await response.json();
          setUser(data);
        } catch (err) {
          console.error("Error fetching user details:", err);
        }
      };
      fetchUserDetail();
    }
  }, [id, apiURL]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <HeroSection user={user} isEditing={isEditing} setUser={setUser} />
      <div className="section-Profile bg-gray-100 -h-screen mx-4 md:mx-10 py-5 my-5">
        <div className="profile-info bg-white rounded-md shadow-md p-4 md:p-10 my-10">
          <p className="text-2xl md:text-4xl font-bold">Tentang Saya</p>
          <div className="border-t-2 mb-4"></div>
          <p className="text-m p-2 ">{user.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailPage;
