import React, { useState, useEffect } from 'react';
import CardItem from '../../components/pets-components/card-item'

const FindPetPage = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [breed, setBreed] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [ages, setAges] = useState([]);
  const [kota, setKota] = useState('');
  const [kotas, setKotas] = useState([]);
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 12;

  // Fetch categories and ages on mount
  useEffect(() => {
    fetch(`${apiURL}/pet-categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
    fetch(`${apiURL}/ages`)
      .then(res => res.json())
      .then(data => setAges(data));
  }, [apiURL]);

  // Fetch breeds when category changes
  useEffect(() => {
    if (category) {
      fetch(`${apiURL}/breeds?category_id=${category}`)
        .then(res => res.json())
        .then(data => setBreeds(data));
    } else {
      setBreeds([]);
    }
  }, [category, apiURL]);

  // Fetch all pets from backend
  useEffect(() => {
    fetch(`${apiURL}/pets`)
      .then(res => res.json())
      .then(json => {
        setPets(json.data || []);
        setKotas(['Any', ...new Set((json.data || []).map(p => p.kota).filter(Boolean))]);
      });
  }, [apiURL]);

  // Filter pets based on selected filters
  const filteredPets = pets.filter(pet => {
    const matchCategory = category ? pet.category?.id === Number(category) : true;
    const matchBreed = breed && breed !== 'Any' ? pet.breed?.id === Number(breed) : true;
    const matchGender = gender ? pet.gender === gender : true;
    const matchAge = age && age !== 'Any' ? pet.age?.id === Number(age) : true;
    const matchKota = kota && kota !== 'Any' ? pet.kota === kota : true;
    return matchCategory && matchBreed && matchGender && matchAge && matchKota;
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetch(`${apiURL}/users/favorites`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setFavorites(data.favorites || []))
        .catch(err => console.error('Error fetching favorites:', err));
    }
  }, [apiURL]);


  // Pagination logic
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const paginatedPets = filteredPets.slice(
    (currentPage - 1) * petsPerPage,
    currentPage * petsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Category</h2>
      <div className="flex justify-center gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`flex flex-col items-center px-6 py-3 rounded-lg border-2 ${category === String(cat.id) ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'}`}
            onClick={() => {
              if (category === String(cat.id)) {
                setCategory('');
              } else {
                setCategory(String(cat.id));
              }
              setCurrentPage(1);
            }}
          >
            {cat.icon
              ? <img src={`${apiURL}/${cat.icon}`} alt={cat.name} className="w-8 h-8 object-contain" />
              : <span className="text-3xl">🐾</span>
            }
            {cat.name}
          </button>
        ))}
      </div>
      <div className="flex gap-8 max-w-7xl mx-auto">
        {/* Filter Sidebar */}
        <div className="w-64 p-6 flex flex-col gap-4">
          <label>
            Breed
            <select className="w-full mt-1 p-2 border rounded-lg" value={breed} onChange={e => { setBreed(e.target.value); setCurrentPage(1); }}>
              <option value="">Any</option>
              {breeds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </label>
          <label>
            Gender
            <select className="w-full mt-1 p-2 border rounded-lg" value={gender} onChange={e => { setGender(e.target.value); setCurrentPage(1); }}>
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            Age
            <select className="w-full mt-1 p-2 border rounded-lg" value={age} onChange={e => { setAge(e.target.value); setCurrentPage(1); }}>
              <option value="">Any</option>
              {ages.map(a => <option key={a.id} value={a.id}>{a.category}</option>)}
            </select>
          </label>
          <label>
            Kota
            <select className="w-full mt-1 p-2 border rounded-lg" value={kota} onChange={e => { setKota(e.target.value); setCurrentPage(1); }}>
              {kotas.map(k => <option key={k}>{k}</option>)}
            </select>
          </label>
        </div>
        {/* Pet Cards Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedPets.map((pet, idx) => (
              <CardItem key={pet.id || idx} pet={pet} apiURL={apiURL} favorites={favorites} />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 gap-2">
            <button
              className="px-3 py-1 rounded border bg-white cursor-pointer hover:border-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:border"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt; Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded border cursor-pointer hover:border-2 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white'}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded border bg-white cursor-pointer hover:border-2 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:border"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPetPage;