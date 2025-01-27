import { Routes, Route } from "react-router-dom";

import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import AdminPage from "pages/AdminPage";
import DashboardPage from "pages/DashboardPage";
import Page404 from "pages/Page404";

const Router = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Page404 />} /> 
      </Routes>
    </>
  );
};

export default Router;
