import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";
import { adminRoutes } from "./admin";
import { userRoutes } from "./user";


/**
 * Definición de las rutas de la aplicación.
 * Este archivo agrupa todas las rutas de la aplicación para su uso en el enrutamiento
 */
export const appRoutes: RouteObject[] = [...publicRoutes, ...adminRoutes, ...userRoutes];