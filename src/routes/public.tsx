import type { RouteObject } from "react-router-dom";
import GeneralLayout from "../layouts/generalLayout";
import HomePage from "../home/pages/home";
import LoginPage from "../home/pages/login";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <GeneralLayout children={<HomePage />} />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
];