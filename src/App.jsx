

import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import ResetStorage from "@/pages/ResetStorage"; 

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const StudentsPage = lazy(() => import("@/pages/StudentsPage"));
const CustomFieldsPage = lazy(() => import("@/pages/CustomFieldsPage"));


export default function App() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
          <Route index element={<Dashboard/>} />
          <Route path="students" element={<StudentsPage/>} />
          <Route path="fields" element={<CustomFieldsPage/>} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/reset" element={<ResetStorage />} />


      </Routes>
    </Suspense>
  );
}
