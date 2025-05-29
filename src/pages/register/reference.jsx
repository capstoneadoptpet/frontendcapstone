import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ReferencePage = () => {
    const location = useLocation();
    const [animal_type, setTipeHewan] = useState('');
    const [breed, setJenisHewan] = useState('');
    const [animal_gender, setGenderHewan] = useState('');
    const [age_group, setKelompokUsia] = useState('');
    const [color_count, setJumlahWarna] = useState('');
    const apiURL = import.meta.env.VITE_API_URL;


    const {
        username = '',
        email = '',
        password = '',
        phone = '',
        alamat = '',
        kelurahan = '',
        kecamatan = '',
        kota = '',
        provinsi = '',
    } = location.state || {};

    const [categories, setCategories] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [ages, setAges] = useState([]);

    useEffect(() => {
        fetch(`${apiURL}/pet-categories`)
            .then(res => res.json())
            .then(data => setCategories(data));
        fetch(`${apiURL}/ages`)
            .then(res => res.json())
            .then(data => setAges(data));
    }, [apiURL]);

    useEffect(() => {
        if (animal_type) {
            fetch(`${apiURL}/breeds?category_id=${animal_type}`)
                .then(res => res.json())
                .then(data => setBreeds(data));
        } else {
            setBreeds([]);
        }
    }, [animal_type, apiURL]);


    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch(`${apiURL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    phone,
                    alamat,
                    kelurahan,
                    kecamatan,
                    kota,
                    provinsi,
                    animal_type,
                    breed,
                    animal_gender,
                    age_group,
                    color_count
                })

            });
            if (response.ok) {
                const userData = await response.json();
                const user_id = userData.user_id || userData.id;
                console.log('Your user ID:', user_id);
                try {
                    const recoms = await fetch(`${apiURL}/recommendations/${user_id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (recoms.ok) {
                        const recommendations = await recoms.json();
                        console.log('Recommendations:', recommendations);
                        navigate('/login');
                    } else {
                        console.error('Failed to fetch recommendations');
                    }
                }
                catch (err) {
                    console.error('Error fetching recommendations:', err);
                }
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('An error occurred. Please try again.');

        }
    }

    return (
        <div className="register-page flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-10 my-20">
                <h2 className="text-2xl font-semibold text-center mb-8">Register Hewan</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1">Kategori Hewan</label>
                        <select
                            value={animal_type}
                            onChange={(e) => setTipeHewan(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        >
                            <option value="" disabled>
                                Pilih kategori Hewan yang ingin dipelhara
                            </option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Jenis Hewan</label>
                        <select
                            value={breed}
                            onChange={(e) => setJenisHewan(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                            disabled={!animal_type}
                        >
                            <option value="" disabled>
                                {animal_type
                                    ? 'Select Jenis Hewan'
                                    : 'Select Type Hewan First'}
                            </option>
                            {breeds.map(br => (
                                <option key={br.id} value={br.id}>{br.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Kelamin Hewan</label>
                        <select
                            value={animal_gender}
                            onChange={(e) => setGenderHewan(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            disabled={!breed}
                            required
                        >
                            <option value="" disabled>
                                {breed
                                    ? 'Select Gender Hewan'
                                    : 'Select Jenis Hewan First'}
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Kelompok Usia</label>
                        <select
                            value={age_group}
                            onChange={(e) => setKelompokUsia(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                            disabled={!animal_gender}
                        >
                            <option value="" disabled>
                                {animal_gender
                                    ? 'Select Kelompok Usia Hewan'
                                    : 'Select Gender Hewan First'}
                            </option>
                            {ages.map(age => (
                                <option key={age.id} value={age.id}>{age.category}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Jumlah Warna</label>
                        <select
                            value={color_count}
                            onChange={(e) => setJumlahWarna(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            disabled={!age_group}
                            required
                        >
                            <option value="" disabled>
                                {age_group
                                    ? 'Select Jumlah Warna'
                                    : 'Select Kelompok Usia Hewan First'}
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReferencePage;