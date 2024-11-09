import React, { useState, useEffect } from "react";
import "../style.css"

function HeaderTitle() {
    const [headerTitles, setHeaderTitles] = useState([]);
    const [newHeaderTitle, setNewHeaderTitle] = useState({ title: "" });
    const [editHeaderTitleId, setEditHeaderTitleId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); // loading state for spinner

    useEffect(() => {
        fetchHeaderTitle();
    }, []);

    const fetchHeaderTitle = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch("http://localhost:8000/api/header-title");
            const data = await response.json();
            setHeaderTitles(data);
        } catch (error) {
            console.error("Error fetching titles:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const openModal = (headerTitle = { title: "" }) => {
        setNewHeaderTitle({ title: headerTitle.title });
        setEditHeaderTitleId(headerTitle.id || null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setNewHeaderTitle({ title: "" });
        setEditHeaderTitleId(null);
    };

    const handleAddOrUpdateHeaderTitle = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const formData = new FormData();
        formData.append("title", newHeaderTitle.title);

        try {
            let response;
            if (editHeaderTitleId) {
                response = await fetch(`http://localhost:8000/api/header-title/${editHeaderTitleId}`, {
                    method: "POST",
                    body: formData,
                });
            } else {
                response = await fetch("http://localhost:8000/api/header-title", {
                    method: "POST",
                    body: formData,
                });
            }

            if (response.ok) {
                fetchHeaderTitle();
                closeModal();
                alert(editHeaderTitleId ? "Title updated successfully!" : "Title added successfully!");
            } else {
                alert("Error saving title");
            }
        } catch (error) {
            console.error("Error saving title:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleDeleteHeaderTitle = async (headerTitleId) => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`http://localhost:8000/api/header-title/${headerTitleId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                setHeaderTitles(headerTitles.filter((headerTitle) => headerTitle.id !== headerTitleId));
                alert("Title deleted successfully!");
            } else {
                alert("Error deleting title");
            }
        } catch (error) {
            console.error("Error deleting title:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-4 border-solid border-gray-500 border-[2px] rounded-lg bg-white">
            <h2 className="text-xl font-semibold mb-4">Header Title Content</h2>
            <button
                onClick={() => openModal()}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Title
            </button>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <h3 className="text-xl font-semibold mb-4">{editHeaderTitleId ? "Edit Title" : "Add Title"}</h3>
                        <form onSubmit={handleAddOrUpdateHeaderTitle}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Title:</label>
                                <input
                                    type="text"
                                    value={newHeaderTitle.title}
                                    onChange={(e) =>
                                        setNewHeaderTitle({ ...newHeaderTitle, title: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
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
                                    {editHeaderTitleId ? "Update Title" : "Add Title"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Title List</h3>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border border-gray-300">No</th>
                            <th className="p-2 border border-gray-300">Title</th>
                            <th className="p-2 border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {headerTitles.map((headerTitle, index) => (
                            <tr key={headerTitle.id} className="text-center">
                                <td className="p-2 border border-gray-300">{index + 1}</td>
                                <td className="p-2 border border-gray-300">{headerTitle.title}</td>
                                <td className="p-2 border border-gray-300 space-x-2">
                                    <button
                                        onClick={() => openModal(headerTitle)}
                                        className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteHeaderTitle(headerTitle.id)}
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

export default HeaderTitle;
