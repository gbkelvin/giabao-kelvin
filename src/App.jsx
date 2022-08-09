import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProjectDetail from "./components/ProjectComponent/ProjectDetail/ProjectDetail";
import ServiceDetail from "./components/ServiceComponent/serviceDetail/ServiceDetail";
import Footer from "./components/Footer/Footer";
import ArticleDetail from "./components/ArticleComponent/ArticleDetail/ArticleDetail";
import ScrollToTop from "./components/autoScrollToTop/autoScrollToTop";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Projects from "./pages/Projects/Projects";
import Services from "./pages/Services/Services";
import Blogs from "./pages/Blogs/Blogs";
import Contacts from "./pages/Contacts/Contacts";
import i18n from "./i18next/i18next";
import { LanguageProvider } from "./Context/LanguageContext";
import "./i18next/i18next";
import "./App.css";
import Layout from "./components/LayoutComponent/Layout";

export const App = () => {
  const [languageType, setLanguageType] = useState(i18n.language);

  const changeLanguageValue = (languageValue) => {
    setLanguageType(languageValue);
  };

  return (
    <LanguageProvider languagesValue={languageType}>
      <Layout>
        <Router>
          <ScrollToTop/>
          <Navbar getLanguageType={changeLanguageValue} />
          <Routes>
            <Route exact path="/" element={<Home />} />

            {/* <Route path="/about"    element={<AboutUs/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/blogs"    element={<Blogs/>}/>
          <Route path="/contacts" element={<Contacts/>}/>
          <Route path="/sign-up"  element={<Contacts/>}/>
          <Route 
            path="/projects/:id"
            element={<ProjectDetail/>}/> 
          <Route 
            path="/services/:id"
            element={<ServiceDetail/>}/>
          <Route 
            path="/blogs/:id"
            element={<ArticleDetail/>}/> */}
          </Routes>
          <Footer langType={languageType}/>
        </Router>
      </Layout>
    </LanguageProvider>
  );
};

export default App;
