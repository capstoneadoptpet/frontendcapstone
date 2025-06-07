import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalTermsPolicy } from '../../components/modal-TP';
import Swal from 'sweetalert2';
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
    const apiURL = import.meta.env.VITE_API_URL;
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const checkUsername = async (e,username) => {
        e.preventDefault();
        const response = await fetch(`${apiURL}/username/${username}`, {
                method: 'GET',
            });
        if (response.ok) {
            setUsername(username);
        }
        else {
            setUsername('');
            const error = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                timer: 1500,
                showConfirmButton: false,
            });
        }
    }
    const checkEmail = async (e,email) => {
        e.preventDefault();
        const response = await fetch(`${apiURL}/email/${email}`, {
                method: 'GET',
            });
        if (response.ok) {
            setEmail(email);
        }
        else {
            setEmail('');
            const error = await response.json();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                timer: 1500,
                showConfirmButton: false,
            });
        }
    }

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                duration: 1.2
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div initial={{ opacity: 0, y: -20}} animate={{ opacity: 1, y: 0}} transition={{type: "spring", stiffness: 100, damping: 20, delay: 0.3 }} className="register-page flex justify-center items-center min-h-screen bg-gray-100">
            <motion.div variants={containerVariants} className="w-full max-w-4xl bg-white rounded-lg shadow-md p-10 my-20">
                <motion.h1 variants={itemVariants} className="text-2xl font-semibold text-center mb-8">Daftar</motion.h1>
                <motion.form variants={itemVariants} onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-1">Username</label>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            onBlur={e => checkUsername(e, e.target.value)}
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
                            onBlur={e => checkEmail(e, e.target.value)}
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
                            <motion.button
                                whileHover={{ scale: 1.07}} 
                                whileTap={{scale: 0.97}}
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-3 text-gray-600 hover:text-gray-900 text-xs sm:text-sm"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </motion.button>

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
                </motion.form>
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
            </motion.div>
        </motion.div>
    );
};

export default RegisterPage;
