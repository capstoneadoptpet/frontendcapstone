import { useEffect, useState } from "react";
import Content from "../../components/content";
import CardList from "../../components/home-copomnents/cards-list";
import HeroSection from "../../components/home-copomnents/hero-section";
import { content1 } from "./data";

const HomePage = () => {
    const apiURL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem('auth_token');
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`${apiURL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => setUser(data))
            .catch(() => setUser({}));
    }, [token, apiURL]);
    return (
        <>
            <HeroSection />
            <CardList user={user.user_id} />
            <Content {...content1} />
        </>
    )
};

export default HomePage;