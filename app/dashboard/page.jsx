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
import Loader from '../../components/Loader';

function DashboardPage() {
    const router = useRouter();
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedProduct, setEditedProduct] = useState({});
    const [editedIndex, setEditedIndex] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setProductData(data.products);
                setIsLoading(false); // Set isLoading to false when data is fetched
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); // Set isLoading to false even on error
            });
    }, []);

    console.log('Product data:', productData);

    useEffect(() => {
        const isUserRegistered =
            localStorage.getItem('email') && localStorage.getItem('password');

        if (!isUserRegistered) {
            router.push('/');
        }
    }, []);

    const handleUpdateProduct = () => {
        setProductData(prevProductData => {
            const updatedData = [...prevProductData];
            updatedData[editedIndex] = editedProduct;
            return updatedData;
        });
        setEditedProduct({});
        setEditedIndex(null);
    };

    const handleDeleteProduct = (index) => {
        setProductData(prevProductData => {
            const updatedData = [...prevProductData];
            updatedData.splice(index, 1);
            return updatedData;
        });
    };

    const handleEditProduct = (product, index) => {
        const truncatedDescription =
            product.description.length > 45
                ? product.description.substring(0, 45) + '...'
                : product.description;
        setEditedProduct({ ...product, description: truncatedDescription });
        setEditedIndex(index);
    };

    return (
        <div style={{ position: 'relative' }}>
            {isLoading && <Loader />}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {!isLoading &&
                    productData.map((product, index) => (
                        <MDBCard style={{ width: '20%', margin: '10px' }} key={index}>
                            <MDBRipple
                                rippleColor="light"
                                rippleTag="div"
                                className="bg-image hover-overlay"
                            >
                                <img src={product.thumbnail} fluid alt="..." className="imageSrc" />
                                <a>
                                    <div
                                        className="mask"
                                        style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
                                    ></div>
                                </a>
                            </MDBRipple>
                            <MDBCardBody>
                                <MDBCardTitle>{product.title}</MDBCardTitle>
                                <MDBCardText style={{ height: '60px', overflow: 'hidden' }}>
                                    {product.description}
                                </MDBCardText>
                                <MDBCardText>{product.price}</MDBCardText>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <MDBBtn onClick={() => handleEditProduct(product, index)}>Edit</MDBBtn>
                                    <MDBBtn style={{ marginLeft: '20px' }} onClick={() => handleDeleteProduct(index)}>
                                        Delete
                                    </MDBBtn>
                                </div>
                                {editedProduct && editedProduct.title && editedIndex === index && (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedProduct.title}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, title: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={editedProduct.description}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, description: e.target.value })
                                            }
                                        />
                                        <input
                                            type="text"
                                            value={editedProduct.price}
                                            onChange={(e) =>
                                                setEditedProduct({ ...editedProduct, price: e.target.value })
                                            }
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <MDBBtn onClick={() => handleUpdateProduct()}>Update</MDBBtn>
                                        </div>
                                    </div>
                                )}
                            </MDBCardBody>
                        </MDBCard>
                    ))}
            </div>
        </div>
    );
}

export default DashboardPage;
