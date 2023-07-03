"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../../components/Loader';

function DashboardPage() {
    const router = useRouter();
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editedProduct, setEditedProduct] = useState({});
    const [editedIndex, setEditedIndex] = useState(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched data:', data);
                setProductData(data.products);
                setIsLoading(false); // Set isLoading to false when data is fetched
            })
            .catch((error) => {
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
        setProductData((prevProductData) => {
            const updatedData = [...prevProductData];
            updatedData[editedIndex] = editedProduct;
            return updatedData;
        });
        setEditedProduct({});
        setEditedIndex(null);
    };

    const handleDeleteProduct = (index) => {
        setProductData((prevProductData) => {
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
        <div className="relative">
            {isLoading && <Loader />}
            <div className="flex flex-wrap justify-center">
                {!isLoading &&
                    productData.map((product, index) => (
                        <div className="w-64 h-600 mx-5 my-5 shadow-md" key={index}>
                            <div className="bg-white rounded-md h-full">
                                <div className="bg-image hover:opacity-75">
                                    <img
                                        src={product.thumbnail}
                                        alt="..."
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                                    <p className="mb-4 h-20 overflow-hidden">
                                        {product.description}
                                    </p>
                                    <p>{product.price}</p>
                                    <div className="flex justify-center">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-2 rounded" // Added btn-primary-blue class for blue background
                                            onClick={() => handleEditProduct(product, index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white  py-2 px-2 rounded ml-3" // Added btn-primary-red class for red background
                                            onClick={() => handleDeleteProduct(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {editedProduct &&
                                        editedProduct.title &&
                                        editedIndex === index && (
                                            <div>
                                                <input
                                                    type="text"
                                                    value={editedProduct.title}
                                                    onChange={(e) =>
                                                        setEditedProduct({
                                                            ...editedProduct,
                                                            title: e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    value={editedProduct.description}
                                                    onChange={(e) =>
                                                        setEditedProduct({
                                                            ...editedProduct,
                                                            description: e.target.value,
                                                        })
                                                    }
                                                />
                                                <input
                                                    type="text"
                                                    value={editedProduct.price}
                                                    onChange={(e) =>
                                                        setEditedProduct({
                                                            ...editedProduct,
                                                            price: e.target.value,
                                                        })
                                                    }
                                                />
                                                <div className="flex justify-center">
                                                    <button
                                                        className="bg-green-500 hover:bg-green-600 text-white  py-2 px-2 rounded ml-3"
                                                        onClick={() => handleUpdateProduct()}
                                                    >
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default DashboardPage;
