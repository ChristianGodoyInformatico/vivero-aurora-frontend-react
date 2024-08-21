import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Realizar la solicitud POST al backend para el login
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                // Guardar el token en el localStorage
                localStorage.setItem('token', data.access_token);
                // Redirigir al panel de administración
                navigate('/admin-dashboard');
            } else {
                // Manejar errores (por ejemplo, credenciales incorrectas)
                setError(data.message || 'Error en el inicio de sesión');
            }
        } catch (err) {
            setError('Hubo un problema al conectar con el servidor');
        } finally {
            setLoading(false);
        }
        // // Validación de credenciales (puede ser una llamada al backend)
        // if (username === 'admin' && password === 'admin123') {
        //   // Guardar un estado de autenticación en el localStorage
        //   localStorage.setItem('isAdmin', 'true');
        //   // Redirigir a la página de administración
        //   navigate('/admin-dashboard');
        // } else {
        //   setError('Credenciales inválidas');
        // }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4">Inicio Sesion</h1>
                {error && <p className="text-red-600">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Correo</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
