import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';



function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;