"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function App() {
    const router = useRouter();
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [missingDetails, setMissingDetails] = useState(false);

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');

        if (email === savedEmail && password === savedPassword) {
            router.push('/dashboard');
        } else {
            alert('Invalid Credentials');
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (name && username && email && password) {
            console.log('Name:', name);
            console.log('Username:', username);
            console.log('Email:', email);
            console.log('Password:', password);

            localStorage.setItem('name', name);
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            setRegistrationSuccess(true);
            setMissingDetails(false);
        } else {
            setMissingDetails(true);
        }
    };

    return (
        <div className="fluid p-5 flex m-3 justify-center items-center flex-col h-screen" style={{ marginLeft: "10px" }}>
            {registrationSuccess && (
                <div className="alert alert-success">User registered successfully!</div>
            )}
            {missingDetails && (
                <div className="alert alert-danger">Please fill in all the details.</div>
            )}

            <div className="flex justify-evenly mb-3">
                <div>
                    <a
                        href="#"
                        className={`block py-2 px-4 border border-gray-300 rounded-t ${justifyActive === 'tab1'
                            ? 'text-gray-600 hover:bg-gray-100 active:bg-white focus:outline-none focus:border-blue-500'
                            : ''
                            }`}
                        onClick={() => handleJustifyClick('tab1')}
                    >
                        Login
                    </a>
                </div>
                <div >
                    <a
                        href="#"
                        className={`block py-2 px-4 border border-gray-300 rounded-t ${justifyActive === 'tab2'
                            ? 'text-gray-600 hover:bg-gray-100 active:bg-white focus:outline-none focus:border-blue-500'
                            : ''
                            }`}
                        onClick={() => handleJustifyClick('tab2')}
                    >
                        Register
                    </a>
                </div>
            </div>

            <div className="max-w-screen-md">
                <div className={justifyActive === 'tab1' ? '' : 'hidden'}>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flex justify-between mx-4 mb-4">
                            <input
                                className="mr-2 text-blue-500 form-checkbox h-5"
                                type="checkbox"
                                name="flexCheck"
                                id="flexCheckDefault"
                            />
                            Accept the terms & condition
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full mb-4"
                        >
                            Sign in
                        </button>
                        <p className="text-center">
                            Not a member? <a href="#">Register</a>
                        </p>
                    </form>
                </div>

                <div className={justifyActive === 'tab2' ? '' : 'hidden'}>
                    <form onSubmit={handleRegisterSubmit}>
                        <input
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 placeholder-gray-400"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 w-full mb-4"
                        >
                            Sign up
                        </button>
                        <p className="text-center">
                            Already a member? <a href="#">Login</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
