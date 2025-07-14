import type { JSX } from "react";
import DropdownButton from "./dropdown";
import type { IconColor } from "../types/icons";

/**
 * Interfaz para las filas de la tabla.
 * Cada fila debe tener un identificador único y un array de celdas.
 * `id` puede ser un string o un número.
 * `cells` es un array que puede contener strings o elementos JSX.
 * `actions` es un objeto opcional que define acciones permitidas en la fila.
 */
export interface TableRow {
    id: string | number;
    cells: (string | JSX.Element)[];
    actions?: AllowedActions;
}

/**
 * Interfaz para las acciones permitidas en una fila de la tabla.
 * Permite definir acciones como editar, eliminar, ver o acciones personalizadas.
 * Cada acción es una función que se ejecuta al hacer clic en la opción correspondiente.
 * `edit`, `delete`, `view` son funciones opcionales.
 * `custom` es un array de objetos que permite definir acciones personalizadas con un label y una función.
 */
export interface AllowedActions {
    edit?: () => void;
    delete?: () => void;
    view?: () => void;
    custom?: { label: string; onClick: () => void }[];
}

/**
 * Interfaz para las propiedades del componente Table.
 * - `class`: Clases CSS para personalizar el estilo de la tabla.
 * - `headers`: Array de strings que define los encabezados de la tabla.
 * - `rows`: Array de objetos `TableRow` que define las filas de la tabla.
 * - `hasActions`: Booleano opcional que indica si la tabla tiene una columna de acciones.
 * - `page`: Número de la página actual para paginación.
 * - `pageSize`: Número de filas por página para paginación.
 * - `totalItems`: Número total de elementos para paginación.
 * - `onPageChange`: Función opcional que se ejecuta al cambiar de página, recibe el número de página como argumento.
 */
interface TableProps {
    color: string;
    iconFill: IconColor;
    headers: string[];
    rows: TableRow[];
    hasActions?: boolean;
    page?: number;
    pageSize?: number;
    totalItems?: number;
    onPageChange?: (page: number) => void;
}

/**
 * Componente Table.
 * Renderiza una tabla con encabezados, filas y una columna de acciones opcional.
 */
export default function Table({
    headers,
    rows,
    hasActions = true,
    page = 1,
    pageSize = 10,
    color = "bg-primary-dark",
    totalItems = rows.length,
    iconFill = "icon-primary-light",
    onPageChange,
}: TableProps): JSX.Element {
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="w-full h-full overflow-auto">
            <table role="table" className="w-full text-left text-sm">
                <thead className={`${color} sticky top-0 z-10`}>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i} className="py-3 px-4 font-semibold">
                                {header}
                            </th>
                        ))}
                        {hasActions && (
                            <th className="py-3 px-4 font-semibold text-center">Op.</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {paginatedRows.length > 0 ? (paginatedRows.map((row) => (
                        <tr key={row.id} className="border-b border-dashed hover:bg-gray-100 transition">
                            {row.cells.map((cell, i) => (
                                <td key={i} className="py-3 px-4">
                                    {cell}
                                </td>
                            ))}
                            {hasActions && (
                                <td className="py-3 px-4 text-center relative w-10">
                                    <DropdownButton
                                        text=""
                                        variant="secondary"
                                        options={[
                                            ...(row.actions?.edit
                                                ? [{ label: "Editar", onClick: row.actions.edit }]
                                                : []),
                                            ...(row.actions?.delete
                                                ? [{ label: "Eliminar", onClick: row.actions.delete }]
                                                : []),
                                            ...(row.actions?.view
                                                ? [{ label: "Ver", onClick: row.actions.view }]
                                                : []),
                                            ...(row.actions?.custom || []),
                                        ]}
                                        fill={iconFill}
                                    />
                                </td>
                            )}
                        </tr>
                    ))) : (
                        <tr className="border-b border-dashed cursor-default">
                            <td colSpan={hasActions ? headers.length + 1 : headers.length} className="py-3 px-4 text-center text-gray-500">
                                No hay datos disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            {onPageChange && totalPages > 1 && (
                <div className="flex justify-end items-center gap-2 mt-4">
                    <button
                        className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => onPageChange(page - 1)}
                        disabled={page === 1}
                    >
                        Anterior
                    </button>
                    <span className="text-sm">
                        Página {page} de {totalPages}
                    </span>
                    <button
                        className="text-sm px-3 py-1 border rounded disabled:opacity-50"
                        onClick={() => onPageChange(page + 1)}
                        disabled={page === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </div>
    );
}
