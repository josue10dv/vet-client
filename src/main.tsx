import { StrictMode, type JSX } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { appRoutes } from './routes/app';
import './assets/styles/vet.css';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider } from './common/providers/loadingContext';
import LoadingScreen from './common/utilities/loadingScreen';

/**
 * Componente principal de la aplicación 4Pets.
 * Este componente utiliza `useRoutes` para definir las rutas de la aplicación
 * @returns JSX.Element - El componente de la aplicación que renderiza las rutas definidas.
 */
function App(): JSX.Element {
  const routes = useRoutes(appRoutes);
  return (
    <LoadingProvider>
      <LoadingScreen />
      {routes}
      <ToastContainer />
    </LoadingProvider>
  );
}

/**
 * Punto de entrada de la aplicación.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
