import { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, TextInput, FileInput, HelperText, Select } from "flowbite-react";
import { IoCloseSharp } from "react-icons/io5";

export const ModalEditCategories = ({ show, onClose, categoryId, initialData }) => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (show && initialData) {
            setName(initialData.name || "");
            setIcon(null); // Reset icon on open, user can upload new one
        }
    }, [show, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            if (icon) {
                formData.append("icon", icon);
            }
            console.log(name)
            console.log(icon)
            
            const response = await fetch(`${apiURL}/pet-categories/${categoryId}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Kategori berhasil diperbarui',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.message || 'Gagal memperbarui kategori',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }

            setName("");
            setIcon(null);
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal dismissible show={show} onClose={onClose} >
            <div className="p-relative flex max-h-[90dvh] flex-col rounded-t-lg bg-white shadow-sm">
                <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600 text-xl font-medium text-[var(--black)]">
                    <h3>Membuat Kategori</h3>
                    <div type="button" onClick={onClose} className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
                        <IoCloseSharp className="h-5 w-5"/>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                    <div className="mb-2 block">
                        <label htmlFor="name" className="text-[var(--black)] text-l font-medium">Nama Hewan</label>      
                        <input
                            id="name"
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nama Dari Hewan Anda"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div id="fileUpload" className="max-w-md">
                        <label htmlFor="icon" className="text-[var(--black)] text-l font-medium">Gambar</label>   
                        <FileInput
                            id="icon"
                            onChange={(e) => setIcon(e.target.files[0])}
                            accept="image/*"
                        />
                        <HelperText className="mt-1">Gambar Max 1Mb</HelperText>
                    </div>
                </form>
            </div>
            <div className="flex bg-white items-center space-x-2 rounded-b-lg border-gray-200 p-6 dark:border-gray-600 border-t">
                <Button type="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
                <Button color="red" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};

export const ModalEditBreeds = ({ show, onClose, breedId, initialData }) => {
    const apiURL = import.meta.env.VITE_API_URL;

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${apiURL}/pet-categories`);
                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        if (show) {
            fetchCategories();
        }
    }, [show, apiURL]);

    useEffect(() => {
        if (show && initialData) {
            setName(initialData.name || "");
            setSelectedCategory(initialData.pet_category_id || "");
        }
    }, [show, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("pet_category_id", selectedCategory);
            console.log("form data : ", selectedCategory, name);

            const response = await fetch(`${apiURL}/breeds/${breedId}`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Breed updated successfully!");
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Jenis berhasil diperbarui',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setName("");
                setSelectedCategory("");
                onClose();
            } else {
                let errorMessage = "Gagal memperbarui jenis";
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (jsonError) {
                    const text = await response.text();
                    console.error("Non-JSON error response:", text);
                    errorMessage = text;
                }
                alert(errorMessage);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorData.message || 'Gagal memperbarui jenis',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal dismissible show={show} onClose={onClose}>
            <div className="p-relative flex max-h-[90dvh] flex-col rounded-t-lg bg-white shadow-sm">
                <div className="flex items-start justify-between rounded-t border-b p-5 dark:border-gray-600 text-xl font-medium text-[var(--black)]">
                    <h3>Membuat Jenis</h3>
                    <div
                        type="button"
                        onClick={onClose}
                        className="ml-auto inline-flex cursor-pointer items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <IoCloseSharp className="h-5 w-5" />
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
                <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                    <div className="max-w-md">
                        <div className="mb-2 block">
                            <label htmlFor="categorySelect" className="text-[var(--black)] text-l font-medium">Kategori</label> 
                        </div>
                        <select
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                            className="block w-full appearance-none border bg-arrow-down-icon bg-[length:0.75em_0.75em] bg-[position:right_12px_center] bg-no-repeat focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 border-gray-300 bg-gray-50 text-gray-900 focus:border-primary-500 focus:ring-primary-500  p-2.5 text-sm rounded-lg"
                        >
                            <option value="" disabled>
                                Pilih kategori
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2 block">
                        <label htmlFor="name" className="text-[var(--black)] text-l font-medium">
                            Nama Jenis
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nama Jenis Hewan"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            </div>
            <div className="flex bg-white items-center space-x-2 rounded-b-lg border-gray-200 p-6 dark:border-gray-600 border-t">
                <Button type="submit" disabled={loading} onClick={handleSubmit}>
                    {loading ? "Saving..." : "Save"}
                </Button>
                <Button color="red" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
};
