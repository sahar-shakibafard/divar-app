import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import HomePage from "pages/HomePage";
import AuthPage from "pages/AuthPage";
import AdminPage from "pages/AdminPage";
import DashboardPage from "pages/DashboardPage";
import Page404 from "pages/Page404";

import Loader from "../components/modules/Loader";
import { getProfile } from "services/user";

const Router = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  if (isPending) return <Loader />;

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="auth"
          element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
        />
        <Route
          path="admin"
          element={
            data && data.data.role === "ADMIN" ? (
              <AdminPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="dashboard"
          element={data ? <DashboardPage /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
};

export default Router;
