export const getEnvVariables = () => {
    return {
        apiUrl: import.meta.env.VITE_API_URL, // Ajusta según tu setup (Vite o CRA)
    };
};