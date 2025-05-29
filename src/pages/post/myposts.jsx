import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardItem from '../../components/pets-components/card-item';
import { Spinner } from "flowbite-react";

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
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetch(`${apiURL}/pet/delete/${petId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to delete post: ${response.status} ${text}`);
      }
      setPosts(prevPosts => prevPosts.filter(post => post.id !== petId));
    } catch (error) {
      setDeleteError(error.message);
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

  return (
    <div className="min-h-screen mx-auto md:mx-[3rem] py-8">
      <h2 className="text-4xl font-bold text-center mb-2 font-poppins">Your Post Pet</h2>
      <hr className="border-black w-11/12 mx-auto mb-8" />
      {deleteError && <div className="text-red-600 text-center mb-4">{deleteError}</div>}
      <div className="flex flex-wrap justify-center gap-6">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col items-center">
            <CardItem pet={post} apiURL={apiURL} favorites={favorites} updateFavorites={updateFavorites} />
            <div className="flex gap-2 mt-3">
              <button
                className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-1 px-6 rounded-lg font-poppins"
                onClick={() => handleEdit(post.id)}
                disabled={isDeleting}
              >
                Edit
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-6 rounded-lg font-poppins"
                onClick={() => handleDelete(post.id)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Menghapus...' : 'Hapus'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
