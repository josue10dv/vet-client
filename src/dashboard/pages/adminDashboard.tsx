import type { JSX } from "react";
// import { useState, useEffect } from "react";
// import { RequestHandler } from "../../common/services/requestHandler";
// import { triggerToast } from "../../common/services/toastHandler";
// import type { UserProps } from "../../common/interfaces/user";
// import type { VeterinaryProps } from "../../common/interfaces/veterinaries";

// interface DashboardStats {
//     totalUsers: number;
//     activeUsers: number;
//     totalVeterinaries: number;
//     activeVeterinaries: number;
//     totalAppointments?: number;
//     recentRegistrations: number;
// }

/**
 * Dashboard principal para administradores con estadísticas del sistema
 * @returns Componente JSX del dashboard administrativo
 */
export default function AdminDashboardPage(): JSX.Element {
    // const [stats, setStats] = useState<DashboardStats>({
    //     totalUsers: 0,
    //     activeUsers: 0,
    //     totalVeterinaries: 0,
    //     activeVeterinaries: 0,
    //     totalAppointments: 0,
    //     recentRegistrations: 0,
    // });
    // const [isLoading, setIsLoading] = useState(true);
    // const [recentUsers, setRecentUsers] = useState<UserProps[]>([]);
    // const [recentVeterinaries, setRecentVeterinaries] = useState<VeterinaryProps[]>([]);

    // const requestHandler = RequestHandler.getInstance();

    // useEffect(() => {
    //     loadDashboardData();
    // }, []);

    // const loadDashboardData = async () => {
    //     try {
    //         // setIsLoading(true);
            
    //         // // Cargar usuarios
    //         // const usersResponse = await requestHandler.get<UserProps[]>("/users");
    //         // const users = usersResponse.data || [];
            
    //         // // Cargar veterinarias
    //         // const veterinariesResponse = await requestHandler.get<VeterinaryProps[]>("/veterinaries");
    //         // const veterinaries = veterinariesResponse.data || [];

    //         // // Calcular estadísticas
    //         // const totalUsers = users.length;
    //         // const activeUsers = users.filter(user => user.isActive).length;
    //         // const totalVeterinaries = veterinaries.length;
    //         // const activeVeterinaries = veterinaries.filter(vet => vet.isActive).length;
            
    //         // // Registros recientes (últimos 30 días)
    //         // const thirtyDaysAgo = new Date();
    //         // thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    //         // const recentRegistrations = users.filter(user => 
    //         //     new Date(user.createdAt) >= thirtyDaysAgo
    //         // ).length;

    //         // setStats({
    //         //     totalUsers,
    //         //     activeUsers,
    //         //     totalVeterinaries,
    //         //     activeVeterinaries,
    //         //     recentRegistrations,
    //         // });

    //         // // Obtener usuarios recientes (últimos 5)
    //         // const sortedUsers = users
    //         //     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    //         //     .slice(0, 5);
    //         // setRecentUsers(sortedUsers);

    //         // Obtener veterinarias recientes (últimas 3)
    //         // const sortedVeterinaries = veterinaries.slice(0, 3);
    //         // setRecentVeterinaries(sortedVeterinaries);

    //     } catch (error) {
    //         triggerToast("Error al cargar datos del dashboard", "error");
    //         console.error("Error loading dashboard data:", error);
    //     } finally {
    //         // setIsLoading(false);
    //     }
    // };

    // const StatCard = ({ title, value, subtitle, icon, color }: {
    //     title: string;
    //     value: number;
    //     subtitle?: string;
    //     icon: string;
    //     color: string;
    // }) => (
    //     <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color} hover:shadow-xl transition-shadow duration-300`}>
    //         <div className="flex items-center justify-between">
    //             <div>
    //                 <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
    //                 <p className="text-3xl font-bold text-gray-900">{value}</p>
    //                 {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    //             </div>
    //             <div className={`text-3xl ${color.replace('border-l-', 'text-')}`}>
    //                 {icon}
    //             </div>
    //         </div>
    //     </div>
    // );

    // const ActivityCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    //     <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    //         <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{title}</h3>
    //         {children}
    //     </div>
    // );

    // if (isLoading) {
    //     return (
    //         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    //             <div className="flex items-center justify-center h-64">
    //                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Dashboard Administrativo
                    </h1>
                    <p className="text-gray-600">
                        Resumen general del sistema y estadísticas importantes
                    </p>
                </div>
                
                {/* Stats Grid */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total de Usuarios"
                        value={stats.totalUsers}
                        subtitle={`${stats.activeUsers} activos`}
                        icon="👥"
                        color="border-l-blue-500"
                    />
                    <StatCard
                        title="Usuarios Activos"
                        value={stats.activeUsers}
                        subtitle={`${((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% del total`}
                        icon="✅"
                        color="border-l-green-500"
                    />
                    <StatCard
                        title="Veterinarias"
                        value={stats.totalVeterinaries}
                        subtitle={`${stats.activeVeterinaries} activas`}
                        icon="🏥"
                        color="border-l-purple-500"
                    />
                    <StatCard
                        title="Registros Recientes"
                        value={stats.recentRegistrations}
                        subtitle="Últimos 30 días"
                        icon="📈"
                        color="border-l-orange-500"
                    />
                </div> */}

                {/* Activity Grid */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <ActivityCard title="Usuarios Recientes">
                        <div className="space-y-3">
                            {recentUsers.length > 0 ? (
                                recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-semibold text-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.isActive 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {user.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                user.type === 'admin' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {user.type === 'admin' ? 'Admin' : 'Usuario'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No hay usuarios registrados</p>
                            )}
                        </div>
                    </ActivityCard>

                    <ActivityCard title="Veterinarias">
                        <div className="space-y-3">
                            {recentVeterinaries.length > 0 ? (
                                recentVeterinaries.map((vet) => (
                                    <div key={vet.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <span className="text-purple-600 font-semibold text-sm">
                                                    {vet.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{vet.name}</p>
                                                <p className="text-sm text-gray-500">{vet.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                vet.isActive 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {vet.isActive ? 'Activa' : 'Inactiva'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-4">No hay veterinarias registradas</p>
                            )}
                        </div>
                    </ActivityCard>
                </div> */}

                {/* System Status */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Estado del Sistema
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl mb-2">🟢</div>
                            <p className="font-medium text-green-800">Sistema Operativo</p>
                            <p className="text-sm text-green-600">Todos los servicios funcionando</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl mb-2">📊</div>
                            <p className="font-medium text-blue-800">Base de Datos</p>
                            <p className="text-sm text-blue-600">Conexión estable</p>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl mb-2">🔒</div>
                            <p className="font-medium text-purple-800">Seguridad</p>
                            <p className="text-sm text-purple-600">Protocolos activos</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
                        Acciones Rápidas
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors duration-200">
                            <div className="text-2xl mb-2">👥</div>
                            <p className="font-medium text-blue-800">Gestionar Usuarios</p>
                        </button>
                        <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors duration-200">
                            <div className="text-2xl mb-2">🏥</div>
                            <p className="font-medium text-purple-800">Gestionar Veterinarias</p>
                        </button>
                        <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors duration-200">
                            <div className="text-2xl mb-2">📈</div>
                            <p className="font-medium text-green-800">Ver Reportes</p>
                        </button>
                        <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-center transition-colors duration-200">
                            <div className="text-2xl mb-2">⚙️</div>
                            <p className="font-medium text-orange-800">Configuración</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
