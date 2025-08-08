import React from 'react';
import Navbar from '../layouts/Navbar';
import { Outlet } from 'react-router';
import Footer from '../layouts/Footer';
import ScrollToTop from '../pages/shared/ScrollToTop';

const RootLayouts = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;