import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from '../../components/pets-components/card-item';
import { Spinner } from "flowbite-react";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const MyPosts = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('auth_token');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    if (token) {
      fetch(`${apiURL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, [token, apiURL]);

  // Fetch posts by user
  useEffect(() => {
    if (token && user?.user_id) {
      setIsLoading(true);
      setError(null);
      fetch(`${apiURL}/pets?user_id=${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status}`);
          }
          return res.json();
        })
        .then(json => {
          setPosts(json.data || []);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [token, apiURL, user]);

  // Fetch favorites
  useEffect(() => {
    if (token) {
      fetch(`${apiURL}/users/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.ok ? res.json() : { favorites: [] })
        .then(data => setFavorites(data.favorites || []))
        .catch(() => setFavorites([]));
    }
  }, [token, apiURL]);

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

  const handleEdit = (petId) => {
    navigate(`/edit-post/${petId}`);
  };

  const handleDelete = async (petId) => {
    const result = await Swal.fire({
      title: 'Apa Anda yakin ingin menghapus postingan ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Tidak',
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch(`${apiURL}/pet/delete/${petId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete post: ${response.status} ${text}`);
      }
      setPosts(prevPosts => prevPosts.filter(post => post.id !== petId));
      Swal.fire({
        icon: 'success',
        title: 'Hapus!',
        text: 'Postingan Anda berhasil di hapus.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      setDeleteError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        timer: 3000,
        showConfirmButton: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <Spinner aria-label="Default status example" />;
  }

  if (error) {
    return console.error(error)
  }

  if (!posts.length) {
      return (
          <div className="flex justify-center items-center my-[2rem] h-[20rem]">
              <h1 className="text-3xl font-bold mb-6 text-center">Tidak Ada Hewan Postingan Kamu</h1>
          </div>
      );
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.3 }} className="min-h-screen mx-auto md:mx-[3rem] py-8">
      <h2 className="text-4xl font-bold text-center mb-2 font-poppins">Your Post Pet</h2>
      <hr className="border-black w-11/12 mx-auto mb-8" />
      {deleteError && <div className="text-red-600 text-center mb-4">{deleteError}</div>}
      <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.3 }} className="flex flex-wrap justify-center gap-6">
          {posts.map((post) => (
            <div key={post.id} className="flex flex-col items-center">
              <CardItem pet={post} apiURL={apiURL} favorites={favorites} updateFavorites={updateFavorites} />
              <div className="flex gap-2 mt-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-1 px-6 rounded-lg font-poppins"
                  onClick={() => handleEdit(post.id)}
                  disabled={isDeleting}
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-6 rounded-lg font-poppins"
                  onClick={() => handleDelete(post.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Menghapus...' : 'Hapus'}
                </motion.button>
              </div>
            </div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default MyPosts;
