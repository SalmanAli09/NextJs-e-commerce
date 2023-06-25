"use client"
import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple
} from 'mdb-react-ui-kit';

export default function Card() {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => setProductData(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            {productData.map((product, index) => (
                <MDBCard style={{ width: "10%" }} key={index}>
                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                        <MDBCardImage src={product.ProductPicture} fluid alt='...' />
                        <a>
                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                        </a>
                    </MDBRipple>
                    <MDBCardBody>
                        <MDBCardTitle>{product.title}</MDBCardTitle>
                        <MDBCardText>
                            {product.productDesc}
                        </MDBCardText>
                        <MDBCardText>
                            {product.productPrice}
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </>
    );
}
