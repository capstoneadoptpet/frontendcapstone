import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalTermsPolicy } from '../../components/modal-TP';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { motion } from "motion/react"

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [alamat, setAlamat] = useState('');
    const [kelurahan, setKelurahan] = useState('');
    const [kecamatan, setKecamatan] = useState('');
    const [kota, setKota] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [agree, setAgree] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agree) {
            navigate('/reference', {
                state: {
                    username,
                    email,
                    password,
                    phone,
                    alamat,
                    kelurahan,
                    kecamatan,
                    kota,
                    provinsi,
                },
            });
        }
    };

    const handleOpenModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAgree = () => {
        setLoading(true);
        setAgree(true);
        setShowModal(false);
        setLoading(false);
    };

    return (
        <div className="register-page flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-10 my-20">
                <h2 className="text-2xl font-semibold text-center mb-8">Daftar</h2>
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Password</label>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 bg-gray-200 rounded"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 text-xs sm:text-sm"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>
                    </div>
                    <div>
                        <label className="block mb-1">Handphone Number</label>
                        <input
                            type="text"
                            placeholder="085****"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Alamat</label>
                        <input
                            type="text"
                            placeholder="Jalan"
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Kelurahan</label>
                        <input
                            type="text"
                            placeholder="Kelurahan"
                            value={kelurahan}
                            onChange={(e) => setKelurahan(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Kecamatan</label>
                        <input
                            type="text"
                            placeholder="Kecamatan"
                            value={kecamatan}
                            onChange={(e) => setKecamatan(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Kota</label>
                        <input
                            type="text"
                            placeholder="Kota"
                            value={kota}
                            onChange={(e) => setKota(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Provinsi</label>
                        <input
                            type="text"
                            placeholder="Provinsi"
                            value={provinsi}
                            onChange={(e) => setProvinsi(e.target.value)}
                            className="w-full p-2 bg-gray-200 rounded"
                            required
                        />
                    </div>
                </form>
                <div className="mt-6 flex flex-col items-center">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            className='border-black-500 border-5'
                            checked={agree}
                            onChange={(e) => setAgree(e.target.checked)}
                            required
                        />
                        <span>I accept the <button onClick={handleOpenModal} className="text-black-500 underline cursor-pointer">Terms & Policy</button></span>
                    </label>

                    <motion.button
                        whileHover={{ scale: 1.07}} 
                        whileTap={{scale: 0.97}}
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-4 w-1/2 sm:w-1/3 bg-sky-500 text-white py-2 rounded hover:bg-blue-500 transition mx-auto"
                    >
                        Lanjut
                    </motion.button>
                </div>
                <ModalTermsPolicy
                    show={showModal}
                    onClose={handleCloseModal}
                    handleSubmit={handleAgree}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
