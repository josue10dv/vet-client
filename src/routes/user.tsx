import type { RouteObject } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import MedicalRecord from "../medicalRecord/pages/medicalRecord";
import Pet from "../pet/pages/pet";

export const userRoutes: RouteObject[] = [
    {
        path: "/historias",
        element: <UserLayout children={<MedicalRecord />} />,
    },
    {
        path: "/mascotas",
        element: <UserLayout children={<Pet />} />,
    },
    // {
    //     path: "/masctotas",
    //     element: <AdminLayout children={<VeterinaryPage />} />,
    // },
    // {
    //     path: "/miUsuario",
    //     element: <AdminLayout children={<UserPage />} />,
    // },
];