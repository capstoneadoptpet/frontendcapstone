import { useState, useEffect } from "react";

const Dashboard = () => {
    const [totalPosts, setTotalPosts] = useState(0);
    const apiURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await fetch(`${apiURL}/pets`);
                if (!response.ok) {
                    throw new Error("Failed to fetch pets");
                }
                const datas = await response.json();
                setTotalPosts(datas.data.length);
                
            } catch (error) {
                console.error(error);
            }
        };

        fetchPets();
    }, [apiURL]);

    return (
        <div className="ml-20 h-screen">
            <div className="mx-auto md:mx-[3rem] p-4">
                <div className="justify-items-center border-b-2 my-[2rem]">
                    <h1 className="text-3xl font-semibold mb-6">Dasboard</h1>
                </div>
                <div className="grid grid-cols-2 gap-1 justify-items-center">
                    <div className="w-[18rem] h-[9rem] grid grid-rows-2 justify-items-center-safe rounded-2xl border-2 border-[var(--black)] bg-[var(--white)] ">
                        <h1 className="text-xl font-semibold p-2 m2">Jumlah Postingan</h1>
                        <p className="text-2xl font-semibold text-[var(--blue-sky)]">{totalPosts}</p>
                    </div>
                    <div className="w-[18rem] h-[9rem] grid grid-rows-2 justify-items-center-safe rounded-2xl border-2 border-[var(--black)] bg-[var(--white)] ">
                        <h1 className="text-xl font-semibold p-2 m2">User</h1>
                        <p className="text-2xl font-semibold text-[var(--blue-sky)]">12</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
