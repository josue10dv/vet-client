import type { RouteObject } from "react-router-dom";
import GeneralLayout from "../layouts/general";
import Home from "../pages/public/home";
import { Login } from "../pages/public/login";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <GeneralLayout children={<Home />} />,
    },
    {
        path: "/login",
        element: <Login />,
    },
];