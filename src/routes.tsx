import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Research } from './pages/Research';
import { ProjectDetail } from './pages/ProjectDetail';
import { Publications } from './pages/Publications';
import { CV } from './pages/CV';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <About /> },
      { path: '/about', element: <Navigate to="/" replace /> },
      { path: '/research', element: <Research /> },
      { path: '/research/:slug', element: <ProjectDetail /> },
      { path: '/publications', element: <Publications /> },
      { path: '/cv', element: <CV /> },
      { path: '*', element: <About /> },
    ],
  },
]);
