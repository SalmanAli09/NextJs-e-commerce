"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
}
    from 'mdb-react-ui-kit';

function App() {
    const router = useRouter();
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

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
            <h1>Invalid Credentails</h1>
            router.push('/');

        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        
        localStorage.setItem('name', name);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
    };

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        Register
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <div className="text-center mb-3">
                        <p>Sign in with:</p>
                        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm" />
                            </MDBBtn>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm" />
                            </MDBBtn>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                            </MDBBtn>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm" />
                            </MDBBtn>
                        </div>
                        <p className="text-center mt-3">or:</p>
                    </div>
                    <form onSubmit={handleLoginSubmit}>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email address'
                            id='form1'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Password'
                            id='form2'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="d-flex justify-content-between mx-4 mb-4">
                            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                            <a href="!#">Forgot password?</a>
                        </div>
                        <MDBBtn type="submit" className="mb-4 w-100">Sign in</MDBBtn>
                        <p className="text-center">Not a member? <a href="#!">Register</a></p>
                    </form>
                </MDBTabsPane>

                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <div className="text-center mb-3">
                        <p>Sign up with:</p>
                        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm" />
                            </MDBBtn>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='twitter' size="sm" />
                            </MDBBtn>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                            </MDBBtn>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm" />
                            </MDBBtn>
                        </div>
                        <p className="text-center mt-3">or:</p>
                    </div>
                    <form onSubmit={handleRegisterSubmit}>
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Name'
                            id='form1'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Username'
                            id='form1'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Email'
                            id='form1'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <MDBInput
                            wrapperClass='mb-4'
                            label='Password'
                            id='form1'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className='d-flex justify-content-center mb-4'>
                            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                        </div>
                        <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
                    </form>
                </MDBTabsPane>
            </MDBTabsContent>
        </MDBContainer>
    );
}

export default App;
