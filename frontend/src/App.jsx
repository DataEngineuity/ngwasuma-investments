import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import CarHire from './pages/CarHire';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Logistics from './pages/Logistics';
import NotFound from './pages/NotFound';
import Quote from './pages/Quote';
import RealEstate from './pages/RealEstate';
import Services from './pages/Services';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'services/logistics', element: <Logistics /> },
      { path: 'services/real-estate', element: <RealEstate /> },
      { path: 'services/car-hire', element: <CarHire /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'quote', element: <Quote /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
