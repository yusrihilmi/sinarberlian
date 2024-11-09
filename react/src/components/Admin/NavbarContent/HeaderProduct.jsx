import React, { useState, useEffect } from "react";
import "../style.css"

function HeaderProduct() {
    const [headerProducts, setHeaderProducts] = useState([]);
    const [newHeaderProduct, setNewHeaderProduct] = useState({
        title: '',
        link: '',
        image: ''
      });
    const [editHeaderProductId, setEditHeaderProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false); // loading state for spinner

    useEffect(() => {
        fetchHeaderProduct();
    }, []);

    const fetchHeaderProduct = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch("http://localhost:8000/api/header-product");
            const data = await response.json();
            setHeaderProducts(data);
        } catch (error) {
            console.error("Error fetching titles:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const openModal = (headerProduct = { title: "", link: "",  image: "" }) => {
        setNewHeaderProduct({ 
            title: headerProduct.title,
            link: headerProduct.link,
            image: "" // Clear image input field
        });
        setImagePreview(headerProduct.image || null);
        setEditHeaderProductId(headerProduct.id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewHeaderProduct({ 
            title: "",
            link: "",
            image: ""
         });
        setImagePreview(null);
        setEditHeaderProductId(null);
    };

    const handleAddOrUpdateHeaderProduct = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("title", newHeaderProduct.title);
        formData.append("link", newHeaderProduct.link);
        if (newHeaderProduct.image instanceof File) {
            formData.append('image', newHeaderProduct.image);
          }

        try {
            let response;
            if (editHeaderProductId) {
                response = await fetch(`http://localhost:8000/api/header-product/${editHeaderProductId}`, {
                    method: "POST",
                    body: formData,
                });
            } else {
                response = await fetch("http://localhost:8000/api/header-product", {
                    method: "POST",
                    body: formData,
                });
            }

            if (response.ok) {
                fetchHeaderProduct();
                closeModal();
                alert(editHeaderProductId ? "Product updated successfully!" : "Product added successfully!");
            } else {
                alert("Error saving product");
            }
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleDeleteHeaderProduct = async (headerTitleId) => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`http://localhost:8000/api/header-product/${headerTitleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                setHeaderProducts(headerProducts.filter((headerProduct) => headerProduct.id !== headerTitleId));
                alert("Product deleted successfully!");
            } else {
                alert("Error deleting product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-4 border-solid border-gray-500 border-[2px] rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">
                Header Product Content
            </h2>
            <button
                onClick={() => openModal()}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Product
            </button>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h3 className="text-xl font-semibold mb-4">
                            {editHeaderProductId
                                ? "Edit Product"
                                : "Add Product"}
                        </h3>
                        <form onSubmit={handleAddOrUpdateHeaderProduct}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    value={newHeaderProduct.title}
                                    onChange={(e) =>
                                        setNewHeaderProduct({
                                            ...newHeaderProduct,
                                            title: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <label className="block text-gray-700 mb-2">
                                    Link:
                                </label>
                                <input
                                    type="text"
                                    value={newHeaderProduct.link}
                                    onChange={(e) =>
                                        setNewHeaderProduct({
                                            ...newHeaderProduct,
                                            link: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <label className="block text-gray-700 mb-2">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setNewHeaderProduct({ ...newHeaderProduct, image: e.target.files[0] });
                                        setImagePreview(URL.createObjectURL(e.target.files[0])); // Update preview
                                    }}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {imagePreview && (
                                <div className="mt-2 flex items-center justify-center">
                                    <img src={imagePreview} alt="Current" className="w-32 h-32 object-cover mr-4" />
                                    <button
                                        type="button" // Add this line to prevent form submission
                                        onClick={() => window.open(imagePreview, "_blank")}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        View Full Image
                                    </button>
                                </div>
                            )}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {editHeaderProductId
                                        ? "Update Product"
                                        : "Add Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Product List</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border border-gray-300">No</th>
                            <th className="p-2 border border-gray-300">
                                Title
                            </th>
                            <th className="p-2 border border-gray-300">
                                Link
                            </th>
                            <th className="p-2 border border-gray-300">
                                Image
                            </th>
                            <th className="p-2 border border-gray-300">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {headerProducts.map((headerProduct, index) => (
                            <tr key={headerProduct.id} className="text-center">
                                <td className="p-2 border border-gray-300">
                                    {index + 1}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {headerProduct.title}
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {headerProduct.link}
                                </td>
                                <td className="p-2 border border-gray-300">
                                <div className="flex items-center justify-center">
                                <img width={100} src={headerProduct.image} alt="" />
                                    <button
                                        type="button" // Add this line to prevent form submission
                                        onClick={() => window.open(headerProduct.image, "_blank")}
                                        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                </div>
                                    
                                </td>
                                <td className="p-2 border border-gray-300 space-x-2">
                                    <button
                                        onClick={() => openModal(headerProduct)}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteHeaderProduct(
                                                headerProduct.id
                                            )
                                        }
                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HeaderProduct;
