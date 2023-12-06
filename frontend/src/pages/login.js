// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';

import handleLogin from '../usecase/login';
import Modal from '../components/modal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-black p-8 rounded shadow-md w-96 text-gray-300">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 p-2 border rounded w-full text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
                        onClick={async () => {
                            const token = await handleLogin(email, password)
                            if (token) { 
                                // Set the token to local storage
                                localStorage.setItem('token', token);
                                router.push('/dashboard');
                            } else if (!token && email && password) {
                                setModalMessage('Failed login');
                                setShowModal(true);
                            }
                        }}
                    >
                        Login
                    </button>
                </form>
            </div>
            <Modal isOpen={showModal} message={modalMessage} onClose={closeModal} />
        </div>
    );
};

export default Login;
