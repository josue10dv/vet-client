import type { RouteObject } from "react-router-dom";
import UserLayout from "../layouts/userLayout";
import MedicalRecord from "../medicalRecord/pages/medicalRecord";
import Pet from "../pet/pages/pet";
import Appointment from "../appointment/pages/appointment";
import MyUser from "../myUser/pages/myUser";

export const userRoutes: RouteObject[] = [
    {
        path: "/historias",
        element: <UserLayout children={<MedicalRecord />} />,
    },
    {
        path: "/mascotas",
        element: <UserLayout children={<Pet />} />,
    },
    {
        path: "/citas",
        element: <UserLayout children={<Appointment />} />,
    },
    {
        path: "/miUsuario",
        element: <UserLayout children={<MyUser />} />,
    },
];