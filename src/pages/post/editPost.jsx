import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const { pet_id } = useParams();
    console.log("ini atas", pet_id)
    // const [user, setUser] = useState({});
    const [pet_name, setName] = useState('');
    const [animal_type, setAnimalType] = useState('');
    const [breed, setBreed] = useState('');
    const [color_count, setColorCount] = useState('');
    const [age_group, setAgeGroup] = useState('');
    const [berat, setBerat] = useState('');
    const [animal_gender, setAnimalGender] = useState('');
    const [about_pet, setAboutPet] = useState('');
    const [pictures, setPictures] = useState([null, null, null]);
    // const [alamatBerbeda, setAlamatBerbeda] = useState(false);
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [alamat, setAlamat] = useState('');
    // const [kelurahan, setKelurahan] = useState('');
    // const [kecamatan, setKecamatan] = useState('');
    // const [kota, setKota] = useState('');
    // const [provinsi, setProvinsi] = useState('');
    const [agree, setAgree] = useState(false);
    const [categories, setCategories] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [ages, setAges] = useState([]);
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch(`${apiURL}/pet/details/${pet_id}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const detail = await response.json();
                    console.log(detail.data.pictures)
                    setName(detail.data.pet_name || '');
                    setAnimalType(detail.data.pet_category_id || '');
                    setBreed(detail.data.breed_id || '');
                    setColorCount(detail.data.color_count || '');
                    setAgeGroup(detail.data.age_id || '');
                    setBerat(detail.data.weight || '');
                    setAnimalGender(detail.data.gender || '');
                    setAboutPet(detail.data.about_pet || '');

                    // setEmail(data.user?.email || '');
                    // setPhone(data.user?.phone || '');
                    // setAlamat(data.user?.address || '');
                    // setKelurahan(data.user?.kelurahan || '');
                    // setKecamatan(data.user?.kecamatan || '');
                    // setKota(data.user?.kota || '');
                    // setProvinsi(data.provinsi || '');
                    // setAlamatBerbeda(
                    //     data.user?.email !== data.user?.email ||
                    //     data.user?.phone !== data.user?.phone ||
                    //     data.user?.address !== data.user?.address
                    // );
                    // Pictures handling can be added if API provides URLs
                } else {
                    console.error('Failed to fetch pet data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (pet_id) {
            fetchPetData();
        }
    }, [pet_id, apiURL]);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const token = localStorage.getItem('auth_token');
    //         try {
    //             const response = await fetch(`${apiURL}/users/profile`, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`,
    //                 },
    //             });

    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUser(data);
    //             } else {
    //                 console.error('Failed to fetch user data');
    //             }
    //         } catch (error) {
    //             console.error('Error:', error);
    //         }
    //     };

    //     fetchUser();
    // }, []);

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
            console.log(animal_type);
            fetch(`${apiURL}/breeds?category_id=${animal_type}`)
                .then(res => res.json())
                .then(data => setBreeds(data));
        } else {
            setBreeds([]);
        }
    }, [animal_type, apiURL]);

    const handlePictureChange = (idx, file) => {
        const newPics = [...pictures];
        newPics[idx] = file;
        setPictures(newPics);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agree) {
            alert("Anda Belum Menchecklis Syarat & Ketentuan");
            return;
        }
        const formData = new FormData();
        formData.append('pet_name', pet_name);
        console.log(pet_name)
        formData.append('pet_category_id', animal_type);
        formData.append('breed_id', breed);
        formData.append('color_count', color_count);
        formData.append('age_id', age_group);
        formData.append('weight', berat);
        formData.append('gender', animal_gender);
        formData.append('about_pet', about_pet);
        pictures.forEach((pic) => {
            if (pic) {
                formData.append('pictures[]', pic);
            }
        });
        // formData.append('user_id', user.user_id);
        // formData.append('email', email);
        // formData.append('phone', phone);
        // formData.append('address', alamat);
        // formData.append('kelurahan', kelurahan);
        // formData.append('kecamatan', kecamatan);
        // formData.append('kota', kota);
        // formData.append('provinsi', provinsi);
        console.log("data", formData.pet_name)
        try {
            const response = await fetch(`${apiURL}/pet/${pet_id}`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                alert('Post updated successfully!');
                navigate('/my-posts');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to update post');
            }
        } catch (error) {
            alert('An error occurred while updating the post.');
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">
                <h1 className="text-4xl font-bold text-center mb-2">Edit Your Pet Post</h1>
                <div className="border-t-2 mb-8"></div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <label className="block font-semibold mb-1">Nama Hewan</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Nama Dari Hewan Anda"
                                value={pet_name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Kategori</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={animal_type}
                                onChange={e => setAnimalType(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Pilih Kategori Hewan yang ingin dipelhara
                                </option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Jenis</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={breed}
                                onChange={e => setBreed(e.target.value)}
                                disabled={!animal_type}
                                required
                            >
                                <option value="" disabled>
                                    {animal_type
                                        ? 'Pilih Jenis Hewan'
                                        : 'Pilih Type Hewan Dahulu'}
                                </option>
                                {breeds.map(br => (
                                    <option key={br.id} value={br.id}>{br.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <label className="block font-semibold mb-1">Warna</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={color_count}
                                onChange={e => setColorCount(e.target.value)}
                                disabled={!breed}
                                required
                            >
                                <option value="" disabled>
                                    {breed
                                        ? 'Pilih Jumlah Warna Hewan'
                                        : 'Pilih Jenis Hewan Dahulu'}
                                </option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Usia</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={age_group}
                                onChange={e => setAgeGroup(e.target.value)}
                                disabled={!color_count}
                                required
                            >
                                <option value="" disabled>
                                    {color_count
                                        ? 'Pilih Kelompok Usia Hewan'
                                        : 'Pilih Jumlah Warna Hewan Dahulu'}
                                </option>
                                {ages.map(age => (
                                    <option key={age.id} value={age.id}>{age.category} {age.description}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Berat *Kg</label>
                            <input
                                type="number"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Isi Dengan Angka"
                                value={berat}
                                onChange={e => setBerat(e.target.value)}
                                disabled={!age_group}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <label className="block font-semibold mb-1">Jenis Kelamin</label>
                            <select
                                className="w-full border rounded px-3 py-2"
                                value={animal_gender}
                                onChange={e => setAnimalGender(e.target.value)}
                                disabled={!berat}
                                required
                            >
                                <option value="" disabled>
                                    {berat
                                        ? 'Pilih Gender Hewan'
                                        : 'Isi Berat Dahulu'}
                                </option>
                                <option value="Jantan">Jantan</option>
                                <option value="Betina">Betina</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block font-semibold mb-1">Tentang Hewan</label>
                            <textarea
                                className="w-full border rounded px-3 py-2"
                                placeholder="Beritahu kami tentang hewan peliharaan Anda, jika Anda mengisinya dengan lengkap, kemungkinan hewan peliharaan Anda diadopsi akan meningkat"
                                value={about_pet}
                                onChange={e => setAboutPet(e.target.value)}
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block font-bold mb-1">Gambar</label>
                        <span className="block mb-2 text-sm">Tambahkan Gambar Hewan Anda</span>
                        <button
                            type="button"
                            className="bg-blue-100 text-blue-700 px-4 py-2 rounded mb-4"
                            onClick={() => document.getElementById('pet-picture-0').click()}
                        >
                            Ambil Gambar
                        </button>
                        <div className="flex gap-4">
                            {[0, 1, 2].map(idx => (
                                <label
                                    key={idx}
                                    className="w-32 h-32 border-2 border-gray-300 rounded flex items-center justify-center bg-gray-100 cursor-pointer"
                                >
                                    {pictures[idx] ? (
                                        <img
                                            src={URL.createObjectURL(pictures[idx])}
                                            alt={`Pet ${idx + 1}`}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    ) : (
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75M12 17v.01" />
                                        </svg>
                                    )}
                                    <input
                                        id={`pet-picture-${idx}`}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={e => handlePictureChange(idx, e.target.files[0])}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* <div className="mb-4">
                        <label className="block font-semibold mb-1">Apakah Alamat Hewan Anda Berbeda Dengan Anda</label>
                        <select
                            className="w-full md:w-1/3 border rounded px-3 py-2"
                            value={alamatBerbeda}
                            onChange={e => setAlamatBerbeda(e.target.value === "true")}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div>
                            <label className="block font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Email@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Nomor Handphone</label>
                            <input
                                type="Number"
                                className="w-full border rounded px-3 py-2"
                                placeholder="085*****"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Alamat</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Alamat"
                                value={alamat}
                                onChange={e => setAlamat(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Kelurahan</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Kelurahan"
                                value={kelurahan}
                                onChange={e => setKelurahan(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Kecamatan</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Kecamatan"
                                value={kecamatan}
                                onChange={e => setKecamatan(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Kota</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Kota"
                                value={kota}
                                onChange={e => setKota(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1">Provinsi</label>
                            <input
                                type="text"
                                className="w-full border rounded px-3 py-2"
                                placeholder="Provinsi"
                                value={provinsi}
                                onChange={e => setProvinsi(e.target.value)}
                                disabled={alamatBerbeda === false}
                            />
                        </div>
                    </div> */}

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="agree"
                            checked={agree}
                            onChange={e => setAgree(e.target.checked)}
                            className="mr-2"
                        />
                        <label htmlFor="agree" className="text-sm">
                            Saya Menyetujui <a href="#" className="text-blue-600 underline">Syarat & Ketentuan</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded"
                        disabled={!agree}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPost;