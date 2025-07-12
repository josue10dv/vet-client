import type { RouteObject } from "react-router-dom";
import GeneralLayout from "../layouts/general";
import Home from "../home/pages/home";
import { Login } from "../home/pages/login";

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