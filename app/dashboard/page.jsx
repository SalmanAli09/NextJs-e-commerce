"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
} from 'mdb-react-ui-kit';

function DashboardPage() {
    const router = useRouter();
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setProductData(data.products); // Assuming the API response has a "products" property
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log('Product data:', productData);

    useEffect(() => {
        const isUserRegistered = localStorage.getItem('email') && localStorage.getItem('password');

        if (!isUserRegistered) {
            router.push('/');
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' , justifyContent:"center" }}>
            {productData.map((product, index) => (
                <MDBCard style={{ width: '10%', margin: '10px' }} key={index}>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                        <img src={product.thumbnail} fluid alt='...' className='imageSrc' />
                        <a>
                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </a>
                    </MDBRipple>
                    <MDBCardBody>
                        <MDBCardTitle>{product.title}</MDBCardTitle>
                        <MDBCardText>
                            {product.description}
                        </MDBCardText>
                        <MDBCardText>
                            {product.price}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </div>
    );
}

export default DashboardPage;
