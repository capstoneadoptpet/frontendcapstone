import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { ModalCreateCategories, ModalCreateBreeds } from "../../components/categories-component/modal-create";
import { ModalEditCategories, ModalEditBreeds } from "../../components/categories-component/modal-edit";

const CategoriesPost = () => {
    const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
    const [openBreedsModal, setOpenBreedsModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [openEditBreedModal, setOpenEditBreedModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const apiURL = import.meta.env.VITE_API_URL;

    const getCategories = async () => {
        try {
            const response = await fetch(`${apiURL}/pet-categories`);
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const getBreeds = async () => {
        try {
            const response = await fetch(`${apiURL}/breeds`);
            if (!response.ok) {
                throw new Error("Failed to fetch breeds");
            }
            const data = await response.json();
            setBreeds(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
        getBreeds();
    }, []);

    const deleteCategory = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiURL}/pet-categories/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete category");
            }
            getCategories();
        } catch (error) {
            console.error(error);
            alert("Failed to delete category");
        }
    };

    const deleteBreed = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this breed?");
        if (!confirmed) return;

        try {
            const response = await fetch(`${apiURL}/breeds/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete breed");
            }
            getBreeds();
        } catch (error) {
            console.error(error);
            alert("Failed to delete breed");
        }
    };

    const handleEditCategoryClick = (category) => {
        setSelectedCategory(category);
        setOpenEditCategoryModal(true);
    };

    const handleEditCategoryModalClose = () => {
        setSelectedCategory(null);
        setOpenEditCategoryModal(false);
        getCategories();
    };

    const handleEditBreedClick = (breed) => {
        setSelectedBreed(breed);
        setOpenEditBreedModal(true);
    };

    const handleEditBreedModalClose = () => {
        setSelectedBreed(null);
        setOpenEditBreedModal(false);
        getBreeds();
    };

    const breedsByCategory = breeds.reduce((acc, breed) => {
        if (!acc[breed.pet_category_id]) {
            acc[breed.pet_category_id] = [];
        }
        acc[breed.pet_category_id].push(breed);
        return acc;
    }, {});

    return (
        <div className="ml-20 h-auto">
            <div className="mx-auto md:mx-[3rem] grid grid-rows-2 gap-2 p-4">
                <div className="categories">
                    <div className="justify-items-center border-b-2 my-[2rem]">
                        <h1 className="text-3xl font-semibold mb-6">Kategori Management</h1>
                    </div>
                    <div>
                        <Button className="categories my-5" onClick={() => setOpenCategoriesModal(true)}>Buat Baru +</Button>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeadCell>No</TableHeadCell>
                                        <TableHeadCell>Nama</TableHeadCell>
                                        <TableHeadCell>Gambar</TableHeadCell>
                                        <TableHeadCell>
                                            <span className="sr-only">Edit Hapus</span>
                                        </TableHeadCell>
                                        <TableHeadCell>
                                            <span className="sr-only">Hapus</span>
                                        </TableHeadCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="divide-y">
                                    {categories.map((category, index) => (
                                        <TableRow key={category.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{category.name}</TableCell>
                                            <TableCell>
                                                {category.icon ? (
                                                    <img src={category.icon} alt={category.name} className="h-10 w-10 object-cover rounded" />
                                                ) : (
                                                    "No Icon"
                                                )}
                                            </TableCell>
                                            <TableCell className="">
                                                <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={(e) => { e.preventDefault(); handleEditCategoryClick(category); }}>
                                                    Edit
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                <a
                                                    href="#"
                                                    className="delete_categorie font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        deleteCategory(category.id);
                                                    }}
                                                >
                                                    Hapus
                                                </a>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

                <div className="breeds">
                    <div className="justify-items-center border-b-2 my-[2rem]">
                        <h1 className="text-3xl font-semibold mb-6">Jenis Management</h1>
                    </div>
                    <div>
                        <Button className="breeds my-5" onClick={() => setOpenBreedsModal(true)}>Buat Baru +</Button>
                        <div className="grid grid-cols-3 gap-4">
                            {categories.map((category) => (
                                <div key={category.id} className="container grid flex-rows-2 gap-0 ">
                                    <div className="flex justify-center items-center py-2 bg-[var(--white)] rounded-t-2xl ">
                                        <h2 className="text-xl font-semibold">{category.name}</h2>
                                    </div>
                                    <div className="overflow-x-auto  ">
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableHeadCell>No</TableHeadCell>
                                                    <TableHeadCell>Nama</TableHeadCell>
                                                    <TableHeadCell>
                                                        <span className="sr-only">Edit</span>
                                                    </TableHeadCell>
                                                    <TableHeadCell>
                                                        <span className="sr-only">Hapus</span>
                                                    </TableHeadCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody className="divide-y">
                                                {(breedsByCategory[category.id] || []).map((breed, index) => (
                                                    <TableRow key={breed.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                        <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>{breed.name}</TableCell>
                                                        <TableCell>
                                                            <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" onClick={(e) => { e.preventDefault(); setSelectedBreed(breed); setOpenEditBreedModal(true); }}>
                                                                Edit
                                                            </a>
                                                        </TableCell>
                                                        <TableCell>
                                                            <a
                                                                href="#"
                                                                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    deleteBreed(breed.id);
                                                                }}
                                                            >
                                                                Hapus
                                                            </a>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            <ModalCreateCategories
                show={openCategoriesModal}
                onClose={() => setOpenCategoriesModal(false)}
                onCreated={getCategories}
            />
            <ModalCreateBreeds
                show={openBreedsModal}
                onClose={() => setOpenBreedsModal(false)}
                onCreated={getBreeds}
            />
            <ModalEditCategories
                show={openEditCategoryModal}
                onClose={handleEditCategoryModalClose}
                categoryId={selectedCategory ? selectedCategory.id : null}
                initialData={selectedCategory}
                onUpdated={getCategories}
            />
            <ModalEditBreeds
                show={openEditBreedModal}
                onClose={handleEditBreedModalClose}
                breedId={selectedBreed ? selectedBreed.id : null}
                initialData={selectedBreed}
                onUpdated={getBreeds}
            />
        </div>
    )
}

export default CategoriesPost;
