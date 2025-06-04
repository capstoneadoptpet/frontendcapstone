// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeConfig } from "flowbite-react";
import Navbar from './components/navigation-components/navbar';
import Footer from './components/navigation-components/footer';
import RegisterPage from './pages/register/register';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';
import ReferencePage from './pages/register/reference';

import PostPage from './pages/post/post';
import EditPost from './pages/post/editPost';
import ProfilePage from './pages/profile/profile';
import ProfileDetailPage from './pages/profile/profileDetail';
import FindPetPage from './pages/findpet/findpet';
import MyPosts from './pages/post/myposts';
import PetDetail from './pages/petDetail/petDetail';

import TermsPolicy from './pages/terms-policy/terms-policy';
import About from './pages/about/about';
import Animals from './pages/animals/animals';
import Favorites from './pages/favorites/favorites';

import Dashboard from './pages/dashboard/dashboard';
import CategoriesPost from './pages/categories-post/categories-post';

function Content() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/admin/');

  return (
    <>
      <Navbar />
      <ThemeConfig dark={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reference" element={<ReferencePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/post" element={<PostPage />} />
        <Route path="/edit-post/:pet_id" element={<EditPost />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile-detail/:id" element={<ProfileDetailPage />} />
        <Route path="/findpet" element={<FindPetPage />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path='/pet-detail/:id' element={<PetDetail />} />
        <Route path='/favorites' element={<Favorites />} />

        <Route path='/terms-policy' element={<TermsPolicy />} />
        <Route path='/animals' element={<Animals />} />
        <Route path='/about-us' element={<About />} />

        {/* ADMIN */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path='/admin/categories-post' element={<CategoriesPost/>}/>

      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;