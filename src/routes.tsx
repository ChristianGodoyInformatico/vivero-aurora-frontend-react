import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import CategoryDetail from './components/CategoryDetail';
import About from './components/About';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ManageCategories from './components/ManageCategories';
import ManageProducts from './components/ManageProducts';
import CategoryForm from './components/CategoryForm';
import ProductForm from './components/ProductForm';

const AppRoutes = () => {
  return (
    <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/category/:id" element={<CategoryDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/categories/create" element={<CategoryForm />} />
        <Route path="/admin/categories/edit/:id" element={<CategoryForm />} />
        <Route path="/admin/products/create" element={<ProductForm />} />
        <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        {/* Ruta catch-all para redirigir a la página principal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;