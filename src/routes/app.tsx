import type { RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";

/**
 * Definición de las rutas de la aplicación.
 * Este archivo agrupa todas las rutas de la aplicación para su uso en el enrutamiento
 */
export const appRoutes: RouteObject[] = [...publicRoutes];