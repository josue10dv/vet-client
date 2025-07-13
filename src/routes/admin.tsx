import type { RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout";
import AdminDashboard from "../dashboard/pages/adminDashboard";
import VeterinaryPage from "../veterinary/pages/veterinary";
import UserPage from "../user/pages/user";

export const adminRoutes: RouteObject[] = [
    {
        path: "/admin/dashboard",
        element: <AdminLayout children={<AdminDashboard />} />,
    },
    {
        path: "/admin/veterinarias",
        element: <AdminLayout children={<VeterinaryPage />} />,
    },
    {
        path: "/admin/usuarios",
        element: <AdminLayout children={<UserPage />} />,
    },
];