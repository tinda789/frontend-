import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import PrivateRoute from '../components/common/PrivateRoute';
import Dashboard from '../components/dashboard/Dashboard';
import WorkspaceList from '../components/workspace/WorkspaceList';
import WorkspaceDetail from '../components/workspace/WorkspaceDetail';
import WorkListDetail from '../components/worklist/WorkListDetail';
import Layout from '../components/layout/Layout';

function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route element={<PrivateRoute />}>
                        <Route element={<Layout />}>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<Dashboard />} />
                            <Route path="/workspaces" element={<WorkspaceList />} />
                            <Route path="/workspaces/:id" element={<WorkspaceDetail />} />
                            <Route path="/worklists/:id" element={<WorkListDetail />} />
                        </Route>
                    </Route>
                    
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;